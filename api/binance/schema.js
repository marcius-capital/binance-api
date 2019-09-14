const binanceRestSchema = {
	trades: {
		qty: 'quantity',
		time: 'timestamp',
		// maker: 'side'
	},
	aggTrades: {
		a: 'aggTradeId',
		p: 'price',
		q: 'quantity',
		f: 'firstTradeId',
		l: 'lastTradeId',
		T: 'timestamp',
		m: 'maker',
		M: 'bestPriceMatch'
	},
	ticker: {
		symbol: 'name'
	},
	ohlc: {
		0: 'time',
		1: 'open',
		2: 'high',
		3: 'low',
		4: 'close',
		5: 'volume',
		6: 'closeTime',
		7: 'quoteAssetVolume',
		8: 'trades',
		9: 'takerBaseAssetVolume',
		10: 'takerQuoteAssetVolume',
		11: 'ignored'
	},
	depth: {},
	openOrders: {
		symbol: 'name',
		origQty: 'quantity',
		time: 'timestamp',
	},
	allOrders: {
		symbol: 'name',
		origQty: 'size'
	},
	account: { //TODO nested key  balance: []

	}
}


const keyWSSchema = {
	kline: 'k',
}

const binanceWSSchema = {
	aggTrades: {
		E: 'eventTime',
		a: 'aggTradeId',
		p: 'price',
		q: 'quantity',
		f: 'firstTradeId',
		l: 'lastTradeId',
		T: 'timestamp',
		m: 'maker',
		M: 'bestPriceMatch'
	},
	trade: {
		E: 'eventTime',
		s: 'symbol',
		t: 'tradeId',
		p: 'price',
		q: 'quantity',
		b: 'buyerOrderId',
		a: 'sellerOrderId',
		T: 'timestamp',
		m: 'maker',
		M: 'bestPriceMatch'
	},
	klines: {
		0: 'openTime',
		1: 'open',
		2: 'high',
		3: 'low',
		4: 'close',
		5: 'volume',
		6: 'closeTime',
		7: 'quoteAssetVolume',
		8: 'trades',
		9: 'takerBaseAssetVolume',
		10: 'takerQuoteAssetVolume',
		11: 'ignored'
	},
	bids: [
		{
			0: 'price',
			1: 'quantity',
			2: 'ignored'
		}
	],
	asks: [
		{
			0: 'price',
			1: 'quantity',
			2: 'ignored'
		}
	],
	depthUpdate: {
		e: 'eventType',
		E: 'eventTime',
		s: 'symbol',
		U: 'firstUpdateId',
		u: 'lastUpdateId',
		b: 'bids',
		a: 'asks'
	},
	bidDepthDelta: [
		{
			0: 'price',
			1: 'quantity',
			2: 'ignored'
		}
	],
	askDepthDelta: [
		{
			0: 'price',
			1: 'quantity',
			2: 'ignored'
		}
	],
	klineEvent: {
		e: 'eventType',
		E: 'eventTime',
		s: 'symbol',
		k: 'kline'
	},
	kline: {
		t: 'startTime',
		T: 'endTime',
		s: 'symbol',
		i: 'interval',
		f: 'firstTradeId',
		L: 'lastTradeId',
		o: 'open',
		c: 'close',
		h: 'high',
		l: 'low',
		v: 'volume',
		n: 'trades',
		x: 'final',
		q: 'quoteVolume',
		V: 'volumeActive',
		Q: 'quoteVolumeActive',
		B: 'ignored'
	},
	aggTradeEvent: {
		e: 'eventType',
		E: 'eventTime',
		s: 'symbol',
		a: 'tradeId',
		p: 'price',
		q: 'quantity',
		f: 'firstTradeId',
		l: 'lastTradeId',
		T: 'time',
		m: 'maker',
		M: 'ignored'
	},
	outboundAccountInfoEvent: {
		e: 'eventType',
		E: 'eventTime',
		m: 'makerCommission',
		t: 'takerCommission',
		b: 'buyerCommission',
		s: 'sellerCommission',
		T: 'canTrade',
		W: 'canWithdraw',
		D: 'canDeposit',
		B: 'balances',
		u: 'lastUpdateTime'
	},
	balances: [
		{
			a: 'asset',
			f: 'availableBalance',
			l: 'onOrderBalance'
		}
	],
	executionReportEvent: {
		e: 'eventType',
		E: 'eventTime',
		s: 'symbol',
		c: 'newClientOrderId',
		S: 'side',
		o: 'orderType',
		f: 'cancelType', // GTC 'Good till Cancel', IOC: 'Immediate or Cancel'
		q: 'quantity',
		p: 'price',
		P: 'stopPrice',
		F: 'icebergQuantity',
		C: 'originalClientOrderId',
		x: 'executionType',
		X: 'orderStatus',
		r: 'rejectReason',
		i: 'orderId',
		l: 'lastTradeQuantity',
		z: 'accumulatedQuantity',
		L: 'lastTradePrice',
		n: 'commission',
		N: 'commissionAsset',
		m: 'maker',
		T: 'tradeTime',
		t: 'tradeId'
	},
	tradeEvent: {
		e: 'eventType',
		E: 'eventTime',
		s: 'symbol',
		t: 'tradeId',
		p: 'price',
		q: 'quantity',
		b: 'buyerOrderId',
		a: 'sellerOrderId',
		T: 'time',
		m: 'maker',
		M: 'ignored'
	},
	'24hrTicker': {
		e: 'eventType',
		E: 'eventTime',
		s: 'name',
		p: 'priceChange',
		P: 'priceChangePercent',
		w: 'weightedAveragePrice',
		x: 'previousClose',
		c: 'currentClose',
		Q: 'closeQuantity',
		b: 'bid',
		B: 'bestBidQuantity',
		a: 'bestAskPrice',
		A: 'ask',
		o: 'open',
		h: 'high',
		l: 'low',
		v: 'baseAssetVolume',
		q: 'quoteAssetVolume',
		O: 'openTime',
		C: 'closeTime',
		F: 'firstTradeId',
		L: 'lastTradeId',
		n: 'trades'
	},
	'24hrMiniTicker': {
		"e": 'eventType',  // Event type
		"E": 'eventTime',         // Event time
		"s": 'pair',          // Symbol
		"c": 'close',      // Close price
		"o": 'open',          // Open price
		"h": 'high',          // High price
		"l": 'low',          // Low price
		"v": "baseAssetVolume",           // Total traded base asset volume
		"q": 'quoteAssetVolume'             // Total traded quote asset volume
	}
}

module.exports = {
	binanceRestSchema,
	keyWSSchema,
	binanceWSSchema
}
