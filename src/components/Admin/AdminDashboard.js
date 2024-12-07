import React,{useState,useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { UserState } from "../Context/Context";
import Sidebar from '../Sidebar'
import ChangePassword from "../User/ChangePassword";
import Homeadm from "./AdminHome";
import Orders from "./Ordersview";
import Categories from "./Categoriesview";
import Addcategory from "./Addcategory";
import Sell from "./sell";
import Products from "./Productsview";

const AdminDashboard = () => {
  
  const {sidebarVal} =UserState()
  
  const Sbitems = ['Home','Add Product','Product List','Order List']

  return <>
  <div className="d-flex">
    <div className='px-1 p-2 bg-dark text-center' style={{height:'105vh', width:'5% !important'}}>
        <Sidebar Sbitems={Sbitems}/>
    </div>
    {(sidebarVal==='Home')?
      <Homeadm/>:
      ((sidebarVal==='Add Product')?
        <Sell/>:
        ((sidebarVal==='Product List')?
        <Products/> :
        (sidebarVal==='Order List')?
        <Orders/> :sidebarVal))}    
  </div>
  </>;
};

export default AdminDashboard;
