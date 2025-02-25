const mongoose = require('mongoose');

const Chapterschema = mongoose.Schema(
    {
        chapterTitle : {
            type : String,
            required : true
        },
        createdBy : {
            type : String,
            required : false,
        },
        subject : {
            type : String,
            required : true
        },
        serial : {
            type : String,
            required : true
        },
        normalSerial : {
            type : Number,
            required : true
        },
        chapterTitleBangla:{
            type:String,
            required:false,
            default:""
        }
    },
    {
        timestamps : true
    }
);

const Chapter = mongoose.model('Chapter', Chapterschema);
module.exports= Chapter;