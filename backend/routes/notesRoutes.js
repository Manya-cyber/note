import express from "express";
import Notes from "../models/notesModel.js";
import auth from "../middlwares/authMiddleware.js";
import { noteSchema } from "../../utils/validation.js";
const router=express.Router();


router.post('/',auth,async(req,res)=>{

    try{
    const result = noteSchema.safeParse(req.body);
    if(!result.success){
        return res.status(400).json({errors:result.error.errors});
    }
    


          const {title,content}=result.data;
          const notes=await Notes.create({
            title,content,user:req.user.id,
          });
            res.status(201).json(notes);
        }catch(err){
            res.status(500).json({error :"Server error"});
        }
  


});

router.get("/",auth,async(req,res)=>{
    try{
const notes= await Notes.find({user:req.user.id}).populate("user","name email");
res.status(200).json(notes);
    }catch(error){
            res.status(500).json({
        message:error.message,
    });
    }
   
});



router.delete("/:id",auth,async(req,res)=>{
    try{
        const note=await Notes.findOneAndDelete({
            _id:req.params.id,
            user:req.user.id,

        });

        if(!note)return res.status(404).json({message: "Note not found"});
        res.json({message : "Note deleted"});
    }catch(error){
        res.status(500).json({message :error.message});
    }
});

export default router;