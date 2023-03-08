<template>
  <div class="color-box">
    <div
      ref="divRef"
      :class="`color-picker-panel ${isShowColorList ? 'color-picker-panel-active' : ''}`"
      :style="{ background: activeColor }"
      @click="showColorList"
    ></div>
    <Transition>
      <div v-if="isShowColorList" class="color-list" @click="selectColor">
        <section
          v-for="hex in colorList"
          :key="hex"
          :data-value="hex"
          :class="`color-picker ${activeColor === hex ? 'color-selected' : ''}`"
          :style="{ background: hex }"
        >
          <img v-if="activeColor === hex ? true : false" :src="selectColorLogo" />
        </section>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
  import { ref, unref, watch, onMounted, onUnmounted } from 'vue';
  import selectColorLogo from '/@/assets/icons/select_color.png';
  interface IProps {
    color: string;
  }
  interface EmitsType {
    (e: 'update:color', value: string): void;
  }
  const emit = defineEmits<EmitsType>();
  const props = withDefaults(defineProps<IProps>(), {
    color: '#0990af'
  });

  const colorList = [
    '#3B82F6',
    '#F59E0B',
    '#22C55E',
    '#A855F7',
    '#FF5757',
    '#89B4F9',
    '#F9C46C',
    '#7ADC9E',
    '#FF9A9A',
    '#CA99FA'
  ];
  const divRef = ref<null | HTMLDivElement>(null);
  const isShowColorList = ref<boolean>(false);
  const activeColor = ref<string>(unref(props.color));
  const showColorList = () => {
    // event.stopPropagation();
    isShowColorList.value = !unref(isShowColorList);
  };
  const selectColor = (event: any) => {
    event.stopPropagation();
    const value = event?.target?.getAttribute('data-value');
    if (value) {
      activeColor.value = value;
      emit('update:color', value);
    }
  };

  const outsideClickListener = (e: any) => {
    if (e.target !== divRef.value) {
      if (isShowColorList.value) {
        isShowColorList.value = false;
      }
    }
  };

  watch(
    () => props.color,
    (value) => {
      activeColor.value = value;
    }
  );

  onMounted(() => {
    document.addEventListener('click', outsideClickListener);
  });
  onUnmounted(() => {
    document.removeEventListener('click', outsideClickListener);
  });
</script>

<style lang="scss" scoped>
  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.5s ease;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
  .color-box {
    position: absolute;
  }
  .color-list:before {
    position: absolute;
    content: '';
    width: 0;
    height: 0;
    top: 2rem;
    left: -0.5rem;
    border-top: solid 10px transparent;
    border-right: solid 10px #ffffff;
    border-bottom: solid 10px transparent;
  }
  .color-list {
    z-index: 9;
    position: absolute;
    left: 2rem;
    top: -2rem;
    display: grid;
    align-items: center;
    align-content: space-evenly;
    justify-content: space-between;
    justify-items: center;
    grid-template-columns: repeat(auto-fill, minmax(2rem, 1fr));
    grid-gap: 0.5rem 0.5rem;
    padding: 0.5rem;
    width: 14rem;
    border-radius: 6px;
    background: #ffff;
    box-shadow: 4px 4px 12px 0px rgb(0 0 0 / 30%);
    .color-picker {
      border-radius: 4px;
      cursor: pointer;
      width: 2rem;
      height: 2rem;
      position: relative;
    }
    .color-selected {
      border: 2px solid #dddddd;
    }
    img {
      position: absolute;
      bottom: 0px;
      right: -0.4rem;
    }
  }
  .color-picker-panel {
    cursor: pointer;
    border-radius: 4px;
    width: 1rem;
    height: 1rem;
  }
  .color-picker-panel-active {
    border: 1px solid #0cacff;
    //box-shadow: 2px 2px 2px 1px #1ab1d3;
  }
</style>
