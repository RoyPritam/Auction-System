import React,{useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
const Homeadm = ()=>{
    const navigate = useNavigate()
    const[CustomerList,setCustomerList]=useState([])
    
    useEffect(() => {
        fetch("http://localhost:43608/api/Customers")
        .then(response => response.json())
        .then(json => 
            {
                //console.log(json);
                setCustomerList(json);
            })   
        },[])
    
    const deleteData=async(id)=> {
        let link ="http://localhost:43608/api/Customers/delete?id="+id
        const response = await fetch(link, {
          method: "DELETE",
        });
        fetch("http://localhost:43608/api/Customers")
        .then(response => response.json())
        .then(json => 
            {
                //console.log(json);
                setCustomerList(json);
            })   
    }

    return <>
        <div className='w-100 p-4'>
        <div className="d-flex justify-content-between"><div><h1>Dashboard</h1></div>
          <div><button className='btn btn-danger' onClick={()=>{ window.location.href='/login' }}>Logout</button></div>
          </div>
          <div><h2>Customer List</h2></div>
          <table className="table table-striped">  
                <thead className="thead-dark">
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Email</th>
                        <th>Phone</th>
                    </tr>
                </thead>
                {(CustomerList.length!=0)? 
                <tbody>
                {CustomerList.map((e)=>(
                    <tr>
                        <td>{e.customer_Id}</td>
                        <td>{e.customer_Name}</td>
                        <td>{e.address}</td>
                        <td>{e.customer_Email}</td>
                        <td>{e.customer_Phone}</td>
                        <td>
                        <a
                          className="btn btn-danger"
                          onClick={() => deleteData(e.customer_Id)}
                        >
                          Delete
                        </a>
                      </td>
                    </tr>
                
                ))}
                </tbody>
                : <div className='w-100 text-center'>No Customer Found</div>}
            </table>
            </div>         
        </>
 }

 export default Homeadm