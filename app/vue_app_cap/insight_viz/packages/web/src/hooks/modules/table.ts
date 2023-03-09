import { ref } from 'vue';

export const columnList = [
  {
    label: '追溯码',
    value: 'track_no'
  },
  {
    label: '曲线编号',
    value: 'entity_id'
  },
  {
    label: '工具序列号',
    value: 'attribute_equipment_no'
  },
  {
    label: '工作中心',
    value: 'workcenter_code'
  },
  {
    label: '拧紧结果',
    value: 'tightening_result'
  },
  {
    label: '程序号',
    value: 'tightening_process_no'
  }
];

export function useDynamicColumns() {
  const selectColumnsList = ref([
    {
      label: '曲线编号',
      value: 'entity_id'
    },
    {
      label: '拧紧结果',
      value: 'tightening_result'
    }
  ]);
  const columnList = ref([
    {
      label: '曲线编号',
      value: 'entity_id',
      isShow: true
    },
    {
      label: '拧紧结果',
      value: 'tightening_result',
      isShow: true
    },
    {
      label: '分析结果',
      value: 'analysis_result_state',
      isShow: false
    },
    {
      label: '工作中心',
      value: 'workcenter_code',
      isShow: false
    },
    {
      label: '追溯码',
      value: 'track_no',
      isShow: false
    },
    {
      label: '工具序列号',
      value: 'attribute_equipment_no',
      isShow: false
    },
    {
      label: '程序号',
      value: 'tightening_process_no',
      isShow: false
    }
  ]);
  return {
    selectColumnsList,
    columnList
  };
}
