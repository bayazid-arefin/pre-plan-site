const mongoose = require('mongoose');



const Taskschema = mongoose.Schema(
    {
        employeeName : {
            type : String,
            required : true
        },
        employeeId: {
            type: String,
            required: true
        },
        subjectName : {
            type : String,
            required : true
        },
        totalQuestion : {
            type : Number,
            required : true
        },
        startingDate : {
            type : String,
            required : true
        },
        endingDate : {
            type : String,
            required : true
        },
        taskPrice : {
            type : String,
            required : true
        },
        status : {
            type : String,
            required : true
        },
        chapterSerial : {
            type : String,
            required : false
        }
    },
    {
        timestamps : true
    }
);

const Task = mongoose.model('Task', Taskschema);
module.exports= Task;