<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="show" ref="boxDomRef" class="modal-mask">
        <main class="display-row px-3 pt-3 mb-2">
          <section v-if="status === 'done'" class="display-row">
            <i class="pi pi-check-circle" style="font-size: 1.2rem; color: var(--green-400)"></i>
            <span class="ml-2 modal-title select-none">全部下载完成</span>
          </section>
          <section v-else class="display-row">
            <i class="pi pi-spin pi-sync" style="font-size: 1.2rem; color: var(--blue-400)"></i>
            <span class="ml-2 modal-title select-none">下载中 {{ doneNum }} / {{ totalNum }}</span>
          </section>
          <section>
            <Button
              v-if="isExpand"
              icon="pi pi-angle-down"
              class="p-button-plain p-button-text"
              @click="toggleExpand(false)"
            />
            <Button v-else icon="pi pi-angle-up" class="p-button-plain p-button-text" @click="toggleExpand(true)" />
            <Button icon="pi pi-times" class="p-button-danger p-button-text" @click="onClick" />
          </section>
        </main>
        <div style="height: 1rem">
          <Transition name="progress">
            <ProgressBar v-if="status === 'downloading'" :value="value" :show-value="isExpand" />
          </Transition>
        </div>
        <main ref="collapseDomRef" class="collapse px-3">
          <div v-for="item in list" :key="item.file" class="display-row file-item">
            <section>
              <div class="file-label select-none">{{ item.file }}</div>
              <div class="progress-label select-none">
                {{ bytesToSize(item.loaded) }} / {{ bytesToSize(item.total) }}
              </div>
            </section>
            <section class="display-row">
              <span style="font-size: 10px" class="mr-2 select-none">{{ item.progress }}%</span>
              <ProgressCircle
                :value-num="item.progress"
                :size="20"
                :color="item.progress >= PROGRESS_BAR_MAX_VALUE ? 'var(--green-400)' : 'var(--blue-400)'"
                :stroke-width="2"
                :font-size="6"
              />
            </section>
          </div>
        </main>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
  import { ref, watch, nextTick } from 'vue';
  import Button from 'primevue/button';
  import ProgressBar from 'primevue/progressbar';
  import ProgressCircle from '/@/components/ProgressBar/ProgressCircle.vue';
  import { tDownloadItem } from '/@/types/store';
  import { bytesToSize } from '/@/utils/math';
  interface EmitsType {
    (e: 'close'): void;
  }
  const props = withDefaults(
    defineProps<{
      show: boolean;
      doneNum: number; // 已下载数量
      totalNum: number; // 下载文件总数量
      value: number; // 下载总进度 0~100
      status: 'done' | 'downloading';
      list: tDownloadItem[];
    }>(),
    {
      show: false,
      doneNum: 0,
      totalNum: 0,
      value: 0
    }
  );
  const PROGRESS_BAR_MAX_VALUE = 100;
  const emit = defineEmits<EmitsType>();
  const isExpand = ref<boolean>(false);
  const boxDomRef = ref<null | HTMLDivElement>(null);
  const collapseDomRef = ref<null | HTMLDivElement>(null);

  const setBoxHeight = () => {
    const collapseDomHeight = collapseDomRef.value?.getBoundingClientRect()?.height || 0;
    boxDomRef.value?.style.setProperty('height', `calc(${collapseDomHeight}px + 5rem)`);
  };
  const resSetBoxHeight = () => {
    boxDomRef.value?.style.setProperty('height', '4rem');
  };
  const toggleExpand = (isShow: boolean) => {
    isExpand.value = isShow;
    if (isShow) {
      nextTick(() => {
        setBoxHeight();
      });
    } else {
      resSetBoxHeight();
    }
  };
  const onClick = () => {
    resSetBoxHeight();
    isExpand.value = false;
    emit('close');
  };

  watch(
    () => props.list.length,
    (hasItemChange) => {
      // 展开状态下如果下载文件数量有变化修改整个卡片的高度
      if (hasItemChange && isExpand.value) {
        nextTick(() => {
          setBoxHeight();
        });
      }
    }
  );
</script>

<style lang="scss" scoped>
  ::v-deep(.p-button.p-button-icon-only) {
    width: 2rem;
    padding: 0.2rem 0;
  }
  /*::v-deep(.p-progressbar) {*/
  /*  position: relative;*/
  /*  overflow: hidden;*/
  /*  top: 0.8rem;*/
  /*  left: -2rem;*/
  /*  width: 23rem;*/
  /*  height: 0.5rem;*/
  /*}*/
  .p-progressbar {
    border: 0 none;
    height: 1rem;
    background: #f1f1f1;
    border-radius: 0px;
  }
  .modal-mask {
    position: absolute;
    bottom: 2rem;
    left: calc(100% - 24rem);
    width: 22rem;
    min-height: 4rem;
    height: 4rem;
    background: #ffffff;
    border-radius: 10px;
    border: 1px solid #dee2e6;
    /*padding: 1rem 1rem;*/
    z-index: 1;
    transition: all 0.3s ease;
    overflow: hidden;
    box-shadow: 0.3rem 0.5rem 8px rgb(0 0 0 / 4%), 0.4rem 0.6rem 18px rgb(0 0 0 / 7%);
  }
  .modal-title {
    font-weight: 600;
  }
  .display-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .collapse {
    max-height: 30rem;
    overflow: hidden;
  }
  .file-item {
    height: 3rem;
    padding: 0.5rem 0;
  }
  .file-label {
    font-size: 14px;
    font-weight: 500;
  }
  .progress-label {
    margin-top: 0.1rem;
    font-size: 10px;
  }

  .collapse:hover {
    padding-right: calc(1rem - 4px) !important; // 解决滚动条出现时闪屏的问题
    overflow-y: scroll;
  }
  ::-webkit-scrollbar {
    width: 4px;
    height: 9px;
  } /* 滚动条整体宽度 */
  ::-webkit-scrollbar-track {
    background-color: #ffffff;
  } /*滚动条背景色*/
  ::-webkit-scrollbar-thumb {
    background-color: #e0e0e0;
    border-radius: 8px;
  }

  /*组件渲染过度动画*/
  .modal-enter-active,
  .modal-leave-active {
    transition: opacity 0.5s ease;
  }
  .modal-enter-from,
  .modal-leave-to {
    opacity: 0;
  }

  /*组件渲染过度动画*/
  .progress-enter-active,
  .progress-leave-active {
    transition: opacity 0.5s ease;
  }
  .progress-enter-from,
  .progress-leave-to {
    opacity: 0;
  }
</style>
