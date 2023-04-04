'use strict'


const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = mongoose.model('users');
const Skill = mongoose.model('skill');
const TOKEN_KEY = 'Attentive-Token'

exports.register = (req, res , next) => {
(async() => {

    //validate Token
    let token = req.headers['x-access-token'];

    if(token){
        
        const verify = jwt.verify(token,TOKEN_KEY)
        
        let findUser = await User.findOne({username : verify.username})

        if(findUser.profile == "Board"){

            let duplicateEmail = await User.findOne({email : req.body.email})
            let duplicateUsername = await User.findOne({username : req.body.username})

            if(duplicateEmail || duplicateUsername){
                return res.status(400).send({
                    message: "Email Or Username Already Exist!"
                });
            }

            if(req.body.skill){
                let findSkill = await Skill.findOne({skill_name : req.body.skills})
                if(!findSkill){
                    return res.status(400).send({
                        message: "Skill Not Found"
                    });
                }
            }

            const user = new User({
                name : req.body.name,
                email : req.body.email,
                username : req.body.username,
                password : bcrypt.hashSync(req.body.password, 10),
                profile : req.body.profile,
                skill : req.body.skill
            });

            user.save().then(data => {
                res.send({success: true, data});
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the User."
                });
            });
        }else{
            return res.status(400).send({
                message: "User Unauthorized! Only Board User can Use this"
            });
        }

    }else{
        return res.status(400).send({
            message: "Please Login First! User Unauthorized!"
        });
    }
})().catch(next)
}