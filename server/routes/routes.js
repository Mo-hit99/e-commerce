import express from "express";
import dotenv from "dotenv";
import {
  get_allData,
  getById_data,
  googleLogin,
  UserCreateData,
  UserDeleteDate,
  userForgotPassword,
  userLogin,
  userRestPassword,
  UserUpdateData,
  verificationOtp,
} from "../controller/controller.js";

dotenv.config();

export const route = express.Router();

// get all user data
route.get("/", get_allData);

// get user data by Id
route.get("/:id", getById_data);

// update user data
route.patch("/:id", UserUpdateData);

// delete user data
route.delete("/:id", UserDeleteDate);

// create user data register
route.post("/signup", UserCreateData);

// user login
route.post("/login", userLogin);

// verification otp
route.post('/verification-Otp',verificationOtp)
// forgot-password

route.post("/forgot-password", userForgotPassword);

// rest-password
route.post("/reset-password/:token", userRestPassword);

// google login
route.get("/auth/google", googleLogin);
