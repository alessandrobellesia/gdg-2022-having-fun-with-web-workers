<script setup>
	import { ref, nextTick } from 'vue'
	import ImagePreview from '../components/ImagePreview.vue'
	import {
		loadImage,
		resizeImage,
		getImageData,
		getWidthHeightFromMaxSize,
	} from '../utils/image'
	import { blurhashEncode, blurhashDecode } from '../utils/blurhash'
	import {
		blurhashEncode as blurhashEncodeWorker,
		blurhashDecode as blurhashDecodeWorker,
	} from '../worker'

	const form = ref()
	const src = ref('')
	const hash = ref('')
	const pixels = ref()
	const width = ref()
	const height = ref()
	const loading = ref(false)
	const workerEnabled = ref(false)
	const optimizationEnabled = ref(false)
	const time = ref('')

	let startTimestamp = undefined

	const encode = (...params) => {
		if (workerEnabled.value) {
			return blurhashEncodeWorker(...params)
		}
		return Promise.resolve(blurhashEncode(...params))
	}

	const decode = (...params) => {
		if (workerEnabled.value) {
			return blurhashDecodeWorker(...params)
		}
		return Promise.resolve(blurhashDecode(...params))
	}

	const onClickReset = (event) => {
		// revoke old URL
		if (src.value) {
			URL.revokeObjectURL(src.value)
		}
		src.value = ''
		hash.value = ''
		pixels.value = undefined
		width.value = undefined
		height.value = undefined
		loading.value = false
		time.value = ''
		if (event) {
			form.value.reset()
		}
	}

	const onChange = async (event) => {
		const file = event.target.files[0]

		// reset
		onClickReset()

		// set new URL
		src.value = URL.createObjectURL(file)

		// start loader
		loading.value = true
		startTimestamp = performance.now()

		nextTick(async () => {
			// load image
			const image = await loadImage(src.value)

			let imageData

			// set width and height
			if (!optimizationEnabled.value) {
				width.value = image.width
				height.value = image.height
				imageData = getImageData(image)
			} else {
				// get new width and height
				const { width: newWidth, height: newHeight } =
					getWidthHeightFromMaxSize(image.width, image.height, 32)
				width.value = newWidth
				height.value = newHeight

				// resize image
				imageData = await resizeImage(image, newWidth, newHeight)
			}

			// encode and decode
			hash.value = await encode(imageData, width.value, height.value)
			pixels.value = await decode(hash.value, width.value, height.value)

			time.value = ((performance.now() - startTimestamp) / 1000).toFixed(
				2,
			)

			// stop loader
			loading.value = false
		})
	}
</script>

<template>
	<form ref="form">
		<input
			type="file"
			name="file"
			accept=".jpeg,.jpg,.png,image/jpeg,image/png"
			:disabled="loading"
			@change="onChange" />
		<button
			type="reset"
			class="secondary outline"
			:disabled="!src || loading"
			@click.stop="onClickReset">
			Clear
		</button>
	</form>
	<Transition name="zoom">
		<div v-if="src">
			<div class="wrapper">
				<ImagePreview v-bind="{ src }" class="wrapper__item" />
				<ImagePreview
					v-bind="{ pixels, width, height, loading }"
					class="wrapper__item" />
			</div>
			<code>{{ hash }}</code>
		</div>
	</Transition>
	<fieldset>
		<label for="switch">
			<input
				id="workerEnabled"
				v-model="workerEnabled"
				:disabled="loading"
				type="checkbox"
				name="workerEnabled"
				role="switch" />
			Web Worker
		</label>
		<label for="switch">
			<input
				id="optimizationEnabled"
				v-model="optimizationEnabled"
				:disabled="loading"
				type="checkbox"
				name="optimizationEnabled"
				role="switch" />
			Optimize
		</label>
	</fieldset>
	<div class="time">
		<span class="time__value">{{ time }}</span>
		<template v-if="time">s</template>
	</div>
</template>

<style lang="scss">
	.wrapper {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		margin-block: 2rem;
		align-items: center;

		&__item {
			flex: 1;
			width: 300px;
		}
	}

	input[type='file'] {
		height: auto;
		background-color: var(--code-background-color);
		padding: 0;
		border-radius: var(--border-radius);
		margin: 0;
	}

	code {
		display: block;
		margin-block: 1rem;
		min-height: 1.6rem;
	}

	form {
		display: flex;
		align-items: center;
		gap: 1rem;

		button {
			width: auto;
			margin-bottom: 0;
			padding: 0.35rem 1rem;
		}
	}

	fieldset {
		display: inline-flex;
		align-items: flex-start;
		margin: 0 auto;
		gap: 1rem;
	}

	.time {
		min-height: 3rem;
		font-size: 1.5rem;

		&__value {
			font-size: 2rem;
			font-weight: bold;
		}
	}

	.zoom-enter-active {
		animation: zoom 0.5s;
	}
	.zoom-leave-active {
		animation: zoom 0.5s reverse;
	}

	@keyframes zoom {
		from {
			opacity: 0;
			transform: scale3d(0.3, 0.3, 0.3);
		}

		50% {
			opacity: 1;
		}
	}
</style>
