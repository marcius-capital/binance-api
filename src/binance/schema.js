const restSchema = {
    trades: {
        qty: 'quantity',
        time: 'timestamp',
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
    depth: {
        bids: {
            0: 'price',
            1: 'quantity',
        },
        asks: {
            0: 'price',
            1: 'quantity',
        }
    },
    openOrders: {
        origQty: 'quantity',
        time: 'timestamp',
        orderId: 'id'
    },
    allOrders: {
        origQty: 'quantity',
        orderId: 'id'
    },
}


const streamSchema = {
    aggTrade: {
        e: 'event',
        s: 'symbol',
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
        e: 'event',
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
    depthUpdate: {
        e: 'event',
        E: 'eventTime',
        s: 'symbol',
        U: 'firstUpdateId',
        u: 'lastUpdateId',
        b: 'bids',
        a: 'asks',
        bids: {
            0: 'price',
            1: 'quantity',
        },
        asks: {
            0: 'price',
            1: 'quantity',
        }
    },
    kline: {
        e: 'event',
        E: 'eventTime',
        s: 'symbol',
        k: 'kline',
        kline: {
            t: 'openTime',
            T: 'closeTime',
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
    },
    aggTradeEvent: {
        e: 'event',
        E: 'eventTime',
        s: 'symbol',
        a: 'tradeId',
        p: 'price',
        q: 'quantity',
        f: 'firstTradeId',
        l: 'lastTradeId',
        T: 'timestamp',
        m: 'maker',
        M: 'ignored'
    },
    outboundAccountInfoEvent: {
        e: 'event',
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
    executionReportEvent: {
        e: 'event',
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
        e: 'event',
        E: 'eventTime',
        s: 'symbol',
        t: 'tradeId',
        p: 'price',
        q: 'quantity',
        b: 'buyerOrderId',
        a: 'sellerOrderId',
        T: 'timestamp',
        m: 'maker',
        M: 'ignored'
    },
    '24hrTicker': {
        e: 'event',
        E: 'eventTime',
        s: 'symbol',
        p: 'priceChange',
        P: 'priceChangePercent',
        w: 'weightedAveragePrice',
        x: 'previousClose',
        c: 'lastPrice',
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
        e: 'event',  // Event type
        E: 'eventTime',         // Event time
        s: 'symbol',          // Symbol
        c: 'close',      // Close price
        o: 'open',          // Open price
        h: 'high',          // High price
        l: 'low',          // Low price
        v: "baseAssetVolume",           // Total traded base asset volume
        q: 'quoteAssetVolume'             // Total traded quote asset volume
    },
    bookTicker: {
        u: 'updateId',
        s: 'symbol',
        b: 'bestBidPrice',
        B: 'bestBidQuantity',
        a: 'bestAskPrice',
        A: 'bestAskQuantity',

    }
}

module.exports = {
    restSchema,
    streamSchema
}
