import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
  } from "react-router-dom";
  import Home from './pages/home/Home';
  import Order from './pages/Order/Order';
  import Cart from './pages/cart/Cart';
  import Dashboard from './pages/admin/dashboard/Dashboard';
  import Nopage from './pages/nopage/Nopage';
  import MyState from './context/data/myState';
  import Login from './pages/registration/Login';
  import Signup from './pages/registration/Signup';
  import AddProduct from './pages/admin/pages/AddProduct';
  import UpdateProduct from './pages/admin/pages/UpdateProduct';
  import { ToastContainer} from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  


function App() {
  return (
    <MyState>
       <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/order" element={
          <ProtectedRoute>
            <Order/>
          </ProtectedRoute>
        } />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/dashboard" element={
          <ProtectedRoutesForAdmin>
            <Dashboard/>
          </ProtectedRoutesForAdmin>
        } />
        <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/addproduct" element={
            <ProtectedRoutesForAdmin>
              <AddProduct/>
            </ProtectedRoutesForAdmin>
          } />
          <Route path="/updateproduct" element={
            <ProtectedRoutesForAdmin>
              <UpdateProduct/>
            </ProtectedRoutesForAdmin>
          } />
        <Route path="/*" element={<Nopage/>} />
      </Routes>
      <ToastContainer/>
    </Router>
    </MyState>
   
  )
}

export default App


// User

export const ProtectedRoute = ({children}) => {
  if(localStorage.getItem('user')){
    return children
  }else{
    return <Navigate to={'/login'}/>
  }
}

// admin

export const ProtectedRoutesForAdmin = ({children}) => {
  const admin = JSON.parse(localStorage.getItem('user'))
  console.log(admin.user.email)
  if (admin.user.email === 'aa@gmail.com') {
    return children
  }
  else {
    return <Navigate to='/login'/>
  }
}