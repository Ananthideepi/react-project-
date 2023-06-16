import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/home';
import Footer from './components/layout/footer';
import Header from './components/layout/header';
import { ToastContainer } from "react-toastify"
import { HelmetProvider } from "react-helmet-async";
import 'react-toastify/dist/ReactToastify.css';
import Productdetails from './components/products/productdetails';
import ProductSearch from './components/products/productSearch';
import Login from './components/user/login';
import Registerform from './components/user/register';
import Profile from './components/user/profile';
import Productroutes from './components/Routes/productroutes';
import Updateprofile from './components/user/updateprofile';
import Updatepassword from './components/user/updatepassword';
import Forgetpasswoeds from './components/user/forgetpasswoed';
import Resetpassword from './components/user/resetpassword';
import Cartlayout from './components/card/cardlayout';
import Shipping from './components/card/shipping';
import Orderconfirm from './components/card/orderconfirm';
import Paymentpage from './components/card/payment';
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
// import { Card } from 'react-bootstrap';
// import store from "./store";
import {useState, useEffect } from 'react';
function App() {
  const [stripeApikey, setStripeApikey] = useState("")
  useEffect(() => {
    // store.dispatch(loadUser())
    async function getStripeApiKey() {
      const { data } = axios.get("");
      setStripeApikey(data.stripeApiKey)
    }
  })
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <div className="container container-fluid">
          <ToastContainer theme="dark" />

          <HelmetProvider>
            <Routes>
              <Route path="/search/:keyword" element={<ProductSearch />} />
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<Productdetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Registerform />} />
              <Route path="/profile" element={<Productroutes> <Profile /></Productroutes>} />
              <Route path="/profile/update/profile" element={<Productroutes> <Updateprofile /></Productroutes>} />
              <Route path="/profile/update/password" element={<Productroutes> <Updatepassword /></Productroutes>} />
              <Route path="/password/forget" element={<Forgetpasswoeds />} />
              <Route path="/password/reset/:token" element={<Resetpassword />} />
              <Route path="/cartitem" element={<Cartlayout />} />
              <Route path="/shipping" element={<Productroutes> <Shipping /></Productroutes>} />
              <Route path="/order/confirm" element={<Productroutes> <Orderconfirm /></Productroutes>} />
              <Route path="/payment" element={<Productroutes> <Elements stripe={loadStripe(stripeApikey)}>
                <Paymentpage /> </Elements> </Productroutes>} />
            </Routes>


          </HelmetProvider>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
