import React,{useState, useEffect} from "react";

const Orders = ()=>{
    const[OrderList,setOrderList]=useState([])  
    useEffect(() => {
        fetch('http://localhost:43608/api/Orders')
        .then(response => response.json())
        .then(json => 
            {
                //console.log(json);
                setOrderList(json);
            })   
        },[])

    const deleteData=async(id)=> {
        let link ="http://localhost:43608/api/Orders/"+id
        const response = await fetch(link, {
            method: "DELETE",
        });
        fetch('http://localhost:43608/api/Orders')
        .then(response => response.json())
        .then(json => 
            {
                //console.log(json);
                setOrderList(json);
            }) 
    }

    return<>
    <div className='w-100 p-4'>
        <div><h2>Order List:</h2></div>
        <div>
          <table className="table table-striped">  
                <thead className="thead-dark">
                    <tr>
                        <th>Order Id</th>
                        <th>Order Amount</th>
                        <th>Order Date</th>
                        {/* <th>Product Id</th>
                        <th>Customer Id</th> */}
                    </tr>
                </thead>
                {(OrderList.length!=0)? 
                <tbody>
                {OrderList.map((e)=>(
                    <tr>
                        <td>{e.order_Id}</td>
                        <td>{e.order_Amount}</td>
                        <td>{e.order_Date}</td>
                        {/* <td>{e.product.product_Id}</td>
                        <td>{e.customer.customer_Id}</td> */}
                        <td>
                            <a
                            className="btn btn-danger"
                            onClick={() => deleteData(e.order_Id)}
                            >
                            Delete
                            </a>
                        </td>
                    </tr>
                ))}
                </tbody>
                : <div className='w-100 text-center'>No Orders Till Now</div>}
            </table>
        </div> 
        </div>        
    </>
}

export default Orders