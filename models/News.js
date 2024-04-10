const mongoose = require('mongoose')


const newsSchema = new mongoose.Schema({
    title : {
        type : String ,
        required : true, 
        unique : true
    },
    link : { 
        type : String, 
        required : true
    },
    description : {
        type : String
    }
});

const News = mongoose.model("News", newsSchema)

module.exports = News;