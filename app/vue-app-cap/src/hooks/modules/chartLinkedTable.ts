import { ref } from 'vue';
import type { tCurveInfo } from '/@/api/types/curves';

export function useChartLinkedTable() {
  const clickedSeriesName = ref();
  const getSeriesName = (seriesName: string) => {
    clickedSeriesName.value = seriesName;
  };
  const rowClass = (data: tCurveInfo) => {
    let className = '';
    if (!data.curve_file) {
      className = 'row-no-curve-file ';
    }
    if (data.entity_id === clickedSeriesName.value) {
      className += 'row-curve-highlight ';
    }
    return className;
  };
  return {
    getSeriesName,
    rowClass
  };
}
