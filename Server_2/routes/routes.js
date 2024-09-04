import express from "express";
import {createProductData,DeleteProductData, getAllProductData, getProductDataById, UpdateProductData } from "../controller/Product_Controller.js";
import upload from "../Image_multer/image_multer.js";


export const route = express.Router()


// product routes

// get data
route.get('/productData',getAllProductData)

// get by id
route.get('/productData/:id',getProductDataById)

// create data
route.post('/productData',upload.single('image'),createProductData)

// update data
route.patch('/productData/:id',UpdateProductData)

// delete data
route.delete('/productData/:id',DeleteProductData)
