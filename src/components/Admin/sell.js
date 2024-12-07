import { Grid, Select } from "@mui/material";
import { TextField, FormControlLabel, Checkbox, Button, Box, Alert } from '@mui/material';
import { UserState } from "../Context/Context";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import FileUpload from "react-material-file-upload";

const Sell = () => {
  const {user}=UserState()
  const [files, setFiles]= useState()
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: ""
  })
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      name: data.get('name'),
      category: data.get('category'),
      desc: data.get('desc'),
      bprice: data.get('bprice'),
      sdate: data.get('sdate'),
      stime: data.get('stime'),
      enddate: data.get('enddate'),
      endtime: data.get('endtime'),
      tc: data.get('tc'),
    }
    const dbdata = {
      product_Id: 0,
      category_Name: actualData.category,
      product_Name: actualData.name,
      product_Desc: actualData.desc,
      base_Price: actualData.bprice,
      current_Price: actualData.bprice,
      start_Date: actualData.sdate,
      start_Time: actualData.stime,
      end_Date: actualData.enddate,
      end_Time: actualData.endtime
    }

    if (actualData.name && actualData.category && actualData.desc && actualData.bprice && actualData.sdate && actualData.stime && actualData.enddate && actualData.endtime && actualData.tc !== null) {
      if ((actualData.sdate+actualData.stime) !== (actualData.enddate+actualData.endtime)) {
        
        fetch('http://localhost:43608/api/Products/', {
          method: 'POST', // or 'PUT'
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dbdata)
        })
        .then(req => {
          if(req.status !=201){
            setError({ status: true, msg: "Error", type: 'error' })
          }
          else{
            setError({ status: true, msg: "Product Added Successful", type: 'success' })
            document.getElementById('product-form').reset()
             navigate('/admindashboard')
          }
        });
      } else {
        setError({ status: true, msg: "Start date & time should not match with end date & time", type: 'error' })
      }
    } else {
      setError({ status: true, msg: "All Fields are Required", type: 'error' })
    }
  }

  return <>
    <Grid container justifyContent='center'>
      <Grid item sm={10}>
        {/* <h1>Sell Page</h1>
        <hr /> */}
        <h4>Add Product</h4>
        {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ''}
        <Box component='form' noValidate sx={{ mt: 1 }} id='product-form' onSubmit={handleSubmit}>
          <TextField margin='normal' required fullWidth id='name' name='name' label=' Product Name' />
          <TextField margin='normal' multiline rows={4} required fullWidth id='desc' name='desc' label='Prodct Description' />
          <TextField margin='normal' required fullWidth id='category' name='category' label='Category' />
          <TextField margin='normal' required id='bprice' name='bprice' label='Base Price' type="number" InputLabelProps={{shrink: true, }} />
          <TextField margin='normal' required fullWidth id='sdate' name='sdate' helperText='Start Date' type="date" variant="filled"/>
          <TextField margin='normal' required fullWidth id='stime' name='stime' helperText='Start Time' type="time" variant="filled"/>
          <TextField margin='normal' required fullWidth id='enddate' name='enddate' helperText='End Date'  type="date" variant="filled"/>
          <TextField margin='normal' required fullWidth id='endtime' name='endtime' helperText='End Time' type="time" variant="filled"/>
          <FileUpload value={files} onChange={setFiles} />
          <FormControlLabel control={<Checkbox value="agree" color="primary" name="tc" id="tc" />} label="I agree to terms and conditions." />
          <Box textAlign='center'>
            <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2, px: 5 }} >Add Product</Button>
          </Box>
          {/* {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ''} */}
        </Box>
          
      </Grid>
    </Grid>
  </>;
};

export default Sell;
