import { ProductSchema } from "../models/Product.js";

// get all data
export const getAllProductData = async (req, res) => {
  try {

    const search = req.query.search || "";
    const category = req.query.category || "";
    const brand = req.query.brand || "";
    const page = req.query.page || 1;
    const pageSize = req.query.pageSize || 10;
    const query = {
      brand: {
        $regex: search,
        $options: "i",
      },
    };

     if(category){
        query.category=category;
     }
     if(brand){
        query.brand=brand;
     }

    const skip = (page - 1) * pageSize;
    const totalCount = await ProductSchema.countDocuments(query);

    let queryData = await ProductSchema.find(query)
      .limit(pageSize)
      .skip(skip);
    const pageCount = Math.ceil(totalCount/pageSize);
    res.status(200).json({
      pagination: {
        page,
        totalCount,
        pageCount,
        pageSize
      },
      queryData,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get by Id
export const getProductDataById = async (req, res) => {
  try {
    const { id } = req.params;
    const getById = await ProductSchema.findById({ _id: id });
    res.status(200).json(getById);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//create product data
export const createProductData = async (req, res) => {
  try {
    const { brand, title, price, description, category, rate, count } =
      req.body;
    const {filename } = req.file;
    const productImg = new ProductSchema({
      brand,
      title,
      price,
      description,
      category,
      rate,
      count,
      filename,
    });
    await productImg.save();
    res.send("file stored in data");
    console.log("file has been stored in database");
  } catch (error) {
    console.log("file has failed to stored in database", {
      error: error,
    });
    res.status(500).json(error)
  }
};

// Update the ProductData by Id
export const UpdateProductData = async (req, res) => {
  try {
    const { id } = req.params;
    const { brand, title, price, description, category, rate, count } =
      req.body;
    const {filename} = req.file;

    // Use the $set operator to update the document
    const updateProduct = await ProductSchema.findOneAndUpdate(
      { _id: id },
      {
        brand,
        title,
        price,
        description,
        category,
        rate,
        count,
        filename,
      },
      { new: true }
    );
    if (!updateProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json("Product detail updated");
    console.log("Product detail updated");
  } catch (error) {
    res.status(400).json({ error: error });
    console.log("Product detail failed" , error);
  }
};

// Delete ProductData by Id
export const DeleteProductData = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteProductData = await ProductSchema.findOneAndDelete({ _id: id });
    res.status(200).json(deleteProductData);
    console.log("product is Delete");
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log("product is not Delete");
  }
};

// review product section

// export const productReview = async (req,res)=>{
//   try {
//     const {comment,rating} = req.body;
//     const id = req.params.id;
//     const product = await ProductSchema.findById(id);
//     const alreadyReviewed =  product.reviews.find((r)=> { 
//       return r.user.toString() === req.user._id.toString()
//     });
  
//     if(alreadyReviewed){
//       return res.status(400).send({success:false,message:"product already review"})
//     }
//     const review = {
//       name:req.user.name,
//       rating:Number(rating),
//       comment,
//       user:req.user._id,
//     }
//     product.reviews.push(review);
    
//     product.numReviews = product.reviews.length;
//     product.rating = product.reviews.reduce((acc,item)=> item.rating + acc , 0)/product.reviews.length;
    
//     await product.save();
//     res.status(200).send({success:true,message:"Review Added!"});
//   } catch (error) {
//     console.log(error)
//     // cast error ||  OBJECT ID
//     if (error.name === "CastError") {
//       return res.status(500).send({
//         success: false,
//         message: "Invalid Id",
//       });
//     }
//     res.status(500).send({
//       success: false,
//       message: "Error In Review Comment API",
//       error,
//     });
//   }
  

// }


export const productReview = async (req, res) => {
  try {
    const { comment, rating } = req.body;
    const productId = req.params.id;

    //Validate input
    if (!comment || !rating) {
      return res.status(400).send({
        success: false,
        message: "Comment and rating are required",
      });
    }

    // if (rating < 1 || rating > 5) {
    //   return res.status(400).send({
    //     success: false,
    //     message: "Rating must be between 1 and 5",
    //   });
    // }

    const product = await ProductSchema.findById(productId);
    
    if (!product) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }

    // if (alreadyReviewed) {
    //   return res.status(400).send({ success: false, message: "Product already reviewed" });
    // }

    const review = {
      rating: Number(rating),
      comment,
    };

    product.reviews.push(review);
    
    product.numReviews = product.reviews.length;
    product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

    await product.save();
    console.log("Review added!")
    res.status(200).send({ success: true, message: "Review added!" });
  } catch (error) {
    console.error(error);
    
    // Handle specific error types
    if (error.name === "CastError") {
      return res.status(400).send({
        success: false,
        message: "Invalid product ID",
      });
    }

    res.status(500).send({
      success: false,
      message: "Error in Review Comment API",
      error: error.message,
    });
  }
};
