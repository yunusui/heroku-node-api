const mongoose = require('mongoose')

const listingSchema = new mongoose.Schema({
    title:String,
    mainTitle:String,
    desc:String
})

module.exports = mongoose.model('db-name', listingSchema  );