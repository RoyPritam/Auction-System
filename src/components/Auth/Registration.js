import { TextField, FormControlLabel, Checkbox, Button, Box, Alert } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
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
      email: data.get('email'),
      phno: data.get('phno'),
      address: data.get('address'),
      password: data.get('password'),
      password_confirmation: data.get('password_confirmation'),
      tc: data.get('tc'),
    }
    const dbdata = {
      customer_Id: 0,
      customer_Name: data.get('name'),
      address: data.get('address'),
      customer_Email: data.get('email'),
      customer_Phone: data.get('phno'),
      password: data.get('password'),
    }
    if (actualData.name && actualData.email && actualData.phno && actualData.address && actualData.password && actualData.password_confirmation && actualData.tc !== null) {
      if (actualData.password === actualData.password_confirmation) {
        console.log(actualData);
        fetch('http://localhost:43608/api/Customers/register', {
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
            document.getElementById('registration-form').reset()
            setError({ status: true, msg: "Registration Successful", type: 'success' })
            navigate('/login')
          }
        });
      } else {
        setError({ status: true, msg: "Password and Confirm Password Doesn't Match", type: 'error' })
      }
    } else {
      setError({ status: true, msg: "All Fields are Required", type: 'error' })
    }
  }
  return <>
    <Box component='form' noValidate sx={{ mt: 1 }} id='registration-form' onSubmit={handleSubmit}>
    {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ''}
      <TextField margin='normal' required fullWidth id='name' name='name' label='Name' />
      <TextField margin='normal' required fullWidth id='email' name='email' label='Email Address' />
      <TextField margin='normal' required fullWidth id='phno' name='phno' label='Contact Number' />
      <TextField margin='normal' required fullWidth id='address' name='address' label='Address' />
      <TextField margin='normal' required fullWidth id='password' name='password' label='Password' type='password' />
      <TextField margin='normal' required fullWidth id='password_confirmation' name='password_confirmation' label='Confirm Password' type='password' />
      <FormControlLabel control={<Checkbox value="agree" color="primary" name="tc" id="tc" />} label="I agree to terms and conditions." />
      <Box textAlign='center'>
        <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2, px: 5 }}>Register</Button>
      </Box>
      {/* {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ''} */}
    </Box>
  </>;
};

export default Registration;
