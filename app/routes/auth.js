'use strict'

module.exports = app => {
    const auth = require("../controllers/auth");
    const router = require("express").Router();

   

    //List of Routes in Controller Auth
    router.post("/",auth.register)
    router.post("/login",auth.login)
    router.get("/logout",auth.logout)



    app.use("/auth", router);
}