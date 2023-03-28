require('dotenv').config();
const fs = require('fs');
const path = require("path");
const express = require('express');
const app = express();

app.listen(process.env.PORT, function () {
    console.log("server started");
})

app.use(express.static(path.join(__dirname, "../", "build")));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
});

app.enable('trust proxy');

app.use(function(req, res, next) {
    res.redirect('http://' + req.headers.host + req.url);
})
