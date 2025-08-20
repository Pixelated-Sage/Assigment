import AllowanceRequest from "../Modules/AllowanceRequest .js";
import User from "../Modules/User.js";
import { sendNewRequestEmail} from './mailer.js'
const createRequest=async(req,res)=>{
     try {
    const { userId, amount, description } = req.body;

  
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

   
    const newRequest = new AllowanceRequest({
      user: userId,
      amount,
      description,
    });

    try {
        await sendNewRequestEmail({
            employeeName: user.name

        })
    } catch (error) {
        console.log("invalid credentials", error.message)
    }

    
    await newRequest.save();

    res.status(201).json({
      message: "Allowance request created successfully",
      request: newRequest,
    });
  } catch (error) {
    console.error("Error creating request:", error);
    res.status(500).json({ message: "Server error" });
  }
};


 const getRequests = async (req, res) => {
  try {
    const requests = await AllowanceRequest.find() 

    res.status(200).json(requests);
  } catch (error) {
    console.error("Error fetching requests:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateRequest=async(req,res)=>{
try{
    const {id}=req.headers;
     const { status } = req.body; 
  if (!id) {
    return res.status(400).json({ message: "ID is required" });
  }
    const updatedRequest = await AllowanceRequest.findByIdAndUpdate(
      id,
      { status },{ new: true })
    res.status(200).json({
    message: "status updated successfully",
    updatedRequest });
}
catch (err){
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
}
const deleteUser=async(req,res)=>{
  try{
    await User.findByIdAndDelete(req.params.id);
    res.json({ message:'User deletion done'});
  } catch(error) {
    res.status(500).json({ message: error.message });
}
};


export{createRequest,getRequests,updateRequest,deleteUser}