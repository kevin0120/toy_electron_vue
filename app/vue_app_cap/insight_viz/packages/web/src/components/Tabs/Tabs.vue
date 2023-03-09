<template>
  <div class="tabs-container">
    <nav class="tabs-wrapper">
      <section class="tabs" @click="tabsClick">
        <template v-for="(tab, idx) in tabs" :key="tab.props.header">
          <button
            :class="['tabs-button', isTabActive(idx) ? 'tabs-active' : '']"
            :data-translate-value="idx * 100 + '%'"
            :data-index="idx"
          >
            {{ tab.props.header }}
          </button>
        </template>
      </section>
      <div class="tabs-slider" aria-hidden="true">
        <div ref="divRef" class="tabs-slider-rect">&nbsp;</div>
      </div>
    </nav>
    <div class="tabs-panel">
      <template v-for="(tab, i) of tabs" :key="getKey(tab, i)">
        <div
          v-if="lazy ? isTabActive(i) : true"
          v-show="lazy ? true : isTabActive(i)"
          :style="getTabProp(tab, 'contentStyle')"
          role="tabpanel"
          v-bind="getTabProp(tab, 'contentProps')"
        >
          <component :is="tab"></component>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, useSlots, computed } from 'vue';
  const divRef = ref<HTMLDivElement | null>(null);

  interface IProps {
    activeIndex?: number;
    lazy?: boolean;
  }
  interface EmitsType {
    (e: 'update:activeIndex', index: number): void;
    (e: 'onTabChange', { originalEvent, index }: { originalEvent: any; index: number }): void;
  }
  withDefaults(defineProps<IProps>(), {
    activeIndex: 0,
    lazy: false
  });
  const emit = defineEmits<EmitsType>();
  const state = reactive({ activeIndex: 0 });
  const tabsClick = (event: any) => {
    const targetTranslateValue = event.target.dataset.translateValue;
    const index = event.target.dataset.index;
    if (event.target.classList.contains('tabs-button')) {
      emit('update:activeIndex', Number(index));
      emit('onTabChange', { originalEvent: event, index: Number(index) });
      state.activeIndex = Number(index);
      divRef.value?.style.setProperty('transform', `translateX(${targetTranslateValue})`);
    }
  };
  const getKey = (tab: any, index: number) => {
    return getTabProp(tab, 'header') || index;
  };
  const getTabProp = (tab: any, name: any) => {
    return tab.props ? tab.props[name] : undefined;
  };
  const isTabPanel = (child: any) => {
    return child.type.name === 'TabPanel';
  };
  const isTabActive = (index: number) => {
    return state.activeIndex === index;
  };
  const slots = useSlots();
  const tabs = computed(() => {
    return (slots as any)?.default().reduce((tabs: any, child: any) => {
      if (isTabPanel(child)) {
        tabs.push(child);
      } else if (child.children && child.children instanceof Array) {
        child.children.forEach((nestedChild: any) => {
          if (isTabPanel(nestedChild)) {
            tabs.push(nestedChild);
          }
        });
      }

      return tabs;
    }, []);
  });
</script>

<style scoped>
  button {
    border: none;
    cursor: pointer;
    background-color: transparent;
    outline: none;
  }
  .tabs-container {
    overflow: hidden;
    transition: max-height 0.4s ease-in-out;
  }

  .tabs-wrapper {
    position: relative;
    transition: opacity 0.2s ease-in-out;
    opacity: 1;
  }

  .tabs {
    border-radius: 0.5rem;
    padding: 0.3rem;
    overflow: hidden;
    background-color: var(--surface-50);
  }

  .tabs-button {
    position: relative;
    user-select: none;
    overflow: hidden;
    white-space: nowrap;
    border-radius: 0.5rem;
    height: 2rem;
    width: 6rem;
    font-size: 1rem;
    z-index: 1;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 900;
  }

  .tabs-active {
    transition: color 0.4s ease-in-out;
    color: var(--blue-500);
  }

  .tabs-slider {
    pointer-events: none;
    position: absolute;
    padding: 0.3rem;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
  }

  .tabs-slider-rect {
    height: 2rem;
    width: 6rem;
    border-radius: 0.5rem;
    background-color: var(--surface-0);
    box-shadow: 0 0.1rem 1rem -0.4rem rgba(0, 0, 0, 0.12);
    transition: transform 0.4s ease-in-out;
    transform: translateX(0);
  }
  .tabs-panel {
    width: 100%;
    padding: 0.3rem;
  }

  @media (max-width: 700px) {
    .tabs-wrapper {
      transform: scale(0.8);
    }
  }
</style>
