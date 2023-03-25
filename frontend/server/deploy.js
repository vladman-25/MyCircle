require('dotenv').config();
const fs = require('fs');
const http = require('https');
const express = require('express');
const path = require("path");

const app = express();

http.createServer(app).listen(process.env.PORT, function() {
    console.log('App listening on port ' + process.env.PORT + '!');
});

app.use(express.static(path.join(__dirname, "../", "build")));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
});

app.enable('trust proxy');

app.use(function(req, res, next) {
    res.redirect('http://' + req.headers.host + req.url);
})