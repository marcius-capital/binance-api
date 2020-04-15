# Binance API

This project will help you make your own app that interact with [Binance API](https://github.com/binance-exchange/binance-official-api-docs). Package includes REST and  STREAM (Websocket) for client and server. 

REST requests are caching (60m).

| Name  | Description  |
| ------------- | ------------- |
| [rest-api.md](https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md) | Details on the Rest API  |
|[web-socket-streams](https://github.com/binance-exchange/binance-official-api-docs/blob/master/web-socket-streams.md) | Details on available streams and payloads  |
| [user-data-stream](https://github.com/binance-exchange/binance-official-api-docs/blob/master/user-data-stream.md) | Details on the dedicated account stream  |
| [errors](https://github.com/binance-exchange/binance-official-api-docs/blob/master/errors.md) | Descriptions of possible error messages from the Rest API  |

## Menu

- [Binance API](#binance-api)
  - [Menu](#menu)
  - [Introduction](#introduction)
    - [Schema snippet / schema.js](#schema-snippet--schemajs)
    - [Updated response](#updated-response)
  - [Install](#install)
    - [Package manager](#package-manager)
  - [Rest](#rest)
    - [List of REST requests](#list-of-rest-requests)
  - [Websocket](#websocket)
    - [List of STREAM requests](#list-of-stream-requests)
    - [Close connection](#close-connection)
    - [User data stream](#user-data-stream)
  - [Error](#error)
  - [Full list requests](#full-list-requests)
  - [TODO](#todo)
  - [Stay in touch](#stay-in-touch)
  - [License](#license)

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

**uniqueID** - a unique key by which you can **_open_** and **_close_** the connection. With different IDs you can open different connections in same time. To control connections, repeated are prohibited.

## Rest

All symbols for rest are **uppercase**.

### List of REST requests

https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md

```javascript
const api = require('@marcius-capital/binance-api')

// Public requests
api.rest.exchangeInfo({}).then(res=> console.log(res))
api.rest.ticker({ symbol: 'BTCUSDT' }).then(res=> console.log(res))
api.rest.ticker({}).then(res=> console.log(res))
api.rest.ticker24hr({ symbol: 'BTCUSDT' }).then(res=> console.log(res)) // Single ticker
api.rest.ticker24hr({}).then(res => res.filter(i => parseFloat(i.volume) !== 0)) // All tickers
api.rest.klines({ symbol: 'BTCUSDT', interval: '1h', limit: 500 }).then(res=> console.log(res))
api.rest.depth({ symbol: 'BTCUSDT' }).then(res=> console.log(res))
api.rest.trades({ symbol: 'BTCUSDT', limit: 20 }).then(res=> console.log(res))
api.rest.aggTrades({ symbol:'BTCUSDT' }).then(res=> console.log(res))

// Private requests
api.rest.account({ auth: {key: '<YOUR-KEY>', secret: '<YOUR-SECRET>'} }).then(res=> console.log(res))
api.rest.account({ auth: {key: '<YOUR-KEY>', secret: '<YOUR-SECRET>'} }).then(res => res.balances.filter(i=> parseFloat(i.free + i.locked) > 0)) // Balance
api.rest.allOrders({ params: { symbol: 'BTCUSDT' }, auth: {key: '<YOUR-KEY>', secret: '<YOUR-SECRET>'} }).then(res=> console.log(res))
api.rest.openOrders({ params: { symbol: 'BTCUSDT' }, auth: {key: '<YOUR-KEY>', secret: '<YOUR-SECRET>'} }).then(res => console.log(res))
api.rest.createOrder({ params: {symbol: 'BTCUSDT', side: 'SELL', price: '8000', quantity: '0.01' }, auth: {key: '<YOUR-KEY>', secret: '<YOUR-SECRET>'} }).then(res=> console.log(res))
api.rest.myTrades({ params: { symbol: 'BTCUSDT' }, auth }).then(res=> console.log(res))

```

## Websocket

https://github.com/binance-exchange/binance-official-api-docs/blob/master/web-socket-streams.md

### List of STREAM requests

All symbols for streams can be **lowercase** or **uppercase**.

```javascript
const api = require('@marcius-capital/binance-api')


api.stream.depth({ symbol: 'btcusdt', updateSpeed: 1000 }, cb  =>  console.log(cb)) // updateSpeed: 1000ms default, can be 100 (100ms)
api.stream.depthLevel({ symbol: 'btcusdt', level: 100, updateSpeed: 1000 }, cb  =>  console.log(cb)) // level: 100 default, updateSpeed: 1000ms default, can be 100 (100ms)
api.stream.kline({ symbol: 'btcusdt', interval: '1h' }, cb  =>  console.log(cb))
api.stream.aggTrade('btcusdt', cb => console.log(cb))
api.stream.trade('btcusdt', cb => console.log(cb))
api.stream.ticker('btcusdt', cb => console.log(cb))
api.stream.tickers({}, cb => console.log(cb))
api.stream.miniTicker('btcusdt', cb => console.log(cb))
api.stream.miniTickers({}, cb => console.log(cb))

// Add new
// Attention! Much data.
api.stream.bookTicker('btcusdt', cb => console.log(cb))  // Update Speed: Real-time
api.stream.bookTickers({}, cb => console.log(cb))  // Update Speed: Real-time

```

### Close connection

```javascript
// Close connections
api.stream.close.all()

// Close connection
api.stream.close.kline({symbol: 'btcusdt', interval: '1h'}) // Params for close stream are used similar for open stream

// Close with uniqueID
api.stream.close.kline({symbol: 'btcusdt', interval: '1h', uniqueID: 'my_awesome_id'}) 
api.stream.close.kline({ uniqueID: 'my_awesome_id'}) 
```

Close connection have similar params for closing. Difference: `api.stream.kline(<params>, cb)` => `api.stream.close.kline(<params>, cb)`. 

### User data stream

https://github.com/binance-exchange/binance-official-api-docs/blob/master/user-data-stream.md

Upon changes in the account, returns data about balance, orders etc.

> Start a new user data stream. The stream will close after 60 minutes unless a keepalive is sent. If the account has an active listenKey, that listenKey will be returned and its validity will be extended for 60 minutes. (c) Binance

Stream alive 24 hours. Every 30 minutes, package automatically sends a request to keep alive `listenKey`

**User data has been partially tested. Use carefully. If you have problems, open issue.**

```javascript
// Simple open and close "user data stream"
// this is enough if you have a connection for one user
api.stream.userData({ auth: {key: '<YOUR-KEY>', secret: '<YOUR-SECRET>'} }, cb => console.log(cb))
api.stream.close.userData()

// For comfort you can add "uniqueID"
api.stream.userData({ auth: {key: '<YOUR-KEY>', secret: '<YOUR-SECRET>'}, uniqueID: 'my_awesome_id' }, cb => console.log(cb))
api.stream.close.userData({ uniqueID: 'my_awesome_id'})
```

## Error

https://github.com/binance-exchange/binance-official-api-docs/blob/master/errors.md

The error response is returned in JSON format with a lot of information, we minimized the response to simplify understanding.  Will responce string format: `'-1003 TOO_MANY_REQUESTS'` (as example) instead JSON. 

```javascript
console.err(api.error(err)) // Using example

// Example
api.rest.ticker({ <PARAMS> })
    .then(res => console.log(res))
    .catch(err => console.err(api.error(err))) // api.error(<ERR_RESPONSE>)
```

## Full list requests

Full list of requests in [test.js](/test.js). For testing local, uncomment request and run node:

```node
$ node test.js
```

## TODO

* ~~Spot~~
* ~~Websocket spot~~
* ~~Websocket spot - "User Data Stream"~~
* Futures with testnet

## Stay in touch

Feel free to ask questions 😊

* Reddit: https://reddit.com/r/MarciusCapital
* Discord: https://discordapp.com/invite/DaWfrPx

## License
[MIT](http://opensource.org/licenses/MIT) | Copyright (c) 2019-present