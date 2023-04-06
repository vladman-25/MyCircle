require('dotenv').config();
const fs = require('fs');
const https = require('https');
const express = require('express');
const path = require("path");

const app = express();

https.createServer({
    key: fs.readFileSync(process.env.SSL_PRIVATE_KEY_PATH),
    cert: fs.readFileSync(process.env.SSL_CERT_PATH),
}, app).listen(process.env.PORT, function() {
    console.log('App listening on port ' + process.env.PORT + '!');
});

app.use(express.static(path.join(__dirname, "../", "build")));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
});

app.enable('trust proxy');

app.use(function(req, res, next) {
    if (req.secure) {
        return next();
    }
    res.redirect('https://' + req.headers.host + req.url);
})
