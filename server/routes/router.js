import express from "express";
import {createProductData,DeleteProductData, getAllProductData, getProductDataById, UpdateProductData } from "../controller/Product-controller.js"
import upload from "../Image_multer/image_multer.js";


export const router = express.Router()


// product routes

// get data
router.get('/productData',getAllProductData)

// get by id
router.get('/productData/:id',getProductDataById)

// create data
router.post('/productData',upload.single('image'),createProductData)

// update data
router.put('/productData/:id',upload.single('image'),UpdateProductData)

// delete data
router.delete('/productData/:id',DeleteProductData)

