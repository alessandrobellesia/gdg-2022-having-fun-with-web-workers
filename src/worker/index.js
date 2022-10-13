import Worker from './worker?worker'
import * as Comlink from 'comlink'

const { blurhashEncode, blurhashDecode } = Comlink.wrap(new Worker())

export { blurhashEncode, blurhashDecode }
