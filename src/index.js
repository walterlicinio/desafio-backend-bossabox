// Import server
const server = require('./server')

// Initialize server on port 3000
server.listen(3000 || process.env.PORT)
