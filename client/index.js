const socketIoClient = require('socket.io-client')
const http = require('http').Server()

const socket = socketIoClient('http://localhost:5000')
const readline = require('node:readline').createInterface({
  input: process.stdin,
  output: process.stdout,
})
readline.on('line', (input) => {
  socket.emit('msg', input)
})
socket.on('welcome', (payload) => {
  console.log(payload)
})

socket.on('response', (payload) => {
  console.log(payload)
})

socket.on('close', (payload) => {
  console.log(payload)
  process.exit(0)
})

http.listen(3000, () => {
  console.log('server is running live on the port', 3000)
})
