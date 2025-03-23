const express = require('express');

const routes = express();
const { User, Notes } = require('../models/models');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const JWT_SECRET = "rahulkumar"

routes.get('/',(req,res)=>{
    res.send("Hello its woking u are into users Routes")
})

// user signup
routes.post('/signup',(req,res)=>{
    const {name,email,password} = req.body;
    if(!name || !email || !password){
        return res.status(422).json({error:"Plz fill all the fields"})
    }
    User.findOne({email:email})
    .then((userExist)=>{
        if(userExist){
            return res.status(422).json({error:"Email already exist"})
        }
        const user = new User({name,email,password});
        user.save().then(()=>{
            res.status(201).json({message:"User registered successfully"})
        }).catch((err)=>{
            res.status(500).json({error:"Failed to register"})
        })
    }).catch(err=>{
        console.log(err)
    })
})



// user signin

routes.post('/signin',(req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(422).json({error:"Plz fill all the fields"})
    }
    User.findOne({email:email,password:password})
    .then((userExist)=>{
        if(userExist){
            const token = jwt.sign({_id:userExist._id},JWT_SECRET)
            const {_id,name,email} = userExist
            res.json({token,user:{_id,name,email}})
        }else{
            return res.status(422).json({error:"Invalid email or password"})
        }
    }).catch(err=>{
        console.log(err)
    })
})

// save my codes

const authMiddleware = (req,res,next)=>{
    const {authorization} = req.headers;
    if(!authorization){
        return res.status(401).json({error:"You must be logged in"})
    }
    const token = authorization.replace("Bearer ","")
    jwt.verify(token,JWT_SECRET,(err,payload)=>{
        if(err){
            return res.status(401).json({error:"You must be logged in"})
        }
        const {_id} = payload
        User.findById(_id).then(userData=>{
            req.user = userData
            next()
        })
    })
}

routes.post('/save',authMiddleware,(req,res)=>{
    const {title,description} = req.body;
    if(!title || !description){
        return res.status(422).json({error:"Plz fill all the fields"})
    }
    const notes = new Notes({title,description,user:req.user})
    notes.save().then(()=>{
        res.status(201).json({message:"Note saved successfully"})
    }).catch((err)=>{
        res.status(500).json({error:"Failed to save note"})
    })
})


// get my codes
routes.get('/getmycodes',authMiddleware,(req,res)=>{
    Notes.find({user:req.user}).then((notes)=>{
        res.json({notes})
    }).catch(err=>{
        console.log(err)
    })
})


module.exports = {routes};