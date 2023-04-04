'use strict'

module.exports = app => {
    const user = require("../controllers/user");
    const router = require("express").Router();

   

    //List of Routes in Controller user
    router.post("/register",user.register)



    app.use("/user", router);
}