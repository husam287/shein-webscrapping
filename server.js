const express = require('express');
const errorMiddelware = require('./middlewares/errors');
const allowHeaders = require('./middlewares/headers');
const bodyParser = require('body-parser');

const webScrapRouter = require('./routes/webscrap');

const app = express();
app.use(bodyParser.json());

app.use(allowHeaders);


app.use('/api/shein',webScrapRouter);


app.use(errorMiddelware);

app.listen(8080, () => {
    console.log('Example app listening on port port!');
});

//Run app, then load http://localhost:port in a browser to see the output.