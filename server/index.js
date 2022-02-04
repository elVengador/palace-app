/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(express.static(path.join(__dirname, 'build')));
app.use(cors());

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = 8060
app.listen(PORT, () => console.log("[💽 Server]: connected successfull"));
