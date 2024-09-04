import mongoose from "mongoose";

const Product_DB = mongoose.Schema({
    brand:{type:String,required:true},
    title:{type:String,required:true},
    price:{type:String,required:true},
    description:{type:String,required:true},
    category:{type:String,required:true},
    rate:{type:String,required:true},
    count:{type:String,required:true},
    path:{type:String,required:true},
    filename:{type:String,required:true}
},{timestamps:true});

const ProductSchema = mongoose.model('productData',Product_DB);
export{ProductSchema};

