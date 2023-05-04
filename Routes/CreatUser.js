const express = require('express')
const router = express.Router();
const User = require('../models/User')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const { body, validationResult } = require('express-validator');
const jwtSecret = "qwertyuiopsdfnmzxcvbnmxcvbn";

router.post("/creatuser",
body('email').isEmail(),
body('name').isLength({ min: 5 }),
body('password','Incorrect Password').isLength({ min: 5 })
,async (req,res)=>{

    
    const salt = await bcrypt.genSalt(10)
    let secpassword = await bcrypt.hash(req.body.password,salt)
    try{
        await User.create({
            name:req.body.name,
            password :secpassword,
            email:req.body.email
        }).then(res.json({success:true}));
    }catch(err){
        console.log(err);
        res.json({success:false});
    }
})


router.post("/loginuser",
body('email').isEmail(),
body('password','Incorrect Password').isLength({ min: 5 })
,async (req,res)=>{
    
    let email = req.body.email;
    try{
        let userData = await User.findOne({email})
        if(!userData){
            return res.status(400).json({ errors: "try again" });
        }
        const pwdCompare = await bcrypt.compare(req.body.password,userData.password)
        if(!pwdCompare){
            return res.status(400).json({ errors: "try again" });
        }

        const data = {
            user:{
                id : userData.id
            }
        }
        const authToken = jwt.sign(data,jwtSecret);
        return res.json({success:true,authToken:authToken});
    }catch(err){
        console.log(err);
        res.json({success:false});
    }
})

module.exports = router;