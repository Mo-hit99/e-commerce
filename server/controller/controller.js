import { userModel } from "../models/user.js";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();



// expire date jwt
const Max_age= 3*24*60*60


// create token
const createToken = (_id)=>{
    return jwt.sign({_id},process.env.JWT_SIGNATURE,{expiresIn:Max_age*100})
}

// get all data
export const get_allData = async (req,res)=>{
    const user_data = await userModel.find()
    try {
         res.status(200).json(user_data); 
         console.log(user_data)   
    } catch (error) {
        res.status(400).json({error:error})
    }
}


// get by id data
export const getById_data =async (req,res)=>{
    const {id} = req.params;
    const User_data = await userModel.findById({_id:id})

    try {
        res.status(200).json(User_data);
        console.log(User_data)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}


// update user data
export const UserUpdateData=async (req,res)=>{
    const _id = req.params.id;
    const update_date= await userModel.findOneAndUpdate(_id,req.body);
    try {
        res.status(200).json(update_date)
        console.log(update_date);
    } catch (error) {
        res.status(400).json({error:error})
    }
}

// delete user data
export const UserDeleteDate=async (req,res)=>{
    const {id} = req.params;
    
    const delete_data=await userModel.findOneAndDelete({_id:id})
    try {
        res.status(200).json(delete_data);
        console.log(delete_data)
    } catch (error) {
        res.status(400).json({error:error})
    }
}

// signup user
export const UserCreateData=async (req,res)=>{
    const {name,email,password} = req.body;
   try {
    const user=await userModel.signup(name,email,password)
    const token = createToken(user._id)
    res.status(200).json({email,token})
   } catch (error) {
    res.status(400).json({error:error.message})
   }

}

// UserLogin

export const userLogin=async(req,res)=>{
    const {email,password} = req.body;

   try {
    const user= await userModel.login(email,password)
    const token = createToken(user._id)
    res.status(200).json({email,token})
   } catch (error) {
    res.status(400).json({error:error.message})
   }
}
