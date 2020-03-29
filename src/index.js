module.exports = {
    rest: require('./binance/rest'),
    stream: require('./binance/stream'),
    error: err => {
        if (typeof err.response.data != 'undefined') {
            const error = err.response.data
            return `${error.code}: ${error.msg}`
        }

        console.error(err)
    }
}
