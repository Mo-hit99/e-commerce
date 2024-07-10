import {useDispatch, useSelector} from 'react-redux'
import { removeToCart, subtractQuantityItems, updateQuantityItems } from "../redux/cartSlice";
export default function Addcart() {
  const cart = useSelector((state)=> state.cart);
  console.log(cart)
  const dispatch=useDispatch();
    function handleRemoveCart(cartItem){
      dispatch(removeToCart(cartItem))
    }

    function updateItems(cartItem){
     console.log(dispatch(updateQuantityItems(cartItem)))
    }

    function subtractItems(cartItem){
     console.log(dispatch(subtractQuantityItems(cartItem)))
    }
  return (
      <>
    <div className="title">
      <h1 className="title-heading">Shopping Bags <i className="fa-solid fa-tag"></i></h1>
    </div>
    <section className="shopping-cart">
    { cart.items.length === 0 ? (<div className="cart-empty"><p>Your cart is currently empty  <i className="fa-regular fa-face-rolling-eyes"></i></p></div>) :(cart.items?.map((element)=>(
      <>
      <div key={element.product.id} className="shopping-item">
        <div className="image-container-shopping">
          <img className="shopping-cart-image" src={element.product.image} alt="shoping" />
        </div>
        <div className="shopping-cart-description">
          <h1 className="shopping-cart-heading">{element.product.brand}</h1>
          <h4 className="shopping-cart-content">{element.product.description}</h4>
        </div>
        <div className="quantity-items-btn">
          <button onClick={()=> subtractItems(element.productId)} className="items-minus"><i className="fa-solid fa-minus"></i></button>
          <span className="count-items">{element.quantity}</span>
          <button onClick={()=> updateItems(element.productId)} className="items-plus"><i className="fa-solid fa-plus"></i></button>
          <div className="quantity">
            <p className='quantity-items'>Quantity<span><i className="fa-solid fa-box"></i></span></p>
          </div>
        </div>
        <div className="shopping-cart-price">
          <p className="shopping-pricing">${parseInt(element.product.price) * element.quantity}</p>
        </div>
        <div className="shopping-cart-buy-btn">
          <button onClick={()=> handleRemoveCart(element.product.id)} className="place-your-order"><i className="fa-solid fa-xmark"></i></button>
        </div>
      </div>
  </>
  )))}
  </section>
    </>
  )
}
