import React,{useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { UserState } from "../Context/Context";
const Home= ()=>{
    const {user,setsidebarVal}=UserState();
   
    const navigate = useNavigate();
    //const[OrderList,setOrderList]=useState({order_Id: '', order_Amount: '', order_Date: '', productId: '', customerId:''})  
    const[OrderList,setOrderList]=useState([])
    let link = ''
    // useEffect( 
        const abc = async() => {
                if(user==null){
                    link = 'http://localhost:43608/api/Orders/0'
                }
                else{
                    link = 'http://localhost:43608/api/Orders/'+user.customer_Id
                    await fetch(link)
                    .then(response => response.json())
                    .then(json => 
                        {
                            if(json.status!=404){
                                setOrderList(json)
                            }
                            else{
                                setOrderList([])
                            }
                        })   
                }
            }
            useEffect(()=>(
                abc()
            ),[])
            // ,[])    
    return<>
    <div className='w-100 p-4'>
    <div className="d-flex justify-content-between"><div><h1>Dashboard</h1></div>
          <div><button className='btn btn-danger' onClick={()=>{window.location.href='/login'}}>Logout</button></div>
          </div>
        <div><h2>Order List:</h2></div>
        <div>
        {(OrderList==[])? <div className='w-100 text-center'>No Orders Till Now</div>:
          <table className="table table-striped">  
                <thead className="thead-dark">
                    <tr>
                        <th>Order Id</th>
                        <th>Order Amount</th>
                        <th>Order Date</th>
                        <th>Product Id</th>
                        {/* <th>Customer Id</th> */}
                    </tr>
                </thead>
                <tbody> 
                {OrderList.map((e)=>(
                    <tr>
                        <td>{e.order_Id}</td>
                        <td>{e.order_Amount}</td>
                        <td>{e.order_Date}</td>
                        <td>{e.productId}</td>
                    </tr>
                ))}
                </tbody>
            </table>
                }
        </div> 
        </div>        
    </>
}

export default Home;