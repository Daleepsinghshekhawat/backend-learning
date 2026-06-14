import { useState } from 'react'
import Home from './Home'
import { BrowserRouter , Routes,Route } from 'react-router-dom'

import Header from './Header';
import Viewbyid from './Viewbyid'
import Viewbyname from "./Viewbyname";
import Viewbycategory from './Viewbycategory'

import Newproductbrand from "./Newproductbrand";
import Discountcategory from "./Discountcategory";
import Categorybrand from "./Categorybrand"
import Instockbrand from "./Instockbrand"
import Ratingdiscount from "./Ratingdiscount";


import Form from "./Form";
import Users from "./Users";
import UserInfo from "./UserInfo";
import UpdateUsers from "./UpdateUsers";
import Deleteuser from './Deleteuser';
import Viewbybrand from './Viewbybrand';



import Bmi from "./Bmi";
import ActiveUsers from "./ActiveUsers";
import Deleteduserbmi from './Deleteduserbmi';
import Modify from './Modify';
import ViewBmi from './ViewBmi';



import './App.css'

function App() {
  

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/viewbyid/:id" element={<Viewbyid />} />
        <Route path="/viewbyname/:name" element={<Viewbyname />} />
        <Route path="/viewbycategory/:category" element={<Viewbycategory />} />
        <Route path="/form" element={<Form />} />
        <Route path="/users" element={<Users />} />
        <Route path="/userinfo/:id" element={<UserInfo />} />
        <Route path="/updateusers/:id" element={<UpdateUsers />} />
        <Route path="/deleteuser/:id" element={<Deleteuser />} />
        <Route path="/viewbybrand/:brand" element={<Viewbybrand />} />

        <Route path="/ratingdiscount" element={<Ratingdiscount />} />

        <Route path="/instockbrand" element={<Instockbrand />} />

        <Route
          path="/categorybrand/:brand/:category"
          element={<Categorybrand />}
        />

        <Route path="/discountcategory" element={<Discountcategory />} />

        <Route path="/newproductbrand" element={<Newproductbrand />} />


        

        <Route path="/bmi" element={<Bmi />} />

        <Route path="/activeusers/" element={<ActiveUsers />} />

        <Route path="/viewbmi/:id" element={<ViewBmi />} />

        <Route path="/modify/:id" element={<Modify />} />

        <Route path="/deleteduserbmi/" element={<Deleteduserbmi />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
