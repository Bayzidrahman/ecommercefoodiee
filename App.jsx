import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import { Route, Routes } from 'react-router'
import Home from './components/Home/home'
import Products from './components/Products/Products'
import Product from './components/Product/Product'
import Login from './components/Authentication/Login/Login'
import Registration from './components/Authentication/Registration/Registration'
import Cart from './components/Cart/Cart'
import PlaceOrder from './components/PlaceOrder/PlaceOrder'
import About from './components/About/About'
import Contact from './components/Contact/Contact'
import Messages from './components/Messages/Messages'
import { CartProvider } from 'react-use-cart'
import ProductDetails from './components/ProductDetails/ProductDetails'



const App = () => {
  return (
    <CartProvider>
    <div className="flex flex-col min-h-screen">
     <Navbar/>
     <main className="flex-grow">
     <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='home' element={<Home/>}></Route>
      <Route path='products' element={<Products/>}></Route>
      <Route path='/product' element={<Product/>}></Route>
      <Route path='products/:productId' element={<ProductDetails/> }></Route>
      <Route path='placeOrder' element={<PlaceOrder/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/cart' element={<Cart/>}></Route>
      <Route path='/registration' element={<Registration/>}></Route>
      <Route path='/about' element={<About/>}></Route>
      <Route path='/contact' element={<Contact/>}></Route>
      <Route path='/messages' element={<Messages/>}></Route>
     </Routes>
     </main>
     <Footer/>
    </div>
    </CartProvider>
  )
}

export default App