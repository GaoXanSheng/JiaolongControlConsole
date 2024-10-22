import * as echarts from 'echarts'
interface option {
	title: string
	xAxis: {
		min: number
		max: number
		name: string
	}
	yAxis: {
		min: number
		max: number
		name: string
	}
}
type EChartsOption = echarts.EChartsOption
export default function EchartsInit(
	dom: HTMLElement | null,
	data: number[][],
	options: option,
	callback: any
) {
	const myChart = echarts.init(dom)
	let option: EChartsOption

	const symbolSize = 10

	option = {
		title: {
			text: options.title,
			left: 'center'
		},
		tooltip: {
			triggerOn: 'none',
			formatter: function (params: any) {
				return `${options.xAxis.name}: ${params.data[0].toFixed(0)}<br>${options.yAxis.name}:${params.data[1].toFixed(0)}`
			}
		},
		grid: {
			top: '10%',
			bottom: '10%'
		},
		xAxis: {
			min: options.xAxis.min,
			max: options.xAxis.max,
			type: 'value',
			axisLine: { onZero: true }
		},
		yAxis: {
			min: options.yAxis.min,
			max: options.yAxis.max,
			type: 'value',
			axisLine: { onZero: true }
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
	}

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
						onPointDragging(dataIndex, [(this as any).x, (this as any).y])
					},
					onmousemove: function () {
						showTooltip(dataIndex)
					},
					onmouseout: function () {
						hideTooltip(dataIndex)
					},
					z: 100
				}
			})
		})
	}, 0)

	window.addEventListener('resize', updatePosition)

	myChart.on('dataZoom', updatePosition)

	function updatePosition() {
		myChart.setOption({
			graphic: data.map(function (item, _dataIndex) {
				return {
					position: myChart.convertToPixel('grid', item)
				}
			})
		})
	}

	function showTooltip(dataIndex: number) {
		myChart.dispatchAction({
			type: 'showTip',
			seriesIndex: 0,
			dataIndex: dataIndex
		})
	}

	function hideTooltip(_dataIndex: number) {
		myChart.dispatchAction({
			type: 'hideTip'
		})
	}

	function onPointDragging(dataIndex: number, pos: number[]) {
		// 将像素坐标转换为数据坐标
		let [x, y] = myChart.convertFromPixel('grid', pos)

		// 获取 x 和 y 轴的最小和最大值
		const xMin = options.xAxis.min
		const xMax = options.xAxis.max
		const yMin = options.yAxis.min
		const yMax = options.yAxis.max

		// 限制 x 和 y 值在设定范围内
		x = Math.max(xMin, Math.min(Number(x.toFixed(0)), xMax))
		y = Math.max(yMin, Math.min(Number(y.toFixed(0)), yMax))
		// 更新数据
		data[dataIndex] = [x, y]
		callback(data[dataIndex], dataIndex)

		// 更新图表
		myChart.setOption({
			series: [
				{
					id: 'a',
					data: data
				}
			]
		})
	}

	option && myChart.setOption(option)
}
