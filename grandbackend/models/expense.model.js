const mongoose = require('mongoose');

const Expensechema = mongoose.Schema(
    {
        addedBy : {
            type : String,
            required : true
        },
        expenseTitile : {
            type : String,
            required : true,
        },
        paidTo : {
            type : String,
            required : true
        },
        date : {
            type : String,
            required : true
        },
        ammount : {
            type : String,
            required : true
        },
        serial:{
            type : Number,
            required : true
        }
    },
    {
        timestamps : true
    }
);

const Expense = mongoose.model('Expense', Expensechema);
module.exports= Expense;