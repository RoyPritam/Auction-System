import React, { useState } from "react";
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import { UserState } from "../Context/Context";
import { CgProfile } from 'react-icons/cg';
const Profile = () =>{
    const{user}=UserState();
    //setProfilelist(props)
    
    return<>
        <div className="w-100">
            <div className="card shadow-lg m-5 mx-auto w-50 p-5">
                <div className="text-center">
                    <CgProfile style={{height:"100", width:"100"}}/>
                </div>
                <div>
                    <div><h5>Name: {user.customer_Name}</h5></div>
                    <div><h5>Address: {user.address}</h5></div>
                    <div><h5>Email: {user.customer_Email}</h5></div>
                    <div><h5>Contact Number: {user.customer_Phone}</h5></div>
                </div>
            </div>
        </div>
    </>
}

export default Profile