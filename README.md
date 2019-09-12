[![NPM](https://nodei.co/npm/@marcius-capital/binance-api.png?downloadRank=true?stars=true)](https://nodei.co/npm/@marcius-capital/binance-api/)

# Binance API
Binance API is an asynchronous node.js library for the Binance API designed to be easy to use. 

Official [Binance api](https://github.com/binance-exchange/binance-official-api-docs).

Name | Description
------------ | ------------
[rest-api.md](https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md) | Details on the Rest API (/api)
[errors.md](https://github.com/binance-exchange/binance-official-api-docs/blob/master/errors.md) | Descriptions of possible error messages from the Rest API
[web-socket-streams.md](https://github.com/binance-exchange/binance-official-api-docs/blob/master/web-socket-streams.md) | Details on available streams and payloads

## Table of Contents

* [Introduction](#introduction)
* [Install](#install)
* [Rest](#rest)
* [Websocket](#websocket)

## Introduction

For ease to use, we renamed object keys.

``Server response`` => ``Rename keys with "schema.js"`` => ``Updated response``


### Response

```javascript
// https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md#compressedaggregate-trades-list
[
  {
    "a": 26129,         // Aggregate tradeId
    "p": "0.01633102",  // Price
    "q": "4.70443515",  // Quantity
    "f": 27781,         // First tradeId
    "l": 27781,         // Last tradeId
    "T": 1498793709153, // Timestamp
    "m": true,          // Was the buyer the maker?
    "M": true           // Was the trade the best price match?
  }
]
```

### Schema snippet / [schema.js](/api/binance/schema.js#L7)

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

If you need to update the keys, you can do this in [schema.js](/api/binance/schema.js)

## Install

### Package manager

```node

yarn add @marcius-capital/binance-api

npm install @marcius-capital/binance-api
```

### 

```javascript
import api from '@marcius-capital/binance-api'
```

## Rest

List of [REST requests](/api/binance/rest.js#L16)

### Public

```javascript
// https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md#24hr-ticker-price-change-statistics
api.rest.ticker({symbol: 'btcusdt'.toUpperCase()}).then(cb => console.log(cb)) // Single ticker
api.rest.ticker({}).then(cb => console.log(cb)) // All tickers

// https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md#klinecandlestick-data
api.rest.ohlc({symbol: 'btcusdt'.toUpperCase(), interval: '1h',	limit: 500}).then(cb => console.log(cb))
```

### Private

```javascript
// https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md#account-information-user_data
api.rest.account({auth: {key: '<YOUR-KEY>', secret: '<YOUR-SECRET'}}).then(cb => console.log(cb))
```

## Websocket

List of [WS requests](/api/binance/ws.js#L18)

```javascript
// https://github.com/binance-exchange/binance-official-api-docs/blob/master/web-socket-streams.md#trade-streams
api.stream.trade('btcusdt', cb => console.log(cb))
```

### Terminate connections

```javascript
api.stream.terminate()
```

## Stay In Touch
You can ask questions in our Telegram channel: [https://t.me/joinchat/G5DV0xUO-pvjEmoWc7dBUg](https://t.me/joinchat/G5DV0xUO-pvjEmoWc7dBUg)


## License
[MIT](http://opensource.org/licenses/MIT) | Copyright (c) 2019-present
