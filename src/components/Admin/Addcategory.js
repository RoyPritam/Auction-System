import { TextField, Button, Box, Alert } from '@mui/material';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import * as React from 'react';

const Addcategory = ()=>{
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
          category_Id: 0,
          category_Name: data.get('category'),
        }
    
        // https://jsonplaceholder.typicode.com/todos/1
        fetch('http://localhost:43608/api/Categories', {
            method: 'POST', // or 'PUT'
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(actualData)
          })
          .then(req => {
            if(req.status ==400){
              setError({ status: true, msg: "All Fields are Required", type: 'error' })
            }
            else{
                setError({ status: true, msg: "Category Added Successfully", type: 'success' })
                document.getElementById('submit-form').reset()
            }
          })
        }
    return <>
    <div className='w-20 p-4'>
        <div><h2>Add Category</h2></div>
    <Box component='form' noValidate sx={{ mt: 1 }} id='submit-form' onSubmit={handleSubmit}>
      <TextField margin='normal' required fullWidth id='category' name='category' label='Category Name' />
      <Box textAlign='center'>
        <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2, px: 5 }}>Submit</Button>
      </Box>
      {error.status ? <Alert severity={error.type} sx={{ mt: 3 }}>{error.msg}</Alert> : ''}
    </Box>
    </div> 
  </>
}
export default Addcategory;