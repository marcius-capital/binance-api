const crypto = require('crypto')
const qs = require('querystring')
const axios = require('axios')
const { setupCache } = require('axios-cache-adapter')

const proxyWrapper = require('./modules/proxy')

// Create `axios-cache-adapter` instance
const cache = setupCache({
    maxAge: 60 * 60 * 1000, // 60 min
    exclude: { query: false }
})

// Create `axios` instance passing the newly created `cache.adapter`
const axiosWithCache = axios.create({
    adapter: cache.adapter
})

const renameKeys = require('../renameKeys')
const { restSchema } = require("./modules/schema")

/**
* https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md
*	Example: api.rest.time().then(data => console.log(data))
*	Example: api.rest.depth({symbol: 'ETHBTC', limit: 100}).then(data => console.log(data))
 */

const url = 'https://api.binance.com/api/'

const schema = {
    test: {
        url: 'v3/ping',
    },
    exchangeInfo: {
        url: 'v3/exchangeInfo',
    },
    time: {
        url: 'v3/time',
    },
    depth: {
        url: 'v3/depth',
    },
    klines: {
        url: 'v3/klines',
    },
    trades: {
        url: 'v3/trades',
    },
    avgPrice: {
        url: 'v3/avgPrice'
    },
    aggTrades: {
        url: 'v3/aggTrades'
    },
    ticker24hr: {
        url: 'v3/ticker/24hr',
    },
    ticker: {
        url: 'v3/ticker/price',
    },
    account: {
        url: 'v3/account',
        method: 'get',
        private: true
    },
    openOrders: {
        url: 'v3/openOrders',
        method: 'get',
        private: true
    },
    allOrders: {
        url: 'v3/allOrders',
        method: 'get',
        private: true
    },
    createOrder: {
        url: 'v3/order',
        method: 'post',
        private: true,
        params: {
            timeInForce: 'GTC',
        }
    },
    deleteOrder: {
        url: 'v3/order',
        method: 'delete',
        private: true
    },
    myTrades: {
        url: 'v3/myTrades',
        method: 'get',
        private: true
    },
    createTestOrder: {
        url: 'v3/order/test',
        method: 'post',
        private: true,
        params: {
            timeInForce: 'GTC',
            type: 'LIMIT'
        }
    },
}

const rename = (data, event) => renameKeys(restSchema[event], data)

const requestPrivateAPI = ({ params: defaultParams = {}, ...data }, { auth = {}, params = {}, proxy }, event) => {
    const timestamp = Date.now()

    const queryString = qs.stringify(Object.assign(params, defaultParams, { timestamp }))
    const signature = crypto.createHmac('sha256', auth.secret)
        .update(queryString)
        .digest('hex')

    const options = {
        method: data.method,
        url: proxyWrapper(url + data.url, proxy),
        headers: { 'X-MBX-APIKEY': auth.key },
        params: Object.assign(params, data.params, { signature }, { timestamp }),
    }

    return axiosWithCache(options).then(res => rename(res.data, event))
}

const requestPublicAPI = (data, { proxy, ...params }, event) => {
    return axiosWithCache.get(proxyWrapper(url + data.url, proxy), { params }).then(res => rename(res.data, event))
}

const api = Object.keys(schema).reduce((result, item) => {
    result[item] = (payload) => (schema[item].private) ? requestPrivateAPI(schema[item], payload, item) : requestPublicAPI(schema[item], payload, item)
    return result
}, {})

module.exports = {
    ...api
}
