<script setup lang="ts">
import { VueUiSparklineConfig } from 'vue-data-ui'
import { VueUiSparkline } from 'vue-data-ui'
function selectDatapoint({
	datapoint,
	index
}: {
	datapoint: VueUiSparklineDatasetItem
	index: number
}) {
	console.log({ datapoint, index })
}

type VueUiSparklineDatasetItem = {
	period: string
	value: number
}
const dataset: VueUiSparklineDatasetItem[] = [
	{
		period: 'period 1',
		value: 0
	},
	{
		period: 'period 2',
		value: -1
	},
	{
		period: 'period 3',
		value: 2
	},
	{
		period: 'period 4',
		value: -3
	},
	{
		period: 'period 5',
		value: 4
	},
	{
		period: 'period 6',
		value: -5
	},
	{
		period: 'period 7',
		value: 6
	},
	{
		period: 'period 8',
		value: -7
	},
	{
		period: 'period 9',
		value: 8
	},
	{
		period: 'period 10',
		value: -9
	},
	{
		period: 'period 11',
		value: 10
	},
	{
		period: 'period 12',
		value: -11
	},
	{
		period: 'period 13',
		value: 12
	},
	{
		period: 'period 14',
		value: -13
	},
	{
		period: 'period 15',
		value: 14
	},
	{
		period: 'period 16',
		value: -15
	},
	{
		period: 'period 17',
		value: 16
	}
]
const config: VueUiSparklineConfig = {
	type: 'line',
	downsample: { threshold: 500 },
	style: {
		backgroundColor: '#e1e5e8',
		fontFamily: 'inherit',
		chartWidth: 290,
		scaleMin: null,
		scaleMax: null,
		padding: { top: 12, right: 0, bottom: 3, left: 0 },
		animation: { show: true, animationFrames: 360 },
		line: { color: '#5f8bee', strokeWidth: 3, smooth: true },
		bar: { borderRadius: 3, color: '#5f8bee' },
		zeroLine: { color: '#505050', strokeWidth: 1 },
		plot: { show: true, radius: 4, stroke: '#FFFFFF', strokeWidth: 1 },
		verticalIndicator: { show: true, strokeWidth: 1.5, color: '#5f8bee', strokeDasharray: 3 },
		dataLabel: {
			show: true,
			offsetX: 0,
			offsetY: 0,
			position: 'left',
			fontSize: 48,
			bold: true,
			color: '#1A1A1A',
			roundingValue: 1,
			valueType: 'latest',
			prefix: '',
			suffix: ''
		},
		title: {
			show: true,
			textAlign: 'left',
			color: '#1A1A1A',
			fontSize: 16,
			bold: true,
			text: 'Title'
		},
		tooltip: {
			show: false,
			fontSize: 14,
			color: '#1A1A1A',
			backgroundColor: '#FFFFFF',
			offsetY: 0,
			borderWidth: 0,
			borderColor: '#E1E5E8',
			borderRadius: 2,
			backgroundOpacity: 100
		},
		area: { show: true, useGradient: true, opacity: 30, color: '#5f8bee' }
	}
}
</script>

<template>
	<VueUiSparkline :dataset="dataset" :config="config" @select-datapoint="selectDatapoint" />
</template>

<style scoped></style>
