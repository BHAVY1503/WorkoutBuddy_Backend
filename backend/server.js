const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

//middlewere
app.use(express.json());
app.use((req, res, next)=>{
    console.log(req.path, req.method)
    next()
})


//Routes
app.get('/',(req,res)=>{
    res.json({msg:"Welcome to the backend server"})
})

const workoutsRoutes = require('./routes/workout')
app.use('/api/workouts', workoutsRoutes)

const userRoutes = require('./routes/user')
app.use('/api/user', userRoutes)


//db connection
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
 app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT} & connected to db`)
})
})
.catch((err)=>{console.log(err)})



const PORT = process.env.PORT;

// app.listen(PORT,()=>{
//     console.log(`Server is running on http://localhost:${PORT}`)
// })