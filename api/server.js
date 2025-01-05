const app = require('../app');
const http = require('http');

module.exports = (req, res) => {

    const server = http.createServer(app);

    server.emit('request', req, res);
};
