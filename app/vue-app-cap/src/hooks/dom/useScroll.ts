import { onMounted, onUnmounted, ref } from 'vue';

export default function useScroll(elRef?: any) {
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
    if (clientHeight.value + scrollTop.value >= scrollHeight.value) {
      // homeStore.fetchHouselistData()
      isReachBottom.value = true;
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
