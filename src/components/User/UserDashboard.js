import React,{useState,useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import ChangePassword from "./ChangePassword";
import Sidebar from '../Sidebar'
import Home from "./UserHome";
import { UserState } from "../Context/Context";
import Profile from "../Auth/Profile";

const UserDashboard = () => {
  const {user, usertype, sidebarVal} =UserState()
  
  const Sbitems = ['Home','Profile','Change Password']
  //console.log(user)
  //console.log(usertype)
  return <>
  <div className="d-flex">
    <div className='px-1 p-2 bg-dark text-center' style={{height:'105vh', width:'5% !important'}}>
        <Sidebar Sbitems={Sbitems}/>
    </div>
    {(sidebarVal==='Home')?
      <Home/>:
      ((sidebarVal==='Profile')?
        <Profile/>:
        ((sidebarVal==='Change Password')?
        <ChangePassword/> :sidebarVal))}    
  </div>
  </>;
};

export default UserDashboard;