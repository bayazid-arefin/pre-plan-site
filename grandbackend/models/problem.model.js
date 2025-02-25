const mongoose = require('mongoose');

const Problemschema = mongoose.Schema(
    {
        createdBy : {
            type : String,
            required : true
        },
        problemTitle : {
            type : String,
            required : true,
        },
        problemMessage : {
            type : String,
            required : true
        },
        status : {
            type : String,
            required : true
        }
    },
    {
        timestamps : true
    }
);

const Problem = mongoose.model('Problem', Problemschema);
module.exports= Problem;