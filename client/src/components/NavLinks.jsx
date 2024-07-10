import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";



export default function NavLinks({admin,logo,home,products,signIn,Addcart}) {
  const carts = useSelector(store=>store.cart)
  return (
    <header className="container">
        <nav className="nav-container">
            <h1 className="logo">
              {logo}
              </h1>
                <div className="nav-link01">
              <ul>
                    <li><NavLink className='nav-link-text' to='/'>{home}</NavLink></li>
                    <li><NavLink className='nav-link-text' to='/products' >{products}</NavLink></li>
              </ul>
                </div>
            <div className="navLink">
                <ul>
                    <li><NavLink className='nav-link-text' to='/Admin'>{admin}</NavLink></li>
                    <li><NavLink className='nav-link-text' to='/signIn'>{signIn}</NavLink></li>
                    <li><NavLink className='nav-link-text' to='/Addcart'>{Addcart} <small className="nav-add-cart-items">{carts.cartTotalQuantity=== 0 ? false : carts.cartTotalQuantity}</small></NavLink></li>
                </ul>
            </div>
        </nav>
    </header>
  )
}
