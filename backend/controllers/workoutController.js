const { default: mongoose } = require('mongoose');
const workout = require('../models/workoutModel')

const createWorkout = async (req, res) => {

     const {title, reps, load} = req.body

     let emptyFields = [];

     if(!title){
        emptyFields.push('title')
     }else if(!reps){
        emptyFields.push('reps')
     }else if(!load){
        emptyFields.push('load')
     }

     if(emptyFields.length > 0){
        return res.status(400).json({error:"Please fill out all the fields...!", emptyFields})
     }

    try{
        const newWorkout = await workout.create({title, reps, load});
        res.status(200).json({newWorkout , message:"Workout created successfully.."})
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
}

const getallWorkouts = async (req, res) => {

    try{
        const workouts = await workout.find({}).sort({createdAt:-1});

        if(!workouts){
            return res.status(400).json({error:"No workouts found"});
        }

        res.status(200).json({workouts, message:"Workout fetched scucessfully.."})
    }
    catch(error){
        res.status(404).json({error:error.message})
    }
}

const singleWorkout = async (req, res) =>{
     const {id} = req.params;

          if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error:"No workout found..."})
        }

    try{
        const singleWorkout = await workout.findById(id);
      
        if(!singleWorkout){
            return res.status(400).json({error: "No workout found"});
        }
        res.status(200).json({singleWorkout, message:"Workout fetched successfully.."})
    }
    catch(error){
        res.status(404).json({error:error.message})
    }
}

const deleteWorkout = async (req, res)=>{
     const {id} = req.params;

      if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error:"No workout found..."})
        }

    try{
        const deletedWorkout = await workout.findByIdAndDelete(id);

        if(!deletedWorkout){
            return res.status(400).json({error: "No workout found"});
        }
        res.status(200).json({deletedWorkout , message:"Workout deleted successfully.."})
    }catch(error){
        res.status(404).json({error:error,message})
    }
}

const updateWorkout = async (req,res)=>{
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error:"No workout found..."})
        }

    try{
        const updatedWorkout = await workout.findByIdAndUpdate(id,{...req.body},{new:true});

        if(!updatedWorkout){
            return res.status(400).json({error: "No Workout found"});
        }
        res.status(200).json({updatedWorkout, message:"Workout updated successfully.."})
    }catch(error){
        res.status(404).json({error:error.message})
    }
}

module.exports = {  
     createWorkout,
     getallWorkouts,
     singleWorkout,
     deleteWorkout,
     updateWorkout,
    }