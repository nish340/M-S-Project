const mongoose = require('mongoose')
const { Sequelize } = require('sequelize');

// require('dotenv').config();
const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
MONGO_URI='mongodb+srv://rwts6135:tTlahQ4a3y2uNJIh@cluster0.o566pkh.mongodb.net/?retryWrites=true&w=majority'
// process.env.MONGO_URI
mongoose.set('strictQuery', false);
mongoose.connect(MONGO_URI, connectionParams)

    .then(() => {
        console.log('Connected to the database ');
        // initial();
    })
    .catch((err) => {
        console.error(`Error connecting to the database. n${err}`);
    });