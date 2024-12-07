import { TextField, Button, Box, Alert } from '@mui/material';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { UserState } from '../Context/Context';

const UserLogin = () => {
  const {setUser, setuserType} = UserState();
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
      email: data.get('email'),
      password: data.get('password'),
    }
    
    const type = {
      actype : data.get('row-radio-buttons-group')
    }
    setuserType(type.actype)
    //https://jsonplaceholder.typicode.com/todos/1
    
    if(type.actype=="admin"){
      fetch('http://localhost:43608/api/Administrators/Login', {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(actualData)
      })
      .then(req => {
        if(req.status !=200){
          setError({ status: true, msg: "Error: Enter Correct Credentials", type: 'error' })
        }
        else{
          req.json()
          .then(adminData =>{ setUser(adminData)})
          navigate('/admindashboard')
        }
      })
      .catch((error) => {
        setError({ status: true, msg: "All Fields are Required", type: 'error' })
      });
    }
    else{
      fetch('http://localhost:43608/api/Customers/Login', {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(actualData)
      })
      .then(req => {
        if(req.status !=200){
          setError({ status: true, msg: "Error: Enter Correct Credentials", type: 'error' })
        }
        else{
          req.json()
          .then(userData =>{ 
            setUser(userData)
          })
          navigate('/userdashboard')
        }
      })
      .catch((error) => {
        setError({ status: true, msg: "All Fields are Required", type: 'error' })
      });
    }
    
  }
  return <>
    <Box component='form' noValidate sx={{ mt: 1 }} id='login-form' onSubmit={handleSubmit}>
      <FormControl>
        <FormLabel id="demo-row-radio-buttons-group-label">Account Type</FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
        >
          <FormControlLabel value="user" control={<Radio />} label="User" />
          <FormControlLabel value="admin" control={<Radio />} label="Administrator" />
        </RadioGroup>
      </FormControl>
      <TextField margin='normal' required fullWidth id='email' name='email' label='Email Address' />
      <TextField margin='normal' required fullWidth id='password' name='password' label='Password' type='password' />
      <Box textAlign='center'>
        <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2, px: 5 }}>Login</Button>
      </Box>
      <NavLink to='/sendpasswordresetemail' >Forgot Password ?</NavLink>
      {error.status ? <Alert severity={error.type} sx={{ mt: 3 }}>{error.msg}</Alert> : ''}
    </Box>
  </>;
};

export default UserLogin;
