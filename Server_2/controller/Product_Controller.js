import {ProductSchema } from "../Model/ProductDB.js"

// show all product data

// get all data 
export const getAllProductData=async(req,res)=>{
    try {
        const data = await ProductSchema.find();
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({error:error})
    }

}

// get by Id
export const getProductDataById=async(req,res)=>{
    try {
        const {id}= req.params;
        const getById = await ProductSchema.findById({_id:id})
        res.status(200).json(getById);
    } catch (error) {
        res.status(400).json({error:error})
    }
}
//create product data
export const createProductData = async (req,res)=>{
    try {
        const {brand,title,price,description,category,rate,count} = req.body
        const {path,filename}= req.file;
        const productImg = new ProductSchema({
            brand,
            title,
            price,
            description,
            category,
            rate,
            count,
            path,
            filename
        })
        await productImg.save();
        res.send('file stored in data')
        console.log('image has been stored in database')
    } catch (error) {
        console.log('image has failed to stored in database',{error:error})
    }
}

// Update the ProductData by Id 
export const UpdateProductData=async (req,res)=>{
    try {
        const _id = req.params.id;
        const updateProductData= await ProductSchema.findOneAndUpdate(_id,req.body);
        res.status(200).json(updateProductData)
        console.log("Product detail updated");
    } catch (error) {
        res.status(400).json({error:error})
        console.log("Product detail failed");
    }
}


// Delete ProductData by Id
export const DeleteProductData = async (req,res)=>{
    
    try {
        const {id} = req.params;
        const deleteProductData=await ProductSchema.findOneAndDelete({_id:id})
        res.status(200).json(deleteProductData);
        console.log("product is Delete")
    } catch (error) {
        res.status(400).json({error:error})
        console.log("product is not Delete")
    }
}