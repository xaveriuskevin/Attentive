module.exports = mongoose => {

    const schema = mongoose.Schema({

            skills : {
                type : String,
            },
            title : {
                type : String,
            },
            description : {
                type : String,
            },
            start_date : {
                type : Date,
                default : Date.now
            },
            end_date : {
                type : Date,
                default : Date.now
            },
            participant : {
                type : mongoose.Schema.Types.ObjectId,
                ref : "users"
            },

    },{
        timestamps : true }
    );

    return mongoose.model("activity", schema);
}