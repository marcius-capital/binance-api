const restSchema = {
    trades: {
        qty: 'quantity',
    },
    aggTrades: {
        a: 'aggTradeId',
        p: 'price',
        q: 'quantity',
        f: 'firstTradeId',
        l: 'lastTradeId',
        T: 'time',
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
    createOrder: {
        origQty: 'quantity',
        orderId: 'id'
    },
    openOrders: {
        origQty: 'quantity',
        orderId: 'id'
    },
    allOrders: {
        origQty: 'quantity',
        orderId: 'id'
    },
}

const userStreamSchema = {
    outboundAccountInfo: {
        e: 'event',
        u: 'lastUpdateTime',
        E: 'eventTime',
        m: 'makerCommission',
        t: 'takerCommission',
        b: 'buyerCommission',
        s: 'sellerCommission',
        T: 'canTrade',
        W: 'canWithdraw',
        D: 'canDeposit',
        u: 'lastAccountUpdate',
        B: 'balances',
        'balances': {
            a: 'asset',
            f: 'free',
            l: 'locked',
        }
    },
    outboundAccountPosition: {
        e: 'event',
        E: 'eventTime',
        u: 'lastAccountUpdate',
        B: 'balances',
        'balances': {
            a: 'asset',
            f: 'free',
            l: 'locked',
        }
    },
    balanceUpdate: {
        e: 'event',
        E: 'eventTime',
        a: 'asset',
        b: 'balance',
        T: 'clearTime'
    },
    // Order update
    executionReport: {
        e: 'event',
        E: 'eventTime',
        s: 'symbol',
        c: 'clientOrderId',
        S: 'side',
        o: 'type',
        f: 'timeInForce',  // GTC 'Good till Cancel', IOC: 'Immediate or Cancel'
        q: 'quantity',
        p: 'price',
        P: 'stopPrice',
        F: 'icebergQuantity',
        g: 'orderListId',
        C: 'originalClientOrderId', // This is the ID of the order being canceled
        x: 'executionType',
        X: 'status',
        r: 'rejectReason',
        i: 'id',
        l: 'lastTradeQuantity',
        z: 'accumulatedQuantity',
        L: 'lastTradePrice',
        n: 'commission',
        N: 'commissionAsset',
        T: 'transactTime',
        t: 'tradeId',
        w: 'isOrderInBook',
        m: 'maker',
        O: 'orderCreationTime',
        Z: 'quoteAssetTransactedQuantity',             // Cumulative quote asset transacted quantity
        Y: 'lastQuoteAssetTransactedQuantity',         // Last quote asset transacted quantity (i.e. lastPrice * lastQty),
        Q: 'quoteOrderQty',                            // Quote Order Qty
    },
    listStatus: {
        e: 'event',
        E: 'eventTime',
        s: 'symbol',
        g: 'orderListId',
        c: 'contingencyType',
        l: 'listStatusType',
        L: 'listOrderStatus',
        r: 'listRejectReason',
        C: 'listClientOrderId',
        T: 'transactionTime',
        O: 'orders',
        'orders': {
            s: 'symbol',
            i: 'orderId',
            c: 'clientOrderId'
        }
    }
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
        T: 'time',
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
        T: 'time',
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

    },

    // User data Stream
    ...userStreamSchema
}

module.exports = {
    restSchema,
    streamSchema,
}
