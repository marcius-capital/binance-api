// Open one stream for getting updates user account
// https://github.com/binance-exchange/binance-official-api-docs/blob/master/user-data-stream.md

const axios = require('axios')

const proxyWrapper = require('./modules/proxy')

const setupWebSocket = require('./modules/websocket')
const { closeSocket } = require('./modules/helpers')

const url = 'https://api.binance.com/api/'

let listenKey = null
let keepAliveInterval = null

// Private REST request
// https://github.com/binance-exchange/binance-official-api-docs/blob/master/user-data-stream.md#create-a-listenkey
const schema = {
    createListenKey: {
        url: 'v3/userDataStream',
        method: 'post',
    },
    // User data streams will close after 60 minutes. It's recommended to send a ping about every 30 minutes.
    keepAliveListenKey: {
        url: 'v3/userDataStream',
        method: 'put',
    },
    deleteListenKey: {
        url: 'v3/userDataStream',
        method: 'delete',
    }
}

// result: { "listenKey": "pqia91ma19a5s61cv6a81va65sdf12v8a64a1a5s61cv6a81va45sdf19v8a65a1" }
const createListenKey = (data, { auth = {}, proxy }) => {
    return axios({
        method: data.method,
        url: proxyWrapper(url + data.url, proxy),
        headers: { 'X-MBX-APIKEY': auth.key },
    }).then(res => res.data)
        .catch(err => console.error(err))
}

const request = (data, { auth = {}, params = {}, proxy }) => {
    return axios({
        method: data.method,
        url: proxyWrapper(url + data.url, proxy),
        headers: { 'X-MBX-APIKEY': auth.key },
        params,
    }).then(res => res.data)
        .catch(err => console.error(err))
}

const api = Object.keys(schema).reduce((result, item) => {
    result[item] = (payload) => (item == 'createListenKey') ? createListenKey(schema[item], payload) : request(schema[item], payload)
    return result
}, {})


// Will send PUT request with listenKey every 30m
const keepAlive = ({ auth, params }) => {
    if (keepAliveInterval) {
        clearInterval(keepAliveInterval)
        keepAliveInterval = null
    }
    keepAliveInterval = setInterval(() => {
        api.keepAliveListenKey({ auth, params })
            .then(res => console.log('[stream] user data keep-alive', res))
            .catch(err => console.error(err))
    }, 30 * 60 * 1000) // 30 min update
}

/**
 * WebScoket
 */

const userData = ({ auth, uniqueID, proxy }, callback) => {
    api.createListenKey({ auth, proxy })
        .then(res => {
            listenKey = res.listenKey
            setupWebSocket({ path: res.listenKey, uniqueID }, cb => callback(cb))
            keepAlive({ auth, params: res })
        })
}

const closeUserData = ({ uniqueID }) => {
    if (keepAliveInterval) {
        clearInterval(keepAliveInterval)
        keepAliveInterval = null
    }
    return (uniqueID) ? closeSocket(uniqueID) : closeSocket(listenKey)
}


module.exports = {
    userData,
    closeUserData
}