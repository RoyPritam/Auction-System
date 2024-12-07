import React,{useState, useEffect} from "react";

const Categories = ()=>{
    const[CategoryList,setCategoryList]=useState([])  
    useEffect(() => {
        fetch('http://localhost:43608/api/Categories')
        .then(response => response.json())
        .then(json => 
            {
                //console.log(json);
                setCategoryList(json);
            })   
        },[])

    const deleteData=async(id)=> {
        let link ="http://localhost:43608/api/Categories/"+id
        const response = await fetch(link, {
            method: "DELETE",
        });
        fetch('http://localhost:43608/api/Categories')
        .then(response => response.json())
        .then(json => 
            {
                //console.log(json);
                setCategoryList(json);
            })   
    }

    return<>
    <div className='w-100 p-4'>
        <div><h2>Category List:</h2></div>
        <div>
          <table className="table table-striped">  
                <thead className="thead-dark">
                    <tr>
                        <th>Category Id</th>
                        <th>Category Name</th>
                        {/* <th>Product Id</th>
                        <th>Customer Id</th> */}
                    </tr>
                </thead>
                {(CategoryList.length!=0)? 
                <tbody>
                {CategoryList.map((e)=>(
                    <tr>
                        <td>{e.category_Id}</td>
                        <td>{e.category_Name}</td>
                        <td>
                            <a
                            className="btn btn-danger"
                            onClick={() => deleteData(e.category_Id)}
                            >
                            Delete
                            </a>
                        </td>
                    </tr>
                ))}
                </tbody>
                : <div className='w-100 text-center'>No Categories Found</div>}
            </table>
        </div> 
        </div>        
    </>
}

export default Categories