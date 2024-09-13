
import { Outlet } from 'react-router-dom'
import './App.css'
import NavLinks from './components/NavLinks'
import Footer from './components/Footer'
function App() {

  return (
    <div className='App'>
      <NavLinks admin={'Admin'} logo={"e-commerce"} home={"Home"} products={'Products'} signIn={'SignIn'} Addcart={<i className="fa-solid fa-cart-shopping"></i>} />
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default App
