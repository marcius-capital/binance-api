# Binance API
This project will help you make your own app that interact with [Binance API](https://github.com/binance-exchange/binance-official-api-docs). Module includes REST and Websocket.

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
npm install @marcius-capital/binance-api // yarn add @marcius-capital/binance-api
```

### 

```javascript
import api from '@marcius-capital/binance-api'

api.rest.<REQUEST_NAME>({<OPTIONS>}).then(cb => console.log(cb))
api.stream.<REQUEST_NAME>({<OPTIONS>}, cb => console.log(cb))
```
``<OPTIONS>`` valid from Official [Binance API](#binance-api). ``<REQUEST_NAME>`` You can find below in REST and WS stack.




## Rest

List of [REST request names](/api/binance/rest.js#L16)

### Public

```javascript
// https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md#24hr-ticker-price-change-statistics

api.rest.ticker24hr({}).then(cb => console.log(cb)) // All tickers
api.rest.ticker24hr({symbol: 'btcusdt'.toUpperCase()}).then(cb => console.log(cb)) // Single ticker

{
  symbol: 'BTCUSDT',
  priceChange: '2.28000000',
  priceChangePercent: '0.022',
  weightedAvgPrice: '10278.47517504',
  prevClosePrice: '10283.43000000',
  lastPrice: '10285.25000000',
  lastQty: '0.13350400',
  bidPrice: '10284.01000000',
  bidQty: '0.01445000',
  askPrice: '10285.69000000',
  askQty: '0.02137700',
  openPrice: '10282.97000000',
  highPrice: '10369.23000000',
  lowPrice: '10153.00000000',
  volume: '26624.06609700',
  quoteVolume: '273654802.43665967',
  openTime: 1568354653503,
  closeTime: 1568441053503,
  firstId: 178718201,
  lastId: 179000107,
  count: 281907
}

// https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md#klinecandlestick-data
api.rest.ohlc({symbol: 'btcusdt'.toUpperCase(), interval: '1h',	limit: 500}).then(cb => console.log(cb))

[
  {
    time: 1567000800000,
    open: '10169.03000000',
    high: '10233.70000000',
    low: '10158.00000000',
    close: '10203.10000000',
    volume: '1416.59470900',
    closeTime: 1567004399999,
    quoteAssetVolume: '14430112.00064011',
    trades: 10995,
    takerBaseAssetVolume: '855.05278800',
    takerQuoteAssetVolume: '8711736.69011630',
    ignored: '0'
  },
  ... 400 more items
]

```

### Private

```javascript
// https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md#account-information-user_data
api.rest.account({auth: {key: '<YOUR-KEY>', secret: '<YOUR-SECRET'}}).then(cb => console.log(cb))

//Need to specify "auth" and "params" for each request
// https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md#new-order--trade
api.rest.createOrder({auth: {key: '<YOUR-KEY>', secret: '<YOUR-SECRET'}, params: {symbol: 'BTCUSDT', side: 'SELL', price: '8000', quantity: '0.01' }}).then(cb => console.log(cb)).catch(cb => console.log(cb))
```

## Websocket

List of [WS request names](/api/binance/ws.js#L24)

```javascript
// https://github.com/binance-exchange/binance-official-api-docs/blob/master/web-socket-streams.md#trade-streams
api.stream.trade('btcusdt', cb => console.log(cb))

{
  e: 'trade',
  eventTime: 1568440855470,
  symbol: 'BTCUSDT',
  tradeId: 178999693,
  price: '10287.02000000',
  quantity: '0.10715200',
  buyerOrderId: 640336083,
  sellerOrderId: 640336084,
  timestamp: 1568440855465,
  maker: true,
  bestPriceMatch: true
}
```

### Terminate connections

```javascript
// Will terminate all connections
api.stream.terminate()
```

## Stay In Touch
You can ask questions in our Telegram channel: [https://t.me/joinchat/G5DV0xUO-pvjEmoWc7dBUg](https://t.me/joinchat/G5DV0xUO-pvjEmoWc7dBUg)


## License
[MIT](http://opensource.org/licenses/MIT) | Copyright (c) 2019-present
