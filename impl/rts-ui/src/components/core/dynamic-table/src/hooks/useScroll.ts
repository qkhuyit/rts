import { computed, getCurrentInstance, ref, onBeforeUnmount } from 'vue';
import { debounce } from 'lodash-es';
import type { DynamicTableProps } from '../dynamic-table';

type UseScrollParams = {
  props: DynamicTableProps;
};

export type UseScrollType = ReturnType<typeof useScroll>;

// Get the distance from the element to the top-general method
export const getPositionTop = (node: HTMLElement) => {
  let top = node.offsetTop;
  let parent = node.offsetParent as HTMLElement;
  while (parent != null) {
    top += parent.offsetTop;
    parent = parent.offsetParent as HTMLElement;
  }
  return top; // All parent elements top and
};

export const useScroll = ({ props }: UseScrollParams) => {
  const currIns = getCurrentInstance();
  const scrollY = ref<number>();

  const scroll = computed(() => {
    return {
      y: scrollY.value,
      ...props.scroll,
    };
  });

  const getScrollY = debounce(() => {
    if (!props.autoHeight) return;
    const compRootEl = currIns?.proxy?.$el as HTMLDivElement;
    const el =
      compRootEl?.querySelector('.ant-table-body') || compRootEl?.querySelector('.ant-table-tbody');
    if (el) {
      const y = document.documentElement.offsetHeight - getPositionTop(el as HTMLDivElement);
      // Simple and rough implementation
      scrollY.value = y - 30;
    }
    // console.log('innerScroll.value', el, scrollY.value);
  });

  setTimeout(getScrollY);
  window.addEventListener('resize', getScrollY);

  onBeforeUnmount(() => {
    window.removeEventListener('resize', getScrollY);
  });

  return {
    scroll,
  };
};
