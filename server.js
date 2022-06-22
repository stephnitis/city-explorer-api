'use strict';

console.log('our first server');

const express = require('express');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3002;

app.listen(PORT, ()=> console.log(`listening on port ${PORT}`));