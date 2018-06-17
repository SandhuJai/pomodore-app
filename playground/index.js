const express = require('express');
const app = express();

app.listen(5000);

setInterval(() => {
    console.log('Tick');
}, 1000);