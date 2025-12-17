const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const createToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '1d'})
}


const loginUser = async(req, res)=>{
    const{email, password} = req.body;


    if(!email || !password){
        return res.status(400).json({error:"All fields are required.."});
    }

    try{
        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({error:"Invalid email or password"});
        }
         
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        const token = createToken(user._id);

        if(!isPasswordCorrect){
            return res.status(400).json({error:"Invalid email or password"});
        }

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token,
            message:'Login successful...'
        })

        // res.status(200).json({ name:user.name, email:user.email, token, message:"Login successful..."})

        }catch(error){
            res.status(404).json({error:error.message})
     }
    }

const signupUser = async(req,res)=>{
    const{name, email, password} = req.body;

    if(!name || !email || !password){
        return res.status(400).json({error:"All fields are required.."});
    }
    if(!validator.isEmail(email)){
        return res.status(400).json({error:"Email is not valid.."});
    }
    if(!validator.isStrongPassword(password)){
        return res.status(400).json({error:"Password is not strong enough.."});
    }
    if(password.length < 6){
        return res.status(400).json({error:"Password must be at least 6 Characters Long.."})
    }

    try{
        const exisitingUser = await User.findOne({email});

        if(exisitingUser){
            return res.status(400).json({error:"User already exists with this email"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        const user = await User.create({
             name,
             email,
             password : hashedPassword,
            });
            
              const token = createToken(user._id)

    // // SEND CONSISTENT RESPONSE
    // res.status(201).json({
    //   _id: user._id,
    //   name: user.name,
    //   email: user.email,
    //   token,
    // })
        res.status(200).json({user,token, message:"Signup successfully.."})
    }
    catch(error){
        res.status(404).json({error:error.message})
    }
}


module.exports ={
    loginUser,
    signupUser,
}