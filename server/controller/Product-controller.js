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
    const { path, filename } = req.file;
    const productImg = new ProductSchema({
      brand,
      title,
      price,
      description,
      category,
      rate,
      count,
      path,
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
    const { path, filename } = req.file;

    // Use the $set operator to update the document
    const updateProduct = ProductSchema.findOneAndUpdate(
      { _id: id },
      {
        brand,
        title,
        price,
        description,
        category,
        rate,
        count,
        path,
        filename,
      },
      { new: true }
    );
    await updateProduct.save();
    res.status(200).json("Product detail updated");
    console.log("Product detail updated");
  } catch (error) {
    res.status(400).json({ error: error });
    console.log("Product detail failed");
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
