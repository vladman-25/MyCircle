const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const https = require('https');
const mongoose = require("mongoose");
const fs = require('fs');
const { Server } = require("socket.io");


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

let server = null;

if (process.env.NODE_ENV === 'development') {
    server = http.createServer(app);
} else if (process.env.NODE_ENV === 'production') {
    server = https.createServer({
        key: fs.readFileSync(process.env.SSL_PRIVATE_KEY_PATH),
        cert: fs.readFileSync(process.env.SSL_CERT_PATH)
    }, app)
}

const io = new Server(server, {
    cors: {
        origin: "https://mycircle.live",
        methods: ["GET", "POST"],
    },
});

const {createMessage} = require('./helpers/messagesSaver')

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });

    socket.on("send_message", (data) => {
        console.log(data);
        socket.to(data.room).emit("receive_message", data);
        createMessage(data.author_id, data.room, data.author, data.content, data.time)
    });

    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    });
});

server.listen(process.env.PORT, function () {
    console.log(`[server.js] Server running fine on ${process.env.PORT}!`);
})


