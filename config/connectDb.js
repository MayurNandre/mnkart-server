const mongoose = require('mongoose');

const connectDb = (uri) => {
    mongoose.connect(uri, { dbName: "MNKart" }).then((data) => {
        console.log(`Connected to db : ${data.connection.host}`)
    }).catch((err) => {
        throw err;
    })
}

module.exports = connectDb;