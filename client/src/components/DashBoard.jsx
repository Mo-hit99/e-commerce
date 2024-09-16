import axios from "axios";
import { useEffect, useState } from "react"

export default function DashBoard() {

  const [productData,setProductData]= useState('');
  
  useEffect(()=>{
   fetchProductData()
  },[])
  
  async function fetchProductData(){
    try {
      const response = await axios.get('http://localhost:3000/productData')
      setProductData(response.data.queryData);
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

async function deleteProduct(id){
  try {
    const response = await axios.delete(`http://localhost:3000/productData/${id}`)
    const result = await response.json()
    if(!response){
      console.log(result.error)
    }
    alert('delete product successfully')
    
} catch (error) {
  console.log({error : error.message})
}
}

return (
  <section className="dashboard-home-screen">
   <h1>DashBoard</h1>
   <div className="admin-product-container">
    {
      productData && productData?.map((item)=> (
      <div key={item._id} className="admin-product-card">
    <div className="admin-product-card-image">
      <img className="admin-product-image" src={`http://localhost:3000/productData/${item?.filename}`} alt={item.category} />
    </div>
    <div className="admin-product-brand"> {item.brand} </div>
    <div className="admin-product-title"> {item.title} </div>
    <div className="admin-product-rate">⭐{item.rate} <span className="admin-product-count"></span>({item.count})</div>
    <div className="admin-product-price"> ₹{item.price} </div>
    <div className="admin-product-category"> {item.category}
        <div className="admin-product-author">{item.createdAt}</div>
        <div className="delete-update-btn-container">
          <button className="admin-delete-btn" onClick={()=>deleteProduct(item._id)}>Delete</button>
        </div>
    </div>
    </div>
      ))
    }
    </div>
    </section>
  )
}
