<template>
  <teleport :to="getContainer || 'body'">
    <ProConfigProvider>
      <div ref="modalWrapRef" class="draggable-modal" :class="{ fullscreen: fullscreenModel }">
        <Modal
          v-bind="omit(props, ['open', 'onCancel', 'onOk', 'onUpdate:open'])"
          v-model:open="openModel"
          :mask-closable="false"
          :get-container="() => modalWrapRef"
          :width="innerWidth || width"
          @ok="emit('ok')"
          @cancel="emit('cancel')"
        >
          <template #title>
            <slot name="title">{{ $attrs.title || 'Title' }}</slot>
          </template>
          <template #closeIcon>
            <slot name="closeIcon">
              <Space class="ant-modal-operate" @click.stop>
                <FullscreenOutlined v-if="!fullscreenModel" @click="fullscreenModel = true" />
                <FullscreenExitOutlined v-else @click="restore" />
                <CloseOutlined @click="closeModal" />
              </Space>
            </slot>
          </template>
          <slot>
            ① The window can be dragged; <br />
            ② The window can be resized in eight directions; <br />
            ③ The window can be minimized, maximized, restored, and closed; <br />
            ④ Limit the minimum width/height of the window.
          </slot>
          <template v-if="$slots.footer" #footer>
            <slot name="footer" />
          </template>
        </Modal>
      </div>
    </ProConfigProvider>
  </teleport>
</template>

<script lang="ts" setup>
  import { ref, watch, nextTick, defineModel } from 'vue';
  import { useRoute } from 'vue-router';
  import { modalProps } from 'ant-design-vue/es/modal/Modal';
  import { CloseOutlined, FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons-vue';
  import { throttle, omit } from 'lodash-es';
  import { Modal, Space } from 'ant-design-vue';

  const props = defineProps({
    ...modalProps(),
    fullscreen: {
      type: Boolean,
      default: false,
    },
  });

  const emit = defineEmits(['update:open', 'update:fullscreen', 'ok', 'cancel']);

  const route = useRoute();
  const openModel = defineModel<boolean>('open');
  const fullscreenModel = ref(props.fullscreen);
  const innerWidth = ref('');

  const cursorStyle = {
    top: 'n-resize',
    left: 'w-resize',
    right: 'e-resize',
    bottom: 's-resize',
    topLeft: 'nw-resize',
    topright: 'ne-resize',
    bottomLeft: 'sw-resize',
    bottomRight: 'se-resize',
    auto: 'auto',
  } as const;

  // Has it been initialized?
  let inited = false;
  const modalWrapRef = ref<HTMLDivElement>();

  const closeModal = () => {
    openModel.value = false;
    emit('cancel');
  };

  // Centered pop-up window
  const centerModal = async () => {
    await nextTick();
    const modalEl = modalWrapRef.value?.querySelector<HTMLDivElement>('.ant-modal');

    if (modalEl && modalEl.getBoundingClientRect().left < 1) {
      modalEl.style.left = `${(document.documentElement.clientWidth - modalEl.offsetWidth) / 2}px`;
    }
  };

  const restore = async () => {
    fullscreenModel.value = false;
    centerModal();
  };

  const registerDragTitle = (dragEl: HTMLDivElement, handleEl: HTMLDivElement) => {
    handleEl.style.cursor = 'move';
    handleEl.onmousedown = throttle((e: MouseEvent) => {
      if (fullscreenModel.value) return;
      document.body.style.userSelect = 'none';
      const disX = e.clientX - dragEl.getBoundingClientRect().left;
      const disY = e.clientY - dragEl.getBoundingClientRect().top;
      const mousemove = (event: MouseEvent) => {
        if (fullscreenModel.value) return;
        let iL = event.clientX - disX;
        let iT = event.clientY - disY;
        const maxL = document.documentElement.clientWidth - dragEl.offsetWidth;
        const maxT = document.documentElement.clientHeight - dragEl.offsetHeight;

        iL <= 0 && (iL = 0);
        iT <= 0 && (iT = 0);
        iL >= maxL && (iL = maxL);
        iT >= maxT && (iT = maxT);

        dragEl.style.left = `${Math.max(iL, 0)}px`;
        dragEl.style.top = `${Math.max(iT, 0)}px`;
      };
      const mouseup = () => {
        document.removeEventListener('mousemove', mousemove);
        document.removeEventListener('mouseup', mouseup);
        document.body.style.userSelect = 'auto';
      };

      document.addEventListener('mousemove', mousemove);
      document.addEventListener('mouseup', mouseup);
    }, 20);
  };

  const initDrag = async () => {
    await nextTick();
    const modalWrapRefEl = modalWrapRef.value!;
    const modalWrapEl = modalWrapRefEl.querySelector<HTMLDivElement>('.ant-modal-wrap');
    const modalEl = modalWrapRefEl.querySelector<HTMLDivElement>('.ant-modal');
    if (modalWrapEl && modalEl) {
      centerModal();
      const headerEl = modalEl.querySelector<HTMLDivElement>('.ant-modal-header');
      headerEl && registerDragTitle(modalEl, headerEl);

      modalWrapEl.onmousemove = throttle((event: MouseEvent) => {
        if (fullscreenModel.value) return;
        const left = event.clientX - modalEl.offsetLeft;
        const top = event.clientY - modalEl.offsetTop;
        const right = event.clientX - modalEl.offsetWidth - modalEl.offsetLeft;
        const bottom = event.clientY - modalEl.offsetHeight - modalEl.offsetTop;
        const isLeft = left <= 0 && left > -8;
        const isTop = top < 5 && top > -8;
        const isRight = right >= 0 && right < 8;
        const isBottom = bottom > -5 && bottom < 8;
        // Left
        if (isLeft && top > 5 && bottom < -5) {
          modalWrapEl.style.cursor = cursorStyle.left;
          // Up
        } else if (isTop && left > 5 && right < -5) {
          modalWrapEl.style.cursor = cursorStyle.top;
          // Right
        } else if (isRight && top > 5 && bottom < -5) {
          modalWrapEl.style.cursor = cursorStyle.right;
          // Bottom
        } else if (isBottom && left > 5 && right < -5) {
          modalWrapEl.style.cursor = cursorStyle.bottom;
          // Left
        } else if (left > -8 && left <= 5 && top <= 5 && top > -8) {
          modalWrapEl.style.cursor = cursorStyle.topLeft;
          // Lower left corner
        } else if (left > -8 && left <= 5 && bottom <= 5 && bottom > -8) {
          modalWrapEl.style.cursor = cursorStyle.bottomLeft;
          // Upper right corner
        } else if (right < 8 && right >= -5 && top <= 5 && top > -8) {
          modalWrapEl.style.cursor = cursorStyle.topright;
          // Lower right corner
        } else if (right < 8 && right >= -5 && bottom <= 5 && bottom > -8) {
          modalWrapEl.style.cursor = cursorStyle.bottomRight;
        } else {
          modalWrapEl.style.cursor = cursorStyle.auto;
        }
      }, 20);
      modalWrapEl.onmousedown = (e: MouseEvent) => {
        if (fullscreenModel.value) return;
        const {
          top: iParentTop,
          bottom: iParentBottom,
          left: iParentLeft,
          right: iParentRight,
        } = modalEl.getBoundingClientRect();

        const disX = e.clientX - iParentLeft;
        const disY = e.clientY - iParentTop;
        const iParentWidth = modalEl.offsetWidth;
        const iParentHeight = modalEl.offsetHeight;

        const cursor = modalWrapEl.style.cursor;

        const mousemove = throttle((event: MouseEvent) => {
          if (fullscreenModel.value) return;
          if (cursor !== cursorStyle.auto) {
            document.body.style.userSelect = 'none';
          }
          const mLeft = `${Math.max(0, event.clientX - disX)}px`;
          const mTop = `${Math.max(0, event.clientY - disY)}px`;
          const mLeftWidth = `${Math.min(
            iParentRight,
            iParentWidth + iParentLeft - event.clientX,
          )}px`;
          const mRightWidth = `${Math.min(
            window.innerWidth - iParentLeft,
            event.clientX - iParentLeft,
          )}px`;
          const mTopHeight = `${Math.min(
            iParentBottom,
            iParentHeight + iParentTop - event.clientY,
          )}px`;
          const mBottomHeight = `${Math.min(
            window.innerHeight - iParentTop,
            event.clientY - iParentTop,
          )}px`;

          // Drag to the left
          if (cursor === cursorStyle.left) {
            modalEl.style.left = mLeft;
            modalEl.style.width = mLeftWidth;
            // Drag up
          } else if (cursor === cursorStyle.top) {
            modalEl.style.top = mTop;
            modalEl.style.height = mTopHeight;
            // Drag to the right
          } else if (cursor === cursorStyle.right) {
            modalEl.style.width = mRightWidth;
            // Drag down
          } else if (cursor === cursorStyle.bottom) {
            modalEl.style.height = mBottomHeight;
            // Drag the upper left corner
          } else if (cursor === cursorStyle.topLeft) {
            modalEl.style.left = mLeft;
            modalEl.style.top = mTop;
            modalEl.style.height = mTopHeight;
            modalEl.style.width = mLeftWidth;
            // Drag the upper right corner
          } else if (cursor === cursorStyle.topright) {
            modalEl.style.top = mTop;
            modalEl.style.width = mRightWidth;
            modalEl.style.height = mTopHeight;
            // Drag the lower left corner
          } else if (cursor === cursorStyle.bottomLeft) {
            modalEl.style.left = mLeft;
            modalEl.style.width = mLeftWidth;
            modalEl.style.height = mBottomHeight;
            // Drag the lower right corner
          } else if (cursor === cursorStyle.bottomRight) {
            modalEl.style.width = mRightWidth;
            modalEl.style.height = mBottomHeight;
          }
          innerWidth.value = modalEl.style.width;
        }, 20);

        const mouseup = () => {
          document.removeEventListener('mousemove', mousemove);
          document.removeEventListener('mouseup', mouseup);
          document.body.style.userSelect = 'auto';
          modalWrapEl.style.cursor = cursorStyle.auto;
        };

        document.addEventListener('mousemove', mousemove);
        document.addEventListener('mouseup', mouseup);
      };
    }
    inited = true;
  };

  watch(openModel, async (val) => {
    if ((val && Object.is(inited, false)) || props.destroyOnClose) {
      initDrag();
    }
  });

  watch(() => route.fullPath, closeModal);
</script>

<style lang="less">
  .draggable-modal {
    &.fullscreen {
      .ant-modal {
        inset: 0 !important;
        width: 100% !important;
        max-width: 100vw !important;
        height: 100% !important;
      }

      .ant-modal-content {
        width: 100% !important;
        height: 100% !important;
      }
    }

    .ant-modal-wrap {
      overflow-x: hidden;
    }

    .ant-modal {
      position: relative;
      min-width: 200px;
      min-height: 200px;
      margin: 0;
      padding: 0;

      .ant-modal-header {
        user-select: none;
      }

      .ant-modal-close {
        top: 6px;
        right: 30px;
        background-color: transparent;
        cursor: inherit;

        &:hover,
        &:focus {
          color: rgb(0 0 0 / 45%);
        }

        .ant-space-item:hover .anticon,
        .ant-space-item:focus .anticon {
          color: rgb(0 0 0 / 75%);
          text-decoration: none;
        }

        .ant-modal-close-x {
          width: 50px;
          height: 50px;
          line-height: 44px;

          .ant-space {
            width: 100%;
            height: 100%;
          }
        }
      }

      .ant-modal-content {
        /* width: ~'v-bind("props.width")px'; */
        display: flex;
        flex-direction: column;
        width: 100%;
        min-width: 200px;
        height: 100%;
        min-height: 200px;
        padding-top: 0;
        overflow: hidden;

        .ant-modal-header {
          padding-top: 20px;
        }

        .ant-modal-body {
          flex: auto;
          height: 100%;
          overflow: auto;
        }
      }
    }
  }
</style>
