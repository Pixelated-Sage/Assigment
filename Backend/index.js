import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './App/Routes/User.js';
import AllowanceRoutes from './App/Routes/Allowance.js'



dotenv.config();
const app = express();
app.use(express.json());

app.use('/user', userRoutes)
app.use('/user',AllowanceRoutes)
mongoose.connect(process.env.MONGO_URI )
.then(()=>{
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT, () => { 
      console.log(`Server is running on port ${process.env.PORT}`);
    });
})
.catch((err) => {
    console.error("Error connecting to MongoDB:", err);
});
app.get("/", (req, res) => {
  res.send("Hello");
});