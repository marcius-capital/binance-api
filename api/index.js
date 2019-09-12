import binanceRest from './binance/rest'
import binanceWS from './binance/ws'

export default {
	rest: binanceRest,
	stream: binanceWS,
}
