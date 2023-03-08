<template>
  <Dialog
    header="添加自定义过滤条件"
    :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
    :style="{ width: '50vw' }"
    :modal="true"
  >
    <div class="grid" style="width: 100%; padding: 20px">
      <div class="col-4 md:col-4 lg:col-4">
        <div v-if="props.currentRouterTitle !== curveOverlay()" style="margin-bottom: 4px">字段名</div>
        <Dropdown
          id="queryFieldList"
          v-model="queryItem.field"
          :options="queryFieldList"
          option-label="label"
          option-value="value"
          placeholder="过滤条件"
          style="width: 100%"
        />
      </div>
      <div class="col-4 md:col-4 lg:col-4">
        <div v-if="props.currentRouterTitle !== curveOverlay()" style="margin-bottom: 4px">操作符</div>
        <Dropdown
          id="queryDomainList"
          v-model="queryItem.operator"
          :options="queryDomainList"
          option-label="label"
          option-value="value"
          placeholder="操作符"
          style="width: 100%"
        />
      </div>
      <div class="col-4 md:col-4 lg:col-4">
        <div v-if="props.currentRouterTitle !== curveOverlay()" style="margin-bottom: 4px">字段值</div>
        <AutoComplete
          v-model="queryItem.value"
          :suggestions="suggestions"
          :disabled="!queryItem.field"
          style="width: 100%"
          @complete="searchFieldValue($event)"
        />
      </div>
    </div>
    <template #footer>
      <Button label="取消" icon="pi pi-times" class="p-button-text" @click="onCancel" />
      <Button label="添加" icon="pi pi-check" @click="onConfirm" />
    </template>
  </Dialog>
</template>

<script lang="ts" setup>
  import Dialog from 'primevue/dialog';
  import AutoComplete from 'primevue/autocomplete';
  import Dropdown from 'primevue/dropdown';
  import Button from 'primevue/button';
  import { useQuery, type tFilter, useDialog } from '/@/hooks/modules/curveList';
  import { curveOverlay } from '/@/constant/common';
  type Emit = {
    (event: 'onCancel', value: boolean): void;
    (event: 'onConfirm', value: boolean): void;
    (event: 'onSendFilterList', obj: Array<tFilter>): void;
  };
  type Props = {
    currentRouterTitle: string;
  };
  const emit = defineEmits<Emit>();
  const props = defineProps<Props>();
  const { addFilter, searchFieldValue, queryItem, suggestions, queryDomainList, queryFieldList, filterList } =
    useQuery();
  const { closeDialog } = useDialog();
  const onCancel = () => {
    closeDialog();
    emit('onCancel', false);
  };
  const onConfirm = () => {
    filterList.value = [];
    addFilter();
    emit('onConfirm', false);
    emit('onSendFilterList', filterList.value);
  };
</script>

<style scoped>
  .p-button.p-button-text {
    border: 1px solid var(--blue-500);
  }
</style>
