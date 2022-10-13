import * as Comlink from 'comlink'
import { blurhashEncode, blurhashDecode } from '../utils/blurhash'

Comlink.expose({
	blurhashEncode,
	blurhashDecode,
})
