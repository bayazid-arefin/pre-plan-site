const mongoose = require('mongoose');

const Releaseschema = mongoose.Schema(
    {
        releaseBy : {
            type : String,
            required : true
        },
        releaseVersion : {
            type : String,
            required : true,
        },
        releaseDate : {
            type : String,
            required : true
        },
        releaseText : {
            type : String,
            required : true
        }
    },
    {
        timestamps : true
    }
);

const Release = mongoose.model('Release', Releaseschema);
module.exports= Release;