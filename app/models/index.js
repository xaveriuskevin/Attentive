const dbConfig = require("../config/database");
const mongoose = require("mongoose");

module.exports = {
    mongoose,
    url : dbConfig.url,
    users : require("./users")(mongoose),
    activity : require("./activity")(mongoose),
    token : require("./token")(mongoose),
    skill : require("./skill")(mongoose)
}