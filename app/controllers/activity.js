'use strict';

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const activity = require('../models/activity');
const User = mongoose.model('users');
const Activities = mongoose.model('activity');
const Skill = mongoose.model('skill');

const TOKEN_KEY = 'Attentive-Token'


exports.index = (req, res , next) => {
(async() => {
    //validate Token
    let token = req.headers['x-access-token'];
    
    if(token){
            
        const verify = jwt.verify(token,TOKEN_KEY)
        
        Activities.find()
        .then(activity => {
            res.send(activity);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving activity."
                });
            });
    }else{
        return res.status(400).send({
            message: "Please Login First! User Unauthorized!"
        });
    }
})().catch(next)
}

exports.indexByTitle = (req, res , next) => {
(async() => {
    //validate Token
    let token = req.headers['x-access-token'];
    
    if(token){
            
        const verify = jwt.verify(token,TOKEN_KEY)
        
        Activities.findOne({title : req.params.title})
        .then(activity => {
            if(!activity) {
                return res.status(404).send({
                    message: "activity not found with title  " + req.params.title
                });            
            }
            res.send(activity);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "activity not found with title  " + req.params.title
                });                
            }
            return res.status(500).send({
                message: "Error retrieving activity with title  " + req.params.title
            });
        });
    }else{
        return res.status(400).send({
            message: "Please Login First! activity Unauthorized!"
        });
    }
})().catch(next)
}

exports.create = (req, res , next) => {
(async() => {
    //validate Token
    let token = req.headers['x-access-token'];

    if(token){
        
        const verify = jwt.verify(token,TOKEN_KEY)
        
        let findUser = await User.findOne({username : verify.username})

        if(findUser.profile == "Expert"){

            let findSkill = await Skill.findOne({skill_name : req.body.skills})
            if(findSkill){
                const activity = new Activities({
                skills : req.body.skills,
                title : req.body.title,
                description : req.body.description,
                start_date : req.body.start_date,
                end_date : req.body.end_date,
                participant : req.body.participant
                });

                activity.save().then(data => {
                    res.send({success: true, data});
                }).catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while creating the Activity."
                    });
                });
            }else{
                return res.status(400).send({
                    message: "Skill Not Found!"
                });
            }
        }else{
            return res.status(400).send({
                message: "User Unauthorized! Only Expert User can Use this Service"
            });
        }

    }else{
        return res.status(400).send({
            message: "Please Login First! User Unauthorized!"
        });
    }
})().catch(next)
}

exports.update = (req, res , next) => {
(async() => {
    //validate Token
    let token = req.headers['x-access-token'];
    
    if(token){
            
        const verify = jwt.verify(token,TOKEN_KEY)
            
        let findUser = await User.findOne({username : verify.username})
    
        if(findUser.profile == "Expert"){

            let findSkill = await Skill.findOne({skill_name : req.body.skills})
            if(findSkill){
                Activities.findByIdAndUpdate(req.params.activityId, {
                    skills : req.body.skills,
                    title : req.body.title,
                    description : req.body.description,
                    start_date : req.body.start_date,
                    end_date : req.body.end_date,
                    participant : req.body.participant
                }, {new: true})
                .then(activity => {
                    if(!activity) {
                        return res.status(404).send({
                            message: "activity not found with id " + req.params.activityId
                        });
                    }
                    res.send({
                        message : "Activity Updated",
                        activity : activity
                    });
                }).catch(err => {
                    if(err.kind === 'ObjectId') {
                        return res.status(404).send({
                            message: "activity not found with id " + req.params.activityId
                        });                
                    }
                    return res.status(500).send({
                        message: "Error updating activity with id " + req.params.activityId
                    });
                });
            }else{
                return res.status(400).send({
                    message: "Skill Not Found"
                });
            }
        }else{
            return res.status(400).send({
                message: "activity Unauthorized! Only Expert activity can Use this Service"
            });
        }
    }else{
        return res.status(400).send({
            message: "Please Login First! User Unauthorized!"
        });
    }
})().catch(next)
}

exports.delete = (req, res , next) => {
(async() => {
    //validate Token
    let token = req.headers['x-access-token'];
    
    if(token){
            
        const verify = jwt.verify(token,TOKEN_KEY)
            
        let findUser = await User.findOne({username : verify.username})
    
        if(findUser.profile == "Expert"){

            Activities.findByIdAndRemove(req.params.activityId)
            .then(activity => {
                if(!activity) {
                    return res.status(404).send({
                        message: "activity not found with id " + req.params.activityId
                    });
                }
                res.send({message: "activity deleted successfully!"});
            }).catch(err => {
                if(err.kind === 'ObjectId' || err.name === 'NotFound') {
                    return res.status(404).send({
                        message: "activity not found with id " + req.params.activityId
                    });                
                }
                return res.status(500).send({
                    message: "Could not delete activity with id " + req.params.activityId
                });
            });
            
        }else{
            return res.status(400).send({
                message: "activity Unauthorized! Only Expert activity can Use this Service"
            });
        }
    }else{
        return res.status(400).send({
            message: "Please Login First! User Unauthorized!"
        });
    }
})().catch(next)
}


