<template>
  <div ref="draggableContainer" class="draggableContainer p-component p-1">
    <div v-for="(item, index) in list" :key="item.value" class="px-1">
      <section class="draggable-item">
        <section>
          <span class="my-handle pr-2">::</span>
          <span :class="`${item.isShow ? '' : 'slash'}`">{{ item.label }}</span>
        </section>
        <span
          :class="`show-icon pi  ${item.isShow ? 'pi-eye' : 'pi-eye-slash slash'}`"
          @click="ToggleShow(index)"
        ></span>
      </section>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, onUnmounted, ref } from 'vue';
  import type { PropType } from 'vue';
  import Sortable from 'sortablejs';

  interface Item {
    label: string;
    value: string;
    isShow: boolean;
  }
  const draggableContainer = ref<HTMLDivElement | null>(null);

  const props = defineProps({
    list: {
      type: Array as PropType<Array<any | Item>>,
      default: () => []
    },
    // 参考：https://github.com/SortableJS/Sortable#options
    options: {
      type: Object as PropType<Sortable.Options>,
      default: () => {}
    }
  });

  interface EmitsType {
    (e: 'update:list', value: any[]): void;
    (e: 'onChangeList', value: any[]): void;
  }

  const emit = defineEmits<EmitsType>();

  const sortable = ref<Sortable | null>(null);

  onMounted(() => {
    initDraggable();
  });

  const initDraggable = () => {
    if (!draggableContainer.value) {
      console.warn('容器不能为空');
      return;
    }
    sortable.value = Sortable.create(draggableContainer.value, {
      handle: '.my-handle',
      chosenClass: 'chosen',
      dragClass: 'drag',
      direction: 'horizontal',
      forceFallback: true,
      animation: 300,
      onUpdate(e: any) {
        if (e.oldIndex !== undefined && e.newIndex !== undefined) {
          // 删除拖拽的元素
          const list = [...props.list];
          const item = list.splice(e.oldIndex, 1)[0];
          // 把删除的元素放到新的位置
          list.splice(e.newIndex, 0, item);
          emit('update:list', list);
          emit('onChangeList', list);
        }
      },
      ...props.options
    });
  };

  const ToggleShow = (index: number) => {
    const list = [...props.list];
    list[index].isShow = !list[index].isShow;
    emit('update:list', list);
    emit('onChangeList', list);
  };

  onUnmounted(() => {
    sortable.value?.destroy();
  });
</script>

<style lang="scss" scoped>
  .slash {
    color: #bbbfc4;
  }
  .draggableContainer {
    max-width: 60rem;
    background: #ffffff;
    color: #495057;
    border: 0 none;
    border-radius: 6px;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  }
  .draggable-item {
    margin: 0;
    padding: 0.75rem 1.25rem;
    border: 0 none;
    color: #495057;
    background: transparent;
    transition: box-shadow 0.2s;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: normal;
    white-space: nowrap;
    position: relative;
    overflow: hidden;
  }
  //.draggable-item:hover {
  //  background: #e9ecef;
  //}
  .my-handle {
    cursor: move;
    cursor: -webkit-grabbing;
  }
  .drag {
    // 正在拖拽中幽灵图的样式
    display: none;
    cursor: move;
    cursor: -webkit-grabbing;
  }
  .chosen {
    cursor: move;
    cursor: -webkit-grabbing;
    border-radius: 6px;
    box-shadow: 0 2px 10px 0 rgb(0 0 0 / 20%);
  }
  .show-icon {
    cursor: pointer;
  }
</style>
