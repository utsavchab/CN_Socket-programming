const socketIoClient = require('socket.io-client')
// const http = require('http').Server()
const fs = require('fs')

const socket = socketIoClient('http://localhost:5000')
const readline = require('node:readline').createInterface({
  input: process.stdin,
  // output: process.stdout,
})
readline.on('line', (input) => {
  socket.emit('msg', input)
})

const fileName = 'video.wmv'
let sent = false
socket.on('connect', () => {
  if (sent) {
    return
  }
  sent = true
  try {
    const data = fs.readFileSync(fileName, 'binary')
    const extension = fileName.split('.').reverse()[0]

    // console.log(data)
    socket.emit('client1')
    socket.emit('file', { extension, data })
  } catch (err) {
    console.error('file not found')
  }
})
socket.on('welcome', (payload) => {
  console.log(payload)
})

socket.on('response', (payload) => {
  console.log(payload)
})

socket.on('wrong input', (payload) => {
  console.log(payload)
})

// http.listen(3000, () => {
//   console.log('server is running live on the port', 3000)
// })
