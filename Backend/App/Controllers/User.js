import User from "../Modules/User.js";
const createdUser=async(req,res)=>{
    const {name,email,department } = req.body;
    if(!name,!email,!department){
        res.send("All field are require")
    }
         const user= new User({
            name,
            email,
          department
        })
         await user.save();
        res.status(201).json({
            message:"User registered successfully",
            user
        })

}
export{createdUser}