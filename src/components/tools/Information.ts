import * as echarts from "echarts";
import {EChartsOption} from "echarts";

export function showTemperature(dom:any,title:string,max:number) {
    const myChart = echarts.init(dom);
    const option: EChartsOption = {
        series: [
            {
                type: 'gauge',
                center: ['50%', '60%'],
                startAngle: 200,
                endAngle: -20,
                min: 0,
                max,
                splitNumber: 20,
                itemStyle: {
                    color: '#FFAB91'
                },
                progress: {
                    show: true,
                    width: 10
                },
                pointer: {
                    show: false
                },
                axisTick: {
                  show:false
                },
                splitLine: {

                    distance: -25,
                    length: 10,
                    lineStyle: {
                        width: 2,
                        color: '#999'
                    }
                },
                axisLabel: {
                    distance: -15,
                    color: '#999',
                    fontSize: 12
                },
                anchor: {
                    show: false
                },
                title: {
                    show: false
                },
                detail: {
                    valueAnimation: true,
                    width: '70%',
                    lineHeight: 20,
                    borderRadius: 8,
                    offsetCenter: [0, '-15%'],
                    fontSize: 16,
                    fontWeight: 'bolder',
                    formatter: `${title}`,
                    color: 'inherit'
                },
                data: [
                    {
                        value: 20
                    }
                ]
            }
        ]
    };
    option && myChart.setOption(option);
    return function (value:number) {
        myChart.setOption({
            series: [
                {
                    data: [
                        {
                            value
                        }
                    ]
                }
            ]
        })
    }
}