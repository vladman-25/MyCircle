const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const mongoose = require("mongoose");

require('dotenv').config();


app.use(cors());
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json());

const mainRoutes = require("./routes/api.routes")
app.use("/aa", mainRoutes)

if (process.env.NODE_ENV === 'development') {
    http.createServer(app);
}
app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`));
mongoose.connect(process.env.MONGO_URL, () => {
    console.log("Mongoose initialized")
})