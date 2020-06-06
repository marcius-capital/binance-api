// Axios proxy not works in browser, manual setup
const proxy = (url, { host, port, username, password }) => {
    const proxy = (username && password) ? `${host}:${port}/?username=${username}&password=${password}` : `${host}:${port}`
    return (username && password) ? proxy + '/' + url : url
}

module.exports = proxy