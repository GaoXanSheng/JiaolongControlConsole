<script setup lang="ts">
import BackgroundVideo from '../../assets/loading_yiliya.mp4'
</script>

<template>
	<div class="home">
		<a-row justify="center">
			<a-col :span="16" style="margin-top: 16px">
				<div class="title">
					<video :src="BackgroundVideo" muted loop autoplay></video>
				</div>
			</a-col>
			<a-col :span="16">
				<div class="mainDescription">
					<a-typography>
						<a-typography-title :heading="2">蛟龙16PRO工具箱</a-typography-title>
						<a-typography-title :heading="5"
							>该工具箱针对7945HX+4060版本进行开发，不保证其他版本可用，风险自负</a-typography-title
						>
						<a-typography-paragraph blockquote>
							<a-typography-text>
								Thaumaturgy... which giveth certain order to make strange works, of the sense to be
								perceived and of men greatly to be wondered at.MathematicallPraeface.
							</a-typography-text>
							<br />
							<a-typography-text bold> John Dee(1570) ——《Euclid's Elements》 </a-typography-text>
						</a-typography-paragraph>
					</a-typography>
				</div>
			</a-col>
		</a-row>
	</div>
</template>

<style scoped>
.mainDescription {
	text-align: left;
}
.title {
	width: 600px;
	height: 300px;
	box-shadow: 0 0 1px rgba(0, 0, 0, 0.3);
	video {
		width: 600px;
		height: 300px;
		object-fit: cover;
		border-radius: 5px;
	}
}
</style>
