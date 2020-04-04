# Binance API

This project will help you make your own app that interact with [Binance API](https://github.com/binance-exchange/binance-official-api-docs). Package includes REST and  STREAM (Websocket) for client and server. 

REST requests are caching (1h).

| Name                                                                                                                     | Description                                               |
| ------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------- |
| [rest-api.md](https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md)                     | Details on the Rest API (/api)                            |
| [web-socket-streams.md](https://github.com/binance-exchange/binance-official-api-docs/blob/master/web-socket-streams.md) | Details on available streams and payloads                 |
| [errors.md](https://github.com/binance-exchange/binance-official-api-docs/blob/master/errors.md)                         | Descriptions of possible error messages from the Rest API |

## Table of Contents

* [Introduction](#introduction)
* [Install](#install)
* [Rest](#rest)
* [Websocket](#websocket)

## Introduction

For ease to use, we renamed object keys.

``Server response`` => ``Rename keys with "schema.js"`` => ``Updated response``

### Schema snippet / [schema.js](/src/binance/schema.js#L7)

```javascript
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
```

### Updated response

```javascript
[
  {
    "aggTradeId": 26129,       
    "price": "0.01633102",     
    "quantity": "4.70443515",  
    "firstTradeId": 27781,      
    "lastTradeId": 27781,        
    "timestamp": 1498793709153,
    "maker": true,          
    "bestPriceMatch": true         
  }
  ...
]

```

If you need to update the keys, you can do this in [schema.js](/src/binance/schema.js)

## Install

### Package manager

```node
$ yarn add @marcius-capital/binance-api
$ npm install @marcius-capital/binance-api
```

###

```javascript
const api = require('@marcius-capital/binance-api')
// REST
api.rest.<REQUEST_NAME>({<OPTIONS>}).then(cb => console.log(cb))

// Stream
api.stream.<REQUEST_NAME>({<PARAMS>}, cb => console.log(cb))

api.stream.close.<REQUEST_NAME>({<PARAMS>}) // Close single connection
api.stream.close.all() // Close all connections

// Close with "uniqueID"
api.stream.<REQUEST_NAME>({<PARAMS>, uniqueID:<string_id>}, cb => console.log(cb))
api.stream.close.<REQUEST_NAME>({uniqueID:<string_id>})
```
``<PARAMS>`` valid from Official [Binance API](#binance-api). ``<REQUEST_NAME>`` You can find below in REST and WebSocket stack.

**uniqueID** - a unique key by which you can **_open_** and **_close_** the connection

## Rest

All symbols for rest are **uppercase**.

### List of REST requests

https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md

```javascript
const api = require('@marcius-capital/binance-api')

// Public requests
api.rest.exchangeInfo({})
api.rest.ticker({ symbol: 'BTCUSDT' })
api.rest.ticker({})
api.rest.ticker24hr({ symbol: 'BTCUSDT' }) // Single ticker
api.rest.ticker24hr({}).then(res => res.filter(i => parseFloat(i.volume) !== 0)) // All tickers
api.rest.klines({ 	symbol: 'BTCUSDT', interval: '1h', limit: 500})
api.rest.depth({ symbol: 'BTCUSDT' }),
api.rest.aggTrades({ symbol:'BTCUSDT' }),

	// Private requests
api.rest.account({ auth: {key: '<YOUR-KEY>', secret: '<YOUR-SECRET'} })
api.rest.account({ auth: {key: '<YOUR-KEY>', secret: '<YOUR-SECRET'} }).then(res => res.balances.filter(i=> parseFloat(i.free + i.locked) > 0)) // Balance
api.rest.allOrders({ params: { symbol: 'BTCUSDT' }, auth: {key: '<YOUR-KEY>', secret: '<YOUR-SECRET'} })
api.rest.createOrder({ params: {symbol: 'BTCUSDT', side: 'SELL', price: '8000', quantity: '0.01' }, auth: {key: '<YOUR-KEY>', secret: '<YOUR-SECRET'} })

```

## Websocket

https://github.com/binance-exchange/binance-official-api-docs/blob/master/web-socket-streams.md

### List of STREAM requests

All symbols for streams can be **lowercase** or **uppercase**.

```javascript
const api = require('@marcius-capital/binance-api')


api.stream.depth({ symbol: 'btcusdt', updateSpeed = 1000 }, cb  =>  console.log(cb)) // updateSpeed: 1000ms default, can be 100 (100ms)
api.stream.depthLevel({ symbol: 'btcusdt', level: 100, updateSpeed = 1000 }, cb  =>  console.log(cb)) // level: 100 default, updateSpeed: 1000ms default, can be 100 (100ms)
api.stream.kline({ symbol: 'btcusdt', interval = '1h' }, cb  =>  console.log(cb))
api.stream.aggTrade('btcusdt', cb => console.log(cb))
api.stream.trade('btcusdt', cb => console.log(cb))
api.stream.ticker('btcusdt', cb => console.log(cb))
api.stream.tickers({}, cb => console.log(cb))
api.stream.miniTicker('btcusdt', cb => console.log(cb))
api.stream.miniTickers({}, cb => console.log(cb))

// Add new
api.stream.bookTicker('btcusdt', cb => console.log(cb))  // Update Speed: Real-time
api.stream.bookTicker({}, cb => console.log(cb))  // Update Speed: Real-time

```

### Close connection(s)

```javascript
// Close connections
api.stream.close.all()

// Close connection
api.stream.close.kline({symbol: 'btcusdt', interval = '1h'}) // Params for close stream are used similar for open stream

// Close with uniqueID
api.stream.close.kline({symbol: 'btcusdt', interval = '1h', uniqueID: 'my_awesome_id'}) 
api.stream.close.kline({ uniqueID: 'my_awesome_id'}) 
```

Close connection have similar params for closing. Difference: `api.stream.kline(<params>, cb)` => `api.stream.close.kline(<params>, cb)`. 


## Stay In Touch

Feel free to ask questions

* Discord: https://discordapp.com/invite/DaWfrPx
* Telegram channel: https://t.me/joinchat/G5DV0xUO-pvjEmoWc7dBUg


## License
[MIT](http://opensource.org/licenses/MIT) | Copyright (c) 2019-present
