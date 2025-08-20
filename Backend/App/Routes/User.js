import express from 'express';
import {createdUser} from '../Controllers/User.js'
const userRoutes = express.Router();
userRoutes.post('/add',createdUser)
export default userRoutes