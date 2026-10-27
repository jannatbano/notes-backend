const mngoose = require('mongoose')
const Note =require('../model/NoteModel');
const { default: mongoose } = require('mongoose');

const addNote = async (req,res)=>{
    try{
        const  {title,content}= req.body;
        const note = await Note.create({title,content});
        res.status(201).json({message:"Note added",note});
    }catch(error){
        res.status(500).json({message:error.message})
    }
};

const getNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json({ count: notes.length, notes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const searchNotes = async(req,res)=>{
    try{
        const {q}= req.query;
        if(!q){
            return res.status(400).json({message:'search word is required'})
        }

        const safeWord = q.repace(/[.*+?^${}()|[\]\\]/g, "\\$&");

        const notes = await Note.find({
            $or:[
                {title:{$regex: safeWord,$options:i}},
                {content:{$regex: safeWord,$options:i}},
            ],
        });

        res.status(200).json({count: notes.length,notes})
    }catch(error){
        res.status(500).json({message:error.message})
    }
};


const updateNote=async (req,res)=>{
    try{
        const {id} = req.params;
        const{ title,content} = req.body
        if(!mongoose.isValidObjectId(id)){
            return res.status(400).json({message: "Invlid note id"});
        }

        const note = await Note.findByIdAndUpdate(
            id,
            {title,content},
            {new: true, runValidators: true}
        );
        
        if(!note){
            return res.status(404).json({message:"Note not found"});
        }

        res.status(200).json({message:"Note updated",note})
    }catch(error){
        res.status(500).json({message:error.message})
    }
};


const deleteNote = async(req,res)=>{
    try{
        const {id} = req.params;

        if(!mongoose.isValidObjectId(id)){
            return res.status(404).json({message:"Invalid note id"});
        }

        const note = await Note.findByIdAndDelete(id);
        if(!note){
            return res.status(404).json({message:"Note not found"});
        }

        res.status(200).json({message:"Note Deletd"});
    }catch(error){
        res.status(500).json({message:error.message});
    }
};

module.exports = { addNote, getNotes, searchNotes, updateNote, deleteNote };