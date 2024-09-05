import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCard } from "../redux/cartSlice";
import axios from "axios";

export default function Products() {
  const [data,setData]=useState('')
  const dispatch = useDispatch();
  useEffect(()=>{
    fetchProductData()
   },[])
   
   async function fetchProductData(){
     try {
       const response = await axios.get('http://localhost:5000/productData')
       setData(response.data);
       if(!response){
         console.log("failed to fetch")
       }
       if(response.ok){
         console.log('fetch data successfully')
       }
       
   } catch (error) {
     console.log({error : error.message})
   }
 }
  return (
    <div className="productCard-container">
      {
        data
        &&
        data?.map((product)=>(
          <ProductCard key={product._id} state={product} links={`/ProductDetails/${product.id}`} image={`http://localhost:5000/productData/${product.filename}`}
          brand={product.brand}
          description={product.title}
          formattedPrice={'₹ '+ product.price}
      >
      <button onClick={()=> dispatch(addToCard({productId:product._id,quantity:1,product:product}))} title="Sign In" className="addcart-in_btn">
      <span>Add cart</span>
      <i className="fa-solid fa-cart-shopping"></i>
      </button>
    </ProductCard>
      ))}
    </div>
  )
}
