const app = require('express')();
const router = require('./src/routes/router');
const bodyParser = require('body-parser');
const ROB = require('./src/ROB/robListener');
const cors = require('cors')
const PORT = process.env.PORT || 3002;
const robPort = require('./config/config').all.customeProtocols.port;

app.use(cors());
app.use(bodyParser.json());
app.use('/api', router);
app.listen(PORT, () => console.log(PORT));

const listener = new ROB();
listener.listen(robPort, () => console.log('rob is on:', robPort));
