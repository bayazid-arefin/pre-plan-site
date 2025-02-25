const mongoose = require('mongoose');

const Questionchema = mongoose.Schema(
    {
        subjectName : {
            type : String,
            required : true
        },
        chapterName : {
            type : String,
            required : true
        },
        chapterId : {
            type : String,
            required : true
        },
        employeeId : {
            type : String,
            required : true
        },
        createdBy : {
            type : String,
            required : true
        },
        questionTitle : {
            type : String,
            required : true
        },
        optionA : {
            type : String,
            required : true
        },
        optionB : {
            type : String,
            required : true
        },
        optionC : {
            type : String,
            required : true
        },
        optionD : {
            type : String,
            required : true
        },
        correctAns : {
            type : String,
            required : true,
        },
        refarence : {
            type : String,
            required : false,
            default : ''
        },
        verifiedStatus:{
            type : Boolean,
            required: false,
            default: false
        }
    },
    {
        timestamps : true
    }
);

const Question = mongoose.model('Question', Questionchema);
module.exports= Question;