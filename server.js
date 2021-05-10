const express = require('express');
const errorMiddelware = require('./middlewares/errors');
const allowHeaders = require('./middlewares/headers');
const bodyParser = require('body-parser');
const helmet = require("helmet");

const webScrapRouter = require('./routes/webscrap');


const app = express();

app.use(helmet());
app.use(allowHeaders);
app.use(bodyParser.json());



app.use('/api/shein', webScrapRouter);



app.use(errorMiddelware);

app.listen(process.env.PORT || 8080, () => {
    console.log(`Example app listening on port ${process.env.PORT || 8080}!`);
});

//Run app, then load http://localhost:port in a browser to see the output.