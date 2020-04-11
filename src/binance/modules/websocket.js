const NodeWebSocket = require('ws')
const WS = typeof window !== 'undefined' ? WebSocket : NodeWebSocket // Crossplatform Client and Server

const { updateSockets } = require('./helpers')

const url = 'wss://stream.binance.com:9443/ws/'

// Rename options
const renameKeys = require("../../renameKeys")
const { streamSchema } = require('./schema')
const rename = (data) => {
    const event = (data.e || data[0] && typeof data[0].e != 'undefined') ? (data.e || data[0].e) : 'bookTicker'
    return renameKeys(streamSchema[event], data)
}

const setupWebSocket = ({ path, uniqueID = false }, callback) => {

    const stream = new WS(url + path)

    // Event stream
    stream.onopen = () => console.log('[socket] Connected to exchange')
    stream.onclose = () => console.log('[socket] Connected closed')
    stream.onmessage = (message) => callback(rename(JSON.parse(message.data)))
    stream.onerror = (err) => console.error(err)

    updateSockets({ path, uniqueID }, stream) // Need to control open streams

    return stream
}

module.exports = setupWebSocket