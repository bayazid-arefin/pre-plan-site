const mongoose = require('mongoose');

const Userschema = mongoose.Schema(
    {
        
        edugrandId : {
            type : String,
            required : false
        },
        userType : {
            type : String,
            required : false,
            default : 'employee'
        },
        nickName : {
            type : String,
            required : true
        },
        fullName : {
            type : String,
            required : false
        },
        gender : {
            type : String,
            required : false
        },
        dateOfBirth : {
            type : String,
            required : false,
            default : 'Not Provided'
        },
        userNumber : {
            type : String,
            required : true
        },      
        homeAddress : {
            type : String,
            required : false
        },
        userEmail : {
            type : String,
            required : true
        },
        userPassword : {
            type : String,
            required : false
        },
        verificationCode:{
            type: Number,
            required: false
        },
        accountStatus : {
            type : String,
            required : false,
            default : 'Not Verified'
        },
        paymentAc : {
            type : String,
            required : false
        },
        paymentMethod : {
            type : String,
            required : false
        },
        uid : {
            type: String,
            required : true,
        }, 
        totalEarnMoneyByUser : {
            type :Number,
            required : false,
            default : 0
        },
        questionGoal:{
            type : Number,
            required : false,
            default: 3000
        }

    },
    {
        timestamps : true
    }
);

const User = mongoose.model('User', Userschema);
module.exports= User;