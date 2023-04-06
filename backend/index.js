const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const https = require('https');
const mongoose = require("mongoose");
const fs = require('fs');

require('dotenv').config();


app.use(cors());
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json());

const mainRoutes = require("./routes/api.routes")
app.use("/api", mainRoutes)

mongoose.connect(process.env.MONGO_URL, () => {
    console.log("Mongoose initialized")
})

if (process.env.NODE_ENV === 'development') {
    http.createServer(app);
    app.listen(process.env.PORT, () => {
        console.log("Server running on port:" + process.env.PORT)
    })
} else if (process.env.NODE_ENV === 'production') {
    https.createServer({
        key: fs.readFileSync(process.env.SSL_PRIVATE_KEY_PATH),
        cert: fs.readFileSync(process.env.SSL_CERT_PATH)
    }, app).listen(process.env.PORT, function () {
        console.log(`[server.js] Server running fine on ${process.env.PORT}!`);
    })
}


