import { defineComponent, unref, computed } from 'vue';
import { createFromIconfontCN } from '@ant-design/icons-vue';
import type { PropType } from 'vue';
import { isString } from '@/utils/is';

let scriptUrls = [`${import.meta.env.BASE_URL}iconfont.js`];

// document：https://antdv.com/components/icon-cn#components-icon-demo-iconfont
let MyIconFont = createFromIconfontCN({
  // scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
  // scriptUrl: '//at.alicdn.com/t/font_2184398_zflo1kjcemp.js',
  // iconfont font icon localization, see:/public/iconfont.js for details
  scriptUrl: scriptUrls,
});

export default defineComponent({
  name: 'IconFont',
  props: {
    type: {
      type: String as PropType<string>,
      default: '',
    },
    prefix: {
      type: String,
      default: 'icon-',
    },
    color: {
      type: String as PropType<string>,
      default: 'unset',
    },
    size: {
      type: [Number, String] as PropType<number | string>,
      default: 14,
    },
    scriptUrl: {
      // Alibaba library font icon path
      type: String as PropType<string | string[]>,
      default: '',
    },
  },
  setup(props, { attrs }) {
    // If the font icon path is passed in from outside, the default one will be overwritten.
    if (props.scriptUrl) {
      scriptUrls = [...new Set(scriptUrls.concat(props.scriptUrl))];
      MyIconFont = createFromIconfontCN({
        scriptUrl: scriptUrls,
      });
    }

    const wrapStyleRef = computed(() => {
      const { color, size } = props;

      const fs = isString(size) ? parseFloat(size) : size;

      return {
        color,
        fontSize: `${fs}px`,
      };
    });

    return () => {
      const { type, prefix } = props;

      return type ? (
        <MyIconFont
          type={type.startsWith(prefix) ? type : `${prefix}${type}`}
          {...attrs}
          style={unref(wrapStyleRef)}
        />
      ) : null;
    };
  },
});
