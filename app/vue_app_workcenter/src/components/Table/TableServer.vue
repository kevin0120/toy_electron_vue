<template>
  <div style="height: 100%; width: 100%">
    <DataTable
      v-model:expandedRows="expandedRows"
      v-model:selection="selectedList"
      class="p-datatable-sm"
      :value="dataRows"
      :paginator="true"
      :rows="10"
      :total-records="total"
      :row-hover="false"
      filter-display="menu"
      :scrollable="true"
      scroll-height="flex"
      :loading="loading"
      :lazy="lazy"
      :resizable-columns="true"
      paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink  LastPageLink RowsPerPageDropdown CurrentPageReport "
      :rows-per-page-options="[10, 20, 50]"
      current-page-report-template="总数 {totalRecords} "
      responsive-layout="scroll"
      :row-class="rowClass"
      @sort="_onSort"
      @page="_onPageChange"
      @row-expand="_onRowExpand"
      @row-collapse="_onRowCollapse"
    >
      <template #empty><h2 style="text-align: center; width: 100%">暂无数据...</h2></template>
      <template #loading><div style="color: #fff">正在加载数据中...</div></template>
      <slot name="columns"></slot>
      <template #expansion="slotProps">
        <slot name="expansionSlot" v-bind="slotProps"></slot>
      </template>
      <template #paginatorstart>
        <slot name="paginatorStartSlot"></slot>
      </template>
      <template #paginatorend>
        <slot name="paginatorEndSlot"></slot>
      </template>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
  import DataTable, {
    DataTablePageEvent,
    DataTableRowCollapseEvent,
    DataTableRowExpandEvent,
    DataTableSortEvent
  } from 'primevue/datatable';
  import { ref, watch, onMounted } from 'vue';
  import { IPagination, IRes } from '/@/api/types/common';
  import { useToast } from 'primevue/usetoast';

  interface IProps {
    tableData?: {
      pageCount: number;
      rows: any[];
    };
    getDataApi?: (...arg: any[]) => Promise<IRes<IPagination<any>>>;
    reqData?: Record<string, any>;
    rowClass?: (data: any) => object | string | undefined;
  }

  interface EmitsType {
    (e: 'onSelected', list: any[]): void;
    (e: 'onGetResData', data: any): void;
    (e: 'onPageChange', event: DataTablePageEvent): void;
    (e: 'onSortChange', data: any): void;
    (e: 'onRowExpand', event: DataTableRowExpandEvent): void;
    (e: 'onRowCollapse', event: DataTableRowCollapseEvent): void;
    (e: 'onSelectAllChange', isSelectAll: boolean): void;
  }
  const emit = defineEmits<EmitsType>();
  const props = defineProps<IProps>();
  const toast = useToast();

  const dataRows = ref<any[]>([]);
  const total = ref<number>(0);
  const loading = ref<boolean>(true);
  const lazy = ref<boolean>(true);
  const expandedRows = ref([]);
  const selectedList = ref([]);

  onMounted(() => {
    try {
      if (props.tableData) {
        const { pageCount, rows } = props.tableData;
        total.value = pageCount;
        dataRows.value = rows;
        lazy.value = false;
      }
      if (props.getDataApi) {
        const { getDataApi, reqData } = props;
        getDataApi(10, 1, reqData)
          .then((res) => {
            dataRows.value = res.data.data_list;
            total.value = res.data.total;
            emit('onGetResData', res);
          })
          .catch((e) => {
            toast.add({ severity: 'error', summary: '获取表格数据失败', detail: e.message, life: 10000 });
          });
      }
    } finally {
      loading.value = false;
    }
  });

  const _onRowExpand = (event: DataTableRowExpandEvent) => {
    emit('onRowExpand', event);
  };
  const _onRowCollapse = (event: DataTableRowCollapseEvent) => {
    emit('onRowCollapse', event);
  };

  const _onPageChange = (e: DataTablePageEvent) => {
    loading.value = true;
    try {
      if (props.getDataApi) {
        const { getDataApi, reqData } = props;
        getDataApi(e.rows, e.page + 1, reqData).then((res) => {
          dataRows.value = res.data.data_list;
          total.value = res.data.total;
          emit('onPageChange', e);
          emit('onGetResData', res);
        });
      }
    } finally {
      loading.value = false;
      selectedList.value = [];
    }
  };

  const _onSort = (event: DataTableSortEvent) => {
    const data = {
      sortField: event.sortField,
      sortOrder: event.sortOrder === 1 ? 'asc' : 'desc'
    };
    selectedList.value = [];
    emit('onSortChange', data);
  };

  watch(selectedList, (value) => {
    if (dataRows.value.length === value.length) {
      emit('onSelectAllChange', true);
    } else {
      emit('onSelectAllChange', false);
    }
    emit('onSelected', value);
  });

  watch(
    () => props.reqData,
    (reqData) => {
      // 请求参数变化的时候重新发送请求获取数据
      const { getDataApi } = props;
      if (getDataApi) {
        getDataApi(10, 1, reqData)
          .then((res) => {
            dataRows.value = res.data.data_list;
            total.value = res.data.total;
            emit('onGetResData', res);
          })
          .catch((e) => {
            toast.add({ severity: 'error', summary: '获取表格数据失败', detail: e.message, life: 10000 });
          });
        selectedList.value = [];
      }
    }
  );
</script>

<style lang="css" scoped></style>
