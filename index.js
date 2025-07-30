const express = require('express');
const cors = require('cors');
require('dotenv').config();
const router = require('./routes');
const cookieParser = require('cookie-parser')
const connectDb = require('./config/connectDb')

const app = express();


connectDb(process.env.MONGODB_URI)

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

app.use(express.json());
app.use(cookieParser())


app.use("/api", router);
const PORT = process.env.PORT || 8080

// Connecting to db then starting the server
if (connectDb) {
    app.listen(PORT, () => {
        console.log("Server Running on Port:", PORT);
    })
}
