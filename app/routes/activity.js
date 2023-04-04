'use strict'

module.exports = app => {
    const activity = require("../controllers/activity");
    const router = require("express").Router();

    //List of Routes in Controller activity
    router.get("/",activity.index)
    router.get("/:title",activity.indexByTitle)
    router.post("/create",activity.create)
    router.put("/update/:activityId",activity.update)
    router.delete("/delete/:activityId",activity.delete)

    app.use("/activity", router);
}