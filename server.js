const app = require('express')();
const router = require('./src/routes/router');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3002;

app.use(bodyParser.json());
app.use('/api', router);

app.listen(PORT, () => console.log(PORT));
