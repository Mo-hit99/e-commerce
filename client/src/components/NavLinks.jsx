import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

export default function NavLinks({
  admin,
  logo,
  products,
  signIn,
  Addcart,
}) {
  const carts = useSelector((store) => store.cart);
  const isUserSignedIn = !!localStorage.getItem("token");

  const UserEmail = localStorage.getItem("email");
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem('email')
    navigate("/signIn");
  };

  return (
    <header className="container">
      <nav className="nav-container">
      <NavLink className="nav-link-text-logo" to="/">
                    {logo}
      </NavLink>
        <div className="nav-link01">
          <ul>
            {isUserSignedIn && UserEmail === "admin@gmail.com" ? (
              <>
                <li>
                  <NavLink className="nav-link-text" to="/Admin">
                    {admin}
                  </NavLink>
                </li>
                <li>
                  <NavLink className="nav-link-text" to="/products">
                    {products}
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink className="nav-link-text" to="/products">
                    {products}
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
        <div className="navLink">
          <ul>
            {isUserSignedIn && UserEmail ? (
              <>
                <ul>
                  <p>{UserEmail}</p>
                  <li>
                    <button className="signOut" onClick={handleSignOut}>
                      Sign Out
                    </button>
                  </li>
                <li>
                  <NavLink className="nav-link-text" to="/Addcart">
                    {Addcart}
                    <small className="nav-add-cart-items">
                      {carts.cartTotalQuantity === 0
                        ? false
                        : carts.cartTotalQuantity}
                    </small>
                  </NavLink>
                </li>
                </ul>
              </>
            ) : (
              <>
                <li>
                  <NavLink className="nav-link-text" to="/signIn">
                    {signIn}
                  </NavLink>
                  </li>
                  
                <li>
                  <NavLink className="nav-link-text" to="/Addcart">
                    {Addcart}
                    <small className="nav-add-cart-items">
                      {carts.cartTotalQuantity === 0
                        ? false
                        : carts.cartTotalQuantity}
                    </small>
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}
