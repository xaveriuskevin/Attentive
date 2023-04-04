'use strict'

module.exports = app => {
    const skill = require("../controllers/skill");
    const router = require("express").Router();

    //List of Routes in Controller skill
    router.get("/",skill.index)
    router.post("/create",skill.create)
    router.delete("/delete/:skillId",skill.delete)

    app.use("/skill", router);
}