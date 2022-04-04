const mongoose = require("mongoose")

var mongoURL = 'mongodb+srv://andrewvu270:hoangtom@cluster0.6ccac.mongodb.net/mern-rooms'

mongoose.connect(mongoURL, {useUnifiedTopology: true, useNewURLParser: true})

var connection = mongoose.connection

connection.on('error', ()=>{
    console.log('MongoDB Connection failed')
})

connection.on('connected', ()=>{
    console.log('MongoDB Connection successful')
})

module.exports = mongoose