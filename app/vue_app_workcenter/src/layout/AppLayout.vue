<template>
  <div class="bg-gray-50">
    <Breadcrumb style="height: 3.5rem" :home="props.home" :model="props.model" />
    <div class="w-full p-2" style="height: calc(100vh - 3.5rem)">
      <slot name="AppBody"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import Breadcrumb from 'primevue/breadcrumb';
  import type { MenuItem } from 'primevue/menuitem';

  interface IProps {
    /**
     * An array of menuitems.
     */
    model?: MenuItem[];
    /**
     * Configuration for the home icon.
     */
    home?: MenuItem;
  }
  const props = defineProps<IProps>();
</script>
