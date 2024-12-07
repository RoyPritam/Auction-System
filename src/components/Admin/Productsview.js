import React,{useState, useEffect} from "react";

const Products =() =>{
    const [ProductList, setProductList]=useState([]);
    useEffect(() => {
        fetch('http://localhost:43608/api/Products')
        .then(response => response.json())
        .then(json => 
            {
                setProductList(json);
                // console.log(json)
            })   
        },[])
        const deleteData=async(id)=> {
            let link ="http://localhost:43608/api/Products/"+id
            const response = await fetch(link, {
                method: "DELETE",
            });
            fetch('http://localhost:43608/api/Products')
            .then(response => response.json())
            .then(json => 
                {
                    //console.log(json);
                    setProductList(json);
                }) 
            }
    return<>
    <div className='w-100 p-4'>
        <div><h2>Product List:</h2></div>
        <div>
            <table className="table table-striped">  
                <thead className="thead-dark">
                    <tr>
                        <th>Product Id</th>
                        <th>Product Name</th>
                        <th>Category Name</th>
                        <th>Base Price</th>
                        {/* <th>Product Id</th>
                        <th>Customer Id</th> */}
                    </tr>
                </thead>
                {(ProductList.length!=0)? 
                <tbody>
                {ProductList.map((e)=>(
                    <tr>
                        <td>{e.product_Id}</td>
                        <td>{e.product_Name}</td>
                        <td>{e.category_Name}</td>
                        <td>{e.base_Price}</td>
                        <td>
                            <a
                            className="btn btn-danger"
                            onClick={() => deleteData(e.product_Id)}
                            >
                            Delete
                            </a>
                        </td>
                    </tr>
                ))}
                </tbody>
                : <div className='w-100 text-center'>No Product Found</div>}
            </table>
        </div> 
        </div>        
    </>
}

export default Products;