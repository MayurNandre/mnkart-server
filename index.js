const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./config/db');
const router = require('./routes');
const cookieParser = require('cookie-parser')

const app = express();

app.use(cors({
    origin : process.env.FRONTEND_URL,
    credentials : true
}));

app.use(express.json());
app.use(cookieParser())


app.use("/api",router);
const PORT = 8080 || process.env.PORT

// Connecting to db then starting the server
db().then(()=>{
app.listen(PORT,()=>{
    console.log("Server Running on Port:",PORT);
})
})