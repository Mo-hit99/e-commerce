import { useSelector } from "react-redux";
import { NavLink, useNavigate} from "react-router-dom";

export default function NavLinks({
  admin,
  logo,
  home,
  products,
  signIn,
  Addcart,
}) {
  const carts = useSelector((store) => store.cart);
  const isUserSignedIn = !!localStorage.getItem("token");

  const UserEmail = localStorage.getItem('email')
  const navigate = useNavigate(); 


  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/signIn");
  };

  return (
    <header className="container">
      <nav className="nav-container">
        <h1 className="logo">{logo}</h1>
        <div className="nav-link01">
          <ul>
            <li>
              <NavLink className="nav-link-text" to="/">
                {home}
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link-text" to="/products">
                {products}
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="navLink">
          <ul>
            {isUserSignedIn && UserEmail? (
              <>
                <ul>
                  <p>{UserEmail}</p>
                  <li>
                    <button className="signOut" onClick={handleSignOut}>
                      Sign Out
                    </button>
                  </li>
                </ul>
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
            ) : (
              <>
                <li>
                  <NavLink className="nav-link-text" to="/signIn">
                    {signIn}
                  </NavLink>
                </li>
              </>
            )}
                <li>
                  <NavLink className="nav-link-text" to="/Admin">
                    {admin}
                  </NavLink>
                </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
