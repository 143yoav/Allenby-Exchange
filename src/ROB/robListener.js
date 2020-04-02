const net = require('net');
const robSerializer = require('../formatters/rob');
const robHandler = require('./robHandler');
const config = require('../../config/config').all.customeProtocols;

class robListener {
  constructor() {
    this.server = net.createServer();
    this.server.on('connection', this.onConnection);
  }

  listen = (port, callback) => {
    this.server.listen(port);
    callback(port);
  };

  onConnection = socket => {
    socket.setTimeout(config.connTimeOut, () => socket.end());
    socket.on('error', () => socket.destroy());

    socket.on('data', data => {
      var desirialized = robSerializer.deserialize(data);

      robHandler[desirialized.cmd](desirialized)
        .then(res => {
          res.success = true;
          socket.write(robSerializer.serialize(res));
        })
        .catch(err => {
          socket.write(robSerializer.serialize({ success: false }));
        });
    });
  };
}

module.exports = robListener;
