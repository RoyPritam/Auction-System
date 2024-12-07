import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { MdTableRows } from "react-icons/md";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import ChangePassword from './User/ChangePassword';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { UserState } from './Context/Context';
// import Mcontext

export default function Sidebar(props) {

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const {setsidebarVal, sidebarVal} = UserState();
  const navigate = useNavigate()
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const list = (anchor) => (
    <Box
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {props.Sbitems.map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={()=>setsidebarVal(text)}>
              <ListItemText primary={text}/>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}><MdTableRows style={{height:30, width:30}}/></Button>
          {/* <h3 className='text-light'>{props.email}</h3> */}
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
