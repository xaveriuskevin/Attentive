'use strict'

module.exports = mongoose => {

    const schema = mongoose.Schema({

            name : {
                type : String,
                required : true,
            },
            email : {
                type : String,
                required : true,
                lowercase : true,
            },
            username : {
                type : String,
                required : true,
            },
            password : {
                type : String,
                required : true,
            },
            profile : {
                type : String,
                required : true,
                default : 'Board'
            },
            skill : {
                type : String,
            }

    });

    return mongoose.model("users", schema);
}