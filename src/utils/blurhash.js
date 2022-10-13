import { encode, decode } from 'blurhash'

const blurhashEncode = (imageData, width, height) => {
	return encode(imageData, width, height, 4, 4)
}

const blurhashDecode = (hash, width, height) => {
	return decode(hash, width, height)
}

export { blurhashEncode, blurhashDecode }
