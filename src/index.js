const rest = require('./spot/rest')
const stream = require('./spot/stream')

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
