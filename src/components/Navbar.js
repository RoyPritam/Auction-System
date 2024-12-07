import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { UserState } from './Context/Context';

const Navbar = () => {
  const {user, userType} = UserState()
  //console.log(user)
  return <>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <Typography variant='h5' component="div" sx={{ flexGrow: 1 }} >Auction System</Typography>

          <Button component={NavLink} to='/' style={({ isActive }) => { return { backgroundColor: isActive ? '#6d1b7b' : '' } }} sx={{ color: 'white', textTransform: 'none' }}>Home</Button>

          <Button component={NavLink} to='/buybid' style={({ isActive }) => { return { backgroundColor: isActive ? '#6d1b7b' : '' } }} sx={{ color: 'white', textTransform: 'none' }}>BuynBid</Button>

          {/* <Button component={NavLink} to='/sell' style={({ isActive }) => { return { backgroundColor: isActive ? '#6d1b7b' : '' } }} sx={{ color: 'white', textTransform: 'none' }}>Sell</Button> */}

          <Button component={NavLink} to='/about' style={({ isActive }) => { return { backgroundColor: isActive ? '#6d1b7b' : '' } }} sx={{ color: 'white', textTransform: 'none' }}>About Us</Button>

          <Button component={NavLink} to='/contact' style={({ isActive }) => { return { backgroundColor: isActive ? '#6d1b7b' : '' } }} sx={{ color: 'white', textTransform: 'none' }}>Contact</Button>

          <Button component={NavLink} to={(user==null)?'/login':((userType=='admin')?'/admindashboard':'/userdashboard')} style={({ isActive }) => { return { backgroundColor: isActive ? '#6d1b7b' : '' } }} sx={{ color: 'white', textTransform: 'none' }}>
            {(user==null)?'Login/Register':
                        ((userType=='user')? user.customer_Name : user.admin_Name)
            }</Button>
        </Toolbar>
      </AppBar>
    </Box>
  </>;
};

export default Navbar;
