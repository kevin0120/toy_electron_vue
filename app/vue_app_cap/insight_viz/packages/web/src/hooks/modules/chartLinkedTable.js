import { ref } from 'vue';
export function useChartLinkedTable() {
    const clickedSeriesName = ref();
    const getSeriesName = (seriesName) => {
        clickedSeriesName.value = seriesName;
    };
    const rowClass = (data) => {
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
