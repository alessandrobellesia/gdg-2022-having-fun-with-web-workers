import pica from 'pica'

const loadImage = async (src) =>
	new Promise((resolve, reject) => {
		const img = new Image()
		img.onload = () => resolve(img)
		img.onerror = (...args) => reject(args)
		img.src = src
	})

const resizeImage = async (image, width, height) => {
	const resizer = new pica()
	const canvas = document.createElement('canvas')
	canvas.width = width
	canvas.height = height
	const result = await resizer.resize(image, canvas)
	return result.getContext('2d').getImageData(0, 0, width, height).data
}

const getImageData = (image) => {
	const canvas = document.createElement('canvas')
	canvas.width = image.width
	canvas.height = image.height
	const context = canvas.getContext('2d')
	context.drawImage(image, 0, 0)
	return context.getImageData(0, 0, image.width, image.height).data
}

const getWidthHeightFromMaxSize = (width, height, maxSize) => {
	if (width > height) {
		return {
			width: maxSize,
			height: Math.round(maxSize * (height / width)),
		}
	}
	return {
		width: Math.round(maxSize * (width / height)),
		height: maxSize,
	}
}

export { loadImage, getImageData, resizeImage, getWidthHeightFromMaxSize }
