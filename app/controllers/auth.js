'use strict';

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = mongoose.model('users');
const Token = mongoose.model('token');
const TOKEN_KEY = 'Attentive-Token'


exports.register = (req, res , next) => {
(async() => {

    // Validate request
    if(!req.body) {
    return res.status(400).send({
        message: "Users content can not be empty"
    });
    }
    let duplicateEmail = await User.findOne({email : req.body.email})
    let duplicateUsername = await User.findOne({username : req.body.username})

    if(duplicateEmail || duplicateUsername){
        return res.status(400).send({
            message: "Email Or Username Already Exist!"
        });
    }

    const user = new User({
       name : req.body.name,
       email : req.body.email,
       username : req.body.username,
       password : bcrypt.hashSync(req.body.password, 10),
       profile : "Board"
    });

    user.save().then(data => {
        res.send({success: true, data});
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the User."
        });
    });
})().catch(next)
}


exports.login = (req, res , next) => {
(async() => {
        
        //Checking Username
        let user = await User.findOne({username: req.body.username})
        
        if(user){
            //Comparing Password
            let compare = await bcrypt.compare(req.body.password, user.password)

            if(compare == false){
                return res.status(400).send({
                    message: "Username or Password is Wrong!"
                });
            }
            
            let expired_date = new Date();
            expired_date.setDate(expired_date.getDate() + 1);
           
             // Create token
            const newToken = jwt.sign({ 
                    user_id: user._id, 
                    username : user.username },
                    TOKEN_KEY,
                {
                    expiresIn: "24h",
                });
            

            //Save Token
            const token = await Token.create({
                user_id : user._id,
                token : newToken,
                status : "valid",
                start_date : new Date(),
                end_date : expired_date
            })

            return res.status(200).send({
                message: "You have Successfully Login!",
                token : newToken,
                profile : user.profile
            });
        }else{
            return res.status(400).send({
                message: "Username doesn't exist!"
            });
        }
})().catch(next)
}


exports.logout = (req, res , next) => {
(async() => {
    let token = req.headers['x-access-token'];
    
    if(token){
        const verify = jwt.verify(req.headers['x-access-token'], TOKEN_KEY)
       
        exporter.setHashKeyValuesIntoRedis('expired_token', [token])
        .then(() => {
            res.status(200).json({
                msg: 'logged out'
            })
        })
    }else{
        return res.status(400).send({
            message: "Please Login First!"
        });
    }
})().catch(next)
}