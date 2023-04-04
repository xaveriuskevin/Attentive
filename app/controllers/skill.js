'use strict';

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const skill = require('../models/activity')
const Skill = mongoose.model('skill');
const TOKEN_KEY = 'Attentive-Token'


exports.index = (req, res , next) => {
    (async() => {
        //validate Token
        let token = req.headers['x-access-token'];
        
        if(token){
                
            const verify = jwt.verify(token,TOKEN_KEY)
            
            Skill.find()
            .then(skill => {
                res.send(skill);
                }).catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while retrieving skill."
                    });
                });
        }else{
            return res.status(400).send({
                message: "Please Login First! User Unauthorized!"
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

        const skill = new Skill({
        skill_name : req.body.skill_name,
        skill_description : req.body.skill_description,
        });

        skill.save().then(data => {
            res.send({success: true, data});
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Skill."
            });
        });

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

            Skill.findByIdAndRemove(req.params.skillId)
            .then(skill => {
                if(!skill) {
                    return res.status(404).send({
                        message: "skill not found with id " + req.params.skillId
                    });
                }
                res.send({message: "skill deleted successfully!"});
            }).catch(err => {
                if(err.kind === 'ObjectId' || err.name === 'NotFound') {
                    return res.status(404).send({
                        message: "skill not found with id " + req.params.skillId
                    });                
                }
                return res.status(500).send({
                    message: "Could not delete skill with id " + req.params.skillId
                });
            });
    }else{
        return res.status(400).send({
            message: "Please Login First! User Unauthorized!"
        });
    }
})().catch(next)
}