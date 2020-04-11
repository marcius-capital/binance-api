const rest = require('./binance/rest')
const stream = require('./binance/stream')

module.exports = {
    rest,
    stream,
    error: err => {
        if (typeof err.response.data != 'undefined') {
            return `${err.response.data.code}: ${err.response.data.msg}`
        }
        return err
    }
}
