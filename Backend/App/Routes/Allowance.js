import express from 'express'
import {createRequest,getRequests,updateRequest,deleteUser} from '../Controllers/AllowanceRequest.js'
const AllowanceRoutes = express.Router();
AllowanceRoutes.post('/insert',createRequest)
AllowanceRoutes.get('/get',getRequests)
AllowanceRoutes.put('/update',updateRequest)
AllowanceRoutes.delete('/delete',deleteUser)
export default AllowanceRoutes