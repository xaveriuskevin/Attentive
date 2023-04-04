'use strict'

module.exports = mongoose => {

    const schema = mongoose.Schema({

            user_id : {
                type : String,
                required : true,
            },
            token : {
                type : String,
                required : true,
            },
            status : {
                type : String,
                required : true,
            },
            start_date : {
                type : Date,
                default : Date.now
            },
            end_date : {
                type : Date,
                default : Date.now
            },

    });

    return mongoose.model("token", schema);
}