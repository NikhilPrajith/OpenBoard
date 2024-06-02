'use client'
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { MdOutlineDashboard } from "react-icons/md";
import { MdPlaylistAddCircle } from "react-icons/md";
import { RiDashboardFill } from "react-icons/ri";
import { IoDocumentText } from "react-icons/io5";
import { FaThList } from "react-icons/fa";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MdSpaceDashboard } from "react-icons/md";
import { FcTodoList } from "react-icons/fc";

import { FcCloth } from "react-icons/fc";
import useAuth from '@/context/Authentication/AuthProvider';
const drawerWidth = 180;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  borderRight: '0.1px rgb(212, 210, 210) solid', // Apply border style
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  borderRight: '0.1px rgb(212, 210, 210) solid', // Apply border style
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);




export default function Features({setType, setOpenParent}) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const handleChange= ()=>{
    setOpen(!open);
    setOpenParent(!open);
  }
  const {user} = useAuth();
  const [showDasboard, setShowDashboard] = React.useState(false);


  React.useEffect(()=>{
    if(user){
      setShowDashboard(true)
    }else{
      setShowDashboard(false);
    }
  },[user]);
  const iconSize = 17;
  const pageIcons = {
    0:{icon: <FcCloth size={iconSize} />, page: "/"},
    1:{icon:<FcTodoList size={iconSize}/>, page: "/tasks"},
    2:{icon:<FaThList size={iconSize}></FaThList>, page: "/board"},

    4:{icon:<MdSpaceDashboard size={iconSize}/>, page: "/dashboard"},
    //3:{icon:<IoDocumentText size={iconSize}/>, page: "/docs"},
  }
  const router = useRouter();
  const handleNavigation = (page) => {
    router.push(page);
  };

  return (
    <Box sx={{ display: 'flex', borderRight: '0.1px rgb(212, 210, 210) solid', fontFamily: 'Arial, sans-serif' }}> {/* Ensure the Box uses Arial */}
    <CssBaseline />
    <Drawer variant="permanent" open={open}>
      <DrawerHeader sx={{minHeight:'55.59px !important', borderBottom:'0.1px rgb(212, 210, 210) solid'}}>
        <IconButton sx={{color:'black', fontSize:'12px', margin:!open ? 'auto': 'initial'}} onClick={handleChange}>
          {!open ? <IoIosArrowForward /> : <IoIosArrowBack />}
        </IconButton>
      </DrawerHeader>
      <List sx={{ 
        '& .MuiListItemText-root span': { fontSize: '12px', color: 'black', fontFamily: 'inherit' }, // Use 'inherit' for the font
        '& .MuiListItemIcon-root': { color: 'black', fontSize: '12px' }, // Adjusted font size for text
        '& .MuiSvgIcon-root': { fontSize: '12px' }, // Adjusted font size for icons
      }}>
        {['Local Playground', 'Tasker'].map((text, index) => (
          <ListItem  onClick={() => handleNavigation(pageIcons[index].page)} key={text} disablePadding sx={{ display: 'block' }}>
            <ListItemButton sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5 }}>
              <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center'}}> {/* Explicitly target icons within ListItemIcon */}
                {pageIcons[index].icon}
              </ListItemIcon>
              <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        ))}
        {showDasboard && 
          <ListItem  onClick={() => handleNavigation(pageIcons[4].page)} key={'Dashboard'} disablePadding sx={{ display: 'block' }}>
          <ListItemButton sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5 }}>
            <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center'}}> {/* Explicitly target icons within ListItemIcon */}
              {pageIcons[4].icon}
            </ListItemIcon>
            <ListItemText primary={'Dashboard'} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
        
        }
        
      </List>
      <Divider />
    </Drawer>
  </Box>
  );
}
