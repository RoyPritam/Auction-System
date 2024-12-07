import { Grid, inputClasses } from "@mui/material";
import { useState, useEffect } from "react";
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import { UserState } from "../Context/Context";
import Pic1 from '../../images/pic1.jpg'


const BuynBid = () => {
  const {user}=UserState();
  const [ProductList, setProductList]=useState([]);
  //const [CurrentBid, setCurrentBid]=useState(0);
  //console.log(currentTime)
  //yyyy-mm-ddThh:mm:ss

  let currentTime = new Date()
  let mon = currentTime.getMonth()+1
    let cDate = currentTime.getFullYear()+'-0'+mon+'-'+currentTime.getDate() 
    let hrs = parseInt(currentTime.getHours())
    let cTime = ''
    // console.log('hrs = '+hrs>9)
    if(hrs>9){
      cTime = currentTime.getHours() +':'+ currentTime.getMinutes()+':00.000'    }
    else{
      cTime = '0'+currentTime.getHours() +':'+ currentTime.getMinutes()+':00.000'
    }
    let current = cDate+'T'+cTime+'Z'
    
  const Increment = async(pid,cn,pn,pd,bp,cp,sd,st,ed,et)=>{
    // let currentTime = new Date()
    // let cDate = currentTime.getFullYear()+'-0'+currentTime.getMonth()+'-'+currentTime.getDate() 
    // let cTime = currentTime.getHours() +':'+ currentTime.getMinutes()//+':'+currentTime.getSeconds()+'.'+currentTime.getMilliseconds()
    
    let start = sd+'T'+st+':00.000Z'
    let end = ed+'T'+et+':00.000Z'

    // console.log(parseInt(Date.parse(current))>parseInt(Date.parse(end)))
    // console.log(Date.parse(start))
    // console.log(start)
    // console.log(Date.parse(current))
    // console.log(current)
    // console.log(Date.parse(end))
    // console.log(end)

    console.log(Date.parse(cTime)>Date.parse(et))
    if ((Date.parse(start)<=Date.parse(current)) && (Date.parse(current)<Date.parse(end))){
        const actualdata = {
            product_Id: pid,
            category_Name: cn,
            product_Name: pn,
            product_Desc: pd,
            base_Price: bp,
            current_Price: cp+10,
            start_Date: sd,
            start_Time: st,
            end_Date: ed,
            end_Time: et,
            customerId: user.customer_Id
          }
          //console.log(actualdata)
          let link = 'http://localhost:43608/api/Products/'+pid
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
          //console.log("Hello")
          const dbdata = {
              product_Id: 0,
              category_Name: cn,
              product_Name: pn,
              product_Desc: pd,
              base_Price: bp,
              current_Price: cp+10,
              start_Date: sd,
              start_Time: st,
              end_Date: ed,
              end_Time: et,
              customerId: user.customer_Id
          }
          //link = 'http://localhost:43608/api/Products'        
          fetch('http://localhost:43608/api/Products', 
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              }, 
              body: JSON.stringify(dbdata)
            })
            .then(response => response.text())
            .then(json =>{
              //console.log(JSON.stringify(actualdata))
              console.log(json)
            })
            fetch('http://localhost:43608/api/Products')
              .then(response => response.json())
              .then(json => 
                  {
                      //console.log(json);
                      setProductList(json);
                  }) 
    }
    else if((Date.parse(current)>Date.parse(end))){
        window.alert('Bidding Over for this product')
    }
    else {
        window.alert('Bidding Not Yet Started! Stay tuned!')
    }
    
  }
  useEffect(async() => {
    await fetch('http://localhost:43608/api/Products')
    .then(response => response.json())
    .then(json => 
        {
            setProductList(json);
            // console.log(json)
        })   
    // ProductList.map((e)=>(
    //     console.log((Date.parse(current)>=Date.parse(e.end_Date+'T'+e.end_Time)))
    //     ((Date.parse(current)>=Date.parse(e.end_Date+'T'+e.end_Time)))?
        
    //     fetch('http://localhost:43608/api/Orders',
    //     {
    //         method: 'POST',
    //         headers: {
    //           'Content-Type': 'application/json'
    //         },
    //     body: JSON.stringify({
    //         order_Id: 0,
    //         order_Amount: e.current_Price,
    //         order_Date: current,
    //         productId: e.productId,
    //         customerId: e.customerId
    //         })
    //     }).then(req => req.json())
    //     .then(json =>{
    //         console.log(json)
    //     }
    //     )
    //     :''
    // ))
    },[])
    
  return <>
    <Grid container justifyContent='center' style={{ marginTop: '40px' }}>
      <Grid item sm={10} >
        <h1>Buy & Bid</h1>
        <hr />
        <p></p>
        <div className="row" style={{fontFamily: 'Rubik Moonrocks'}}>
        {ProductList.map((key)=>(
            <div className="card col-lg-5 mx-4 m-3" style={{height:'75vh'}}>
            <img className="card-img-top pt-2" src={Pic1} alt="Card image cap" style={{height:'50vh'}}/>
            <div className="card-body">
              <h5 className="card-title text-center">{key.product_Name}</h5>
              <div className="d-flex justify-content-around">
              <div><h6 className="card-title">Category: {key.category_Name}</h6></div>
              <div><h6 className="card-title">End Time: {key.end_Time}</h6></div>
              </div>
              <div className="d-flex justify-content-around">
              <div><h6 className="card-title">Base Price: {key.base_Price}</h6></div>
              <div><h6 className="card-title">Current Bid: {key.current_Price}</h6></div>
              </div> 
              <div className="d-flex justify-content-around">
              <button className="btn btn-primary" id="readmore" data-bs-toggle="modal" data-bs-target="#readMoreModal">Description</button>
              {(user==null)?
              <button className="btn btn-warning mx-3" 
              onClick={()=>window.alert('Login to gain full access')}>Bid</button>:
              <button className="btn btn-warning mx-3" 
                    onClick={(e)=>{
                      Increment(key.product_Id,key.category_Name,key.product_Name,key.product_Desc,key.base_Price,key.current_Price,key.start_Date,key.start_Time,key.end_Date,key.end_Time)}}>Bid</button>}
              </div>
            </div>
            <div id="modalreadmore" className="">
                    <div className="modal fade" id="readMoreModal" tabIndex="-1" ariaLabelledby="exampleModalLabel" ariaHidden="true">
                        <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                            <div>
                                {/* <div><h6 className="" id="modalh6">PRODUCT FAMILY : </h6></div> */}
                                <div><h5 className="modal-title" id="modalh5">Product Name: {key.product_Name}</h5></div>
                            </div>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <p className="card-text">
                                    {key.product_Desc}
                                </p>
                            </div>
                            <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
          </div>
            )
        )}
        </div>
      </Grid>
    </Grid>
  </>;
};

export default BuynBid;
