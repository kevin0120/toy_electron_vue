import { onMounted, onUnmounted, ref, type Ref } from 'vue';

/**
 *滚动条相关操作
 * @param elRef 储存dom的ref
 */
export default function useScroll(elRef?: Ref<HTMLElement | null>) {
  let el: any = window;
  const isReachBottom = ref(false);
  const clientHeight = ref(0);
  const scrollTop = ref(0);
  const scrollHeight = ref(0);

  const scrollListenerHandler = () => {
    if (el === window) {
      clientHeight.value = document.documentElement.clientHeight;
      scrollHeight.value = document.documentElement.scrollHeight;
      scrollTop.value = document.documentElement.scrollTop;
    } else {
      clientHeight.value = el.clientHeight;
      scrollTop.value = el.scrollTop;
      scrollHeight.value = el.scrollHeight;
    }
    if (el.clientHeight + el.scrollTop + 3 >= el.scrollHeight) {
      isReachBottom.value = true;
    } else {
      isReachBottom.value = false;
    }
  };
  onMounted(() => {
    if (elRef) {
      el = elRef.value;
    }
    el.addEventListener('scroll', scrollListenerHandler);
  });
  onUnmounted(() => {
    el.removeEventListener('scroll', scrollListenerHandler);
  });

  return { isReachBottom, clientHeight, scrollTop, scrollHeight };
}
