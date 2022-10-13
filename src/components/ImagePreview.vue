<script setup>
	import { ref, watch, nextTick } from 'vue'

	const canvas = ref(null)
	const wrapper = ref(null)

	const props = defineProps({
		src: {
			type: String,
			default: '',
		},
		pixels: {
			type: Object,
			default: undefined,
		},
		width: {
			type: Number,
			default: undefined,
		},
		height: {
			type: Number,
			default: undefined,
		},
		loading: {
			type: Boolean,
			default: false,
		},
	})

	watch(
		() => props.pixels,
		(newValue) => {
			nextTick(async () => {
				if (newValue) {
					canvas.value.width = props.width
					canvas.value.height = props.height
					const ctx = canvas.value.getContext('2d')
					const imageData = ctx.createImageData(
						props.width,
						props.height,
					)
					imageData.data.set(newValue)
					ctx.putImageData(imageData, 0, 0)
				}
			})
		},
	)
</script>

<template>
	<div ref="wrapper" class="image-preview">
		<img v-if="src" v-bind="{ src }" class="image-preview__item" />
		<canvas v-else-if="pixels" ref="canvas" class="image-preview__item" />
		<span v-if="loading" class="image-preview__loader"></span>
	</div>
</template>

<style lang="scss">
	.image-preview {
		position: relative;
		aspect-ratio: 1 / 1;
		border: 2px dashed #ccc;
		border-radius: 2rem;
		overflow: hidden;

		&__item {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}

		&__loader {
			width: 3rem;
			height: 3rem;
			border: 0.3rem solid #fff;
			border-bottom-color: transparent;
			border-radius: 50%;
			display: inline-block;
			box-sizing: border-box;
			animation: rotation 1s linear infinite;
			position: absolute;
			top: 50%;
			left: 50%;
			margin: -1.5rem 0 0 -1.5rem;

			@keyframes rotation {
				0% {
					transform: rotate(0deg);
				}
				100% {
					transform: rotate(360deg);
				}
			}
		}
	}
</style>
