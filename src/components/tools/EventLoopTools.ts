import * as echarts from "echarts";
interface option {
    title:string
    xAxis:{
        min:number,
        max:number,
        name:string
    },
    yAxis:{
        min:number,
        max:number,
        name:string
    }
}
type EChartsOption = echarts.EChartsOption;
export default function EchartsInit(dom:HTMLElement | null,data:number[][],options:option,callback:any) {
    let myChart = echarts.init(dom);
    let option: EChartsOption;

    const symbolSize = 20;

    option = {
        title: {
            text: options.title,
            left: 'center'
        },
        tooltip: {
            triggerOn: 'none',
            formatter: function (params: any) {
                return (`${options.xAxis.name}: ${params.data[0].toFixed(0)}<br>${options.yAxis.name}:${params.data[1].toFixed(0)}`);
            }
        },
        grid: {
            top: '8%',
            bottom: '12%'
        },
        xAxis: {
            min: options.xAxis.min,
            max: options.xAxis.max,
            type: 'value',
            axisLine: { onZero: false }
        },
        yAxis: {
            min: options.yAxis.min,
            max: options.yAxis.max,
            type: 'value',
            axisLine: { onZero: false }
        },
        series: [
            {
                id: 'a',
                type: 'line',
                smooth: true,
                symbolSize: symbolSize,
                data: data
            }
        ]
    };

    setTimeout(function () {
        // Add shadow circles (which is not visible) to enable drag.
        myChart.setOption({
            graphic: data.map(function (item, dataIndex) {
                return {
                    type: 'circle',
                    position: myChart.convertToPixel('grid', item),
                    shape: {
                        cx: 0,
                        cy: 0,
                        r: symbolSize / 2
                    },
                    invisible: true,
                    draggable: true,
                    ondrag: function (_dx: number, _dy: number) {
                        onPointDragging(dataIndex, [(this as any).x, (this as any).y]);
                    },
                    onmousemove: function () {
                        showTooltip(dataIndex);
                    },
                    onmouseout: function () {
                        hideTooltip(dataIndex);
                    },
                    z: 100
                };
            })
        });
    }, 0);

    window.addEventListener('resize', updatePosition);

    myChart.on('dataZoom', updatePosition);

    function updatePosition() {
        myChart.setOption({
            graphic: data.map(function (item, _dataIndex) {
                return {
                    position: myChart.convertToPixel('grid', item)
                };
            })
        });
    }

    function showTooltip(dataIndex: number) {
        myChart.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: dataIndex
        });
    }

    function hideTooltip(_dataIndex: number) {
        myChart.dispatchAction({
            type: 'hideTip'
        });
    }

    function onPointDragging(dataIndex: number, pos: number[]) {
        data[dataIndex] = myChart.convertFromPixel('grid', pos);
        callback(data[dataIndex],dataIndex)
        // Update data
        myChart.setOption({
            series: [
                {
                    id: 'a',
                    data: data
                }
            ]
        });
    }

    option && myChart.setOption(option);
}