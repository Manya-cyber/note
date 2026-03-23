import express from "express";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { registerSchema } from "../../utils/validation.js";
import { loginSchema } from "../../utils/validation.js";

const router= express.Router();


router.post("/register",async(req,res)=>{
    try{
        const result = registerSchema.safeParse(req.body);
        if(!result.success){
            return res.status(400).json({errors: result.error.errors});
        }
        const {name,email,password}= result.data;

        const exists =await User.findOne({email});
        if(exists)return res.status(400).json({
            message:"Email already in use"
        });

        const hashed = await bcrypt.hash(password,10);

        const user = await User.create({name,email,password:hashed});

        const token = jwt.sign({id: user._id},process.env.JWT_SECRET,{expiresIn:"7d"});
         

        res.status(201).json({token, user:{ 
                                      id:user._id,
                                      name:user.name,
                                      email:user.email
                                    
                                    }});
                                }
                            catch(error){

                                    res.status(400).json({message: error.message});}



    

});



router.post("/login",async(req,res)=>{

    try{
        const  result= loginSchema.safeParse(req.body);

        if(!result.success){
            return res.status(400).json({error:result.error.errors});
        }
        const{email,password}= result.data;

        const user= await User.findOne({email});

        if(!user)return res.status(400).json({
            message:"Invalid credentials"
        });

        const match =await bcrypt.compare(password,user.password);
        if(!match) return res.status(400).json({message :"Invalid credentials" });

        const token = jwt.sign({id : user._id},process.env.JWT_SECRET,{expiresIn: "7d"});

        res.json({token,user:{id:user._id,name:user.name,email:user.email}});

    }catch(error){
        res.status(500).json({message: error.message});
    }




});



export default router;