// Need for control open connections
let sockets = new Map()

// Recreate stream if open repeatedly
const updateSockets = ({ path, uniqueID }, socket) => {
    if (uniqueID) {
        return sockets.set(uniqueID, socket)
    }

    const key = path.toString()
    closeSocket(key)
    return sockets.set(key, socket)
}

// Close connections
const closeSockets = () => {
    sockets.forEach((value, key) => closeSocket(key))
}

// Close connection 
const closeSocket = (key) => {
    if (sockets.has(key)) {
        sockets.get(key).close(1000)
        return sockets.delete(key)
    }
}

module.exports = {
    updateSockets,
    closeSockets,
    closeSocket,
}