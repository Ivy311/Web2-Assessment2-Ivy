const Api = require('./api');
const bodyParser = require('body-parser');
const cors = require('cors');
// express
const express = require('express');
const path = require('path');
const app = express();

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

//api router prefix
app.use('/api', Api);

//listen 3000
app.listen(3000);

console.log('success listen at port:3000...');