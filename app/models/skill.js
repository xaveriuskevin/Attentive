module.exports = mongoose => {

    const schema = mongoose.Schema({

            skill_name : {
                type : String,
            },
            skill_description : {
                type : String,
            }
    },{
        timestamps : true }
    );

    return mongoose.model("skill", schema);
}