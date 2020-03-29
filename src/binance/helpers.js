// Need for control open connections
let sockets = new Map()

// Recreate stream if open repeatedly
export const updateSockets = ({ path, uniqueID }, socket) => {
    if (uniqueID) {
        return sockets.set(uniqueID, socket)
    }

    const key = path.toString()
    closeSocket(key)
    return sockets.set(key, socket)
}

// Close connections
export const closeSockets = () => {
    sockets.forEach((value, key) => {
        value.close()
        sockets.delete(key)
    })
}

// Close connection 
export const closeSocket = (key) => {
    if (sockets.has(key)) {
        sockets.get(key).close()
        return sockets.delete(key)
    }
}