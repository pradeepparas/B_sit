import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { compose } from 'redux';
import { Link, useHistory, useRouteMatch, Redirect } from 'react-router-dom';

// Material UI drawerClose
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

// Import Images
// import dashboard from './images/Dashboard.png';
import Icon from "./images/Icon.svg";
import feedback from "./images/feedback.svg";
import user_management from "./images/user_management.svg"
import home from "./images/home.svg";
import user_alt1 from './images/user_alt1.svg';
import account_logout from "./images/account_logout.svg";
import dropdown_circle from "./images/dropdown_circle.svg";
import vendor_icon from "./images/vendor_icon.svg"
// import Logo from './images/Logo.svg';
import rupee from './images/rupee.svg';
// import servicestack from './images/servicestack.svg';
// import train1 from './images/train1.svg';
import train from './images/train.svg';
import user_alt from './images/user_alt.svg';
import user_astronaut from './images/user_astronaut.svg';
import users from './images/users.svg';
import users_cog from './images/users_cog.svg';

// components
import * as actions from "../../redux/actions/auth";
import styles from "./Drawer.module.css";
import LoadingComponent from '../Loading/LoadingComponent';

const drawerWidth = 220;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& .MuiListItem-root': {
      paddingTop: 0,
      paddingBottom: 0,
      marginTop: 30,
      marginBottom: 30
    },
    // '& .MuiListItemText-root span': {
    //   fontSize: 12
    // },
    '& .MuiListItem-root:hover': {
      color: '#213d77',
      backgroundColor: '#ffffff'
    }
  },
  paper1: {
    width: 110,
    overflow: 'hidden',
    marginTop: 12,
    borderRadius: 6
  },
  menuList1: {
    '& .MuiListItem-root': {
      paddingTop: 5,
      paddingBottom: 5,
      marginTop: 0,
      marginBottom: 0,
      fontSize: 12,
      fontWeight: '500'
    },
    '& .MuiListItem-root:hover': {
      backgroundColor: 'white',
    },
    backgroundColor: 'white'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  list: {
    color: '#d48383'
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: '80%',
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  button1: {
    borderRadius: 0,
    paddingLeft: 15,
    borderLeftStyle: "solid",
    borderLeftColor: "#556a97",
    borderLeftWidth: "2px",
    "&:hover":{
      backgroundColor: '#213D77',
    },
    "&:active": {
      color: "#213D77",
    }
  },
  menuButton: {
    marginLeft: 1,
    // color: 'black',
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    zIndex: 500,
    // backgroundColor: 'yellow',
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    boxShadow: "0px 0px 20px 2px #08080833",
    // width: 220,
    zIndex: 500,
    ["@media (min-width: 280px) and (max-width: 1353px)"]: {
			position: 'fixed',
			zIndex: 500,
			width: '220px'
		},
    backgroundColor: 'white',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    ["@media (max-width:576px)"]: {
      transition: 'all 0.5s'
    }
  },
  drawerClose: {
    boxShadow: "0px 0px 20px 2px #08080833",
    zIndex: 500,
    backgroundColor: 'white',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
    ["@media (max-width:576px)"]: {
      display: 'none'
    }
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    backgroundColor: '#efefef',
    minWidth: 0,
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export function MiniDrawer(props) {
  // pathList is used for css for active and in-active Menu
  var pathList = ["revenue-report-vendor", "revenue-report", "revenue-graph"];

  const username = localStorage.getItem('username');
  var userDataLS = JSON.parse(localStorage.getItem('userDataLS'));
  const url = useRouteMatch()
	const path = url.path.split('/')[1]
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory()
  const [open, setOpen] = React.useState(false);
  const [profileName, setProfileName] = React.useState('');
  const [modules, setModules] = React.useState({
    Station: false,
    User: false,
    Vendor: false,
  })

  var revenue_menu = pathList.includes(path);
  console.log(revenue_menu)
  // debugger
  // Profile
  const [open_Profile, setOpenProfile] = React.useState(false);
  const anchorRef = React.useRef(null);

  React.useEffect(() => {
    let a = localStorage.getItem('rememberMe')
    console.log(a)
    let profile = localStorage.getItem("userName")
    setProfileName(profile)
    // debugger
  }, [])

  const handleToggle = () => {
    setOpenProfile((prevOpen) => !prevOpen);
  };

  const handleClose = async(event, type) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpenProfile(false);
    if(type == 'profile'){
      history.push('/profile')
    }

    if(type == 'logout'){
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('userId');
      localStorage.removeItem('station_id');
      localStorage.removeItem('userDataLS');
      history.push("/")
    }
  };

  React.useEffect(() => {
    // debugger
    let token = localStorage.getItem('token')
    if(token == null){
      history.push('/')
    } else {
    if(props.authData){
      // debugger
      props.authData.role_id.access_module.map((data) => {
        if(data.status){
          setModules({
            ...modules,
            [data.module]: data.status
          })
        }
      })
    }
  }

  }, [props.authenData])

  // function hasAccess(arr){
  //   debugger
  //     // debugger
  //     let item = []
  //     arr.role.access_module.map((data) => {
  //       debugger
  //       if(data.status){
  //         item.push({
  //           [data.module]: data.status
  //         })
  //       }
  //     })
  //     setModules(item)
  // }

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpenProfile(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open_Profile);
  React.useEffect(() => {
    let token = localStorage.getItem('token')
    if(token != null){
    if (prevOpen.current === true && open_Profile === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open_Profile;
  } else {
    // history.push()
  }
  }, [open_Profile]);
  // Profile

  const handleDrawerOpen = () => {
    console.log(path)
    // debugger
    setOpen((prevState) => !prevState);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  // header

  // Check auth here
  const checkAuth =(name, type)=>{
  // debugger
  // debugger
  if(userDataLS) {
    const module = userDataLS.role_id.access_module;
    let auth= module.find(x=>x.status==true && x.module==name)
    // debugger
    if(auth){
    // debugger
      return true
    }
      else{
      auth=module.find(x=>x.submodule.find(o=>o.name==type&&o.status==true))
      if(auth){
        return true
       }
      else{
        return false
        }
      }
    }
  }

  return (
    <div style={{color: 'white'}} className={classes.root}>
      {props.isLoading && <LoadingComponent />}
      <CssBaseline style={{color: 'white'}}/>
      <AppBar
        position="fixed"
        style={{color: '#213d77'}}
        className={clsx(classes.appBar, /*{
          [classes.appBarShift]: open,
        }*/)}
      >
        <Toolbar style={{backgroundColor: '#213d77',minHeight: 57}}>
        <div className={styles.header} >ADMIN</div>

            <div onClick={handleDrawerOpen} className={styles.div1}>
                  <span className={styles.spanClass} />
                  <span className={styles.spanClass1} />
                  <span className={styles.spanClass2} />
                  <span className={styles.spanClass3} />
                  <span className={styles.spanClass4} />
                </div>

          {/*<IconButton
            // color="black"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, /*{
              [classes.hide]: open,
            }*//*)}
          >
            <MenuIcon />
          </IconButton>*/}
          <Typography style={{color: 'white'}} variant="h6" noWrap>

          </Typography>
          <div style={{ width: '-webkit-fill-available'}}>
              
          <div style={{float: 'right'}} className={styles.profileDiv}>
          <img src={Icon} style={{width: 18, marginRight: 15}} />
            <Button
              style={{color:'white'}}
              disableRipple={true}
              className={classes.button1 + " " + styles.button_style}
              ref={anchorRef}
              aria-controls={open_Profile ? 'menu-list-grow' : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
            >
              {username ? username : "John Doe"} <img className={!open_Profile?styles.profileImg: ''} style={{width: 15, height: 15, marginLeft: 10}} src={dropdown_circle} />
            </Button>
            <Popper  open={open_Profile} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              className={classes.paper1}
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList className={classes.menuList1} autoFocusItem={open_Profile} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    <MenuItem className={styles.listProfileText} onClick={(e) => handleClose(e, 'profile')}>Profile <img className={styles.imageColor} style={{width: 15, height: 15, marginLeft: 25}} src={user_alt1} /></MenuItem>
                    <MenuItem className={styles.listProfileText} onClick={(e) => handleClose(e, 'logout')}>Logout <img className={styles.imageColor} style={{width: 15, marginLeft: 25,height: 15}} src={account_logout} /></MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div></div>
        </Toolbar>
      </AppBar>
      <Drawer
        style={{color: 'white'}}
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div style={{color: 'white',minHeight: 57}} className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <List style={{paddingTop: 40}}>
        <Link to="/dashboard">
            <ListItem disableRipple={true} className={path == 'dashboard' ? styles.active : styles.list} button>
              <ListItemIcon><img className={path == 'dashboard' ? styles.selected : styles.filter } src={home} /></ListItemIcon>
              <ListItemText className={path == 'dashboard' ? styles.selectedText : styles.listText } primary={"Dashboard"} />
            </ListItem>
            </Link>

          <Link to="/user-management">
            <ListItem disableRipple={true} className={path == 'user-management' ? styles.active : styles.list} button>
              <ListItemIcon><img className={path == 'user-management' ? styles.selected : styles.filter} src={user_management} /></ListItemIcon>
              <ListItemText style={{ whiteSpace: open ? 'break-spaces': ""}} className={path == 'user-management' ? styles.selectedText : styles.listText} primary={"User Management"} />
            </ListItem>
            </Link>

          <Link to="/vendor-management">
            <ListItem disableRipple={true} className={path == 'vendor-management' ? styles.active : styles.list} button>
              <ListItemIcon><img className={path == 'vendor-management' ? styles.selected : styles.filter} src={vendor_icon} /></ListItemIcon>
              <ListItemText style={{ whiteSpace: open ? 'break-spaces': ""}} className={path == 'vendor-management' ? styles.selectedText : styles.listText} primary={"Vendor Management"} />
            </ListItem>
            </Link>

          <Link to="/SFMIS-services">
            <ListItem disableRipple={true} className={path == 'SFMIS-services' ? styles.active : styles.list} button>
              <ListItemIcon><img className={path == 'SFMIS-services' ? styles.selected : styles.filter} src={train} /></ListItemIcon>
              <ListItemText style={{ whiteSpace: open ? 'break-spaces': ""}} className={path == 'SFMIS-services' ? styles.selectedText : styles.listText} primary={"SFMIS Service Management"} />
            </ListItem>
            </Link>

          <Link to="/vendors-service">
            <ListItem disableRipple={true} className={path == 'vendors-service' ? styles.active : styles.list} button>
              <ListItemIcon><img className={path == 'vendors-service' ? styles.selected : styles.filter} src={vendor_icon} /></ListItemIcon>
              <ListItemText style={{ whiteSpace: open ? 'break-spaces': ""}} className={path == 'vendors-service' ? styles.selectedText : styles.listText} primary={"Vendor Service Management"} />
            </ListItem>
            </Link>

            <Link /*to="/inventory-management"*/>
            <ListItem disableRipple={true} className={path == 'inventory-management' ? styles.active : styles.list} button>
              <ListItemIcon><img className={path == 'inventory-management' ? styles.selected : styles.filter} src={user_astronaut} /></ListItemIcon>
              <ListItemText style={{ whiteSpace: open ? 'break-spaces': ""}} className={path == 'inventory-management' ? styles.selectedText : styles.listText} primary={"Inventory Management"} />
            </ListItem>
            </Link>

            <Link to="/revenue-graph">
            <ListItem disableRipple={true} className={revenue_menu ? styles.active : styles.list} button>
              <ListItemIcon><img className={revenue_menu ? styles.selected : styles.filter} src={rupee} /></ListItemIcon>
              <ListItemText style={{ whiteSpace: open ? 'break-spaces': ""}} className={revenue_menu ? styles.selectedText : styles.listText} primary={"Revene Reports"} />
            </ListItem>
            </Link>

            <Link to="/feedback-and-suggestions">
            <ListItem disableRipple={true} className={path == 'feedback-and-suggestions' ? styles.active : styles.list} button>
              <ListItemIcon><img className={path == 'feedback-and-suggestions' ? styles.selected : styles.filter} src={feedback} /></ListItemIcon>
              <ListItemText style={{ whiteSpace: open ? 'break-spaces': ""}} className={path == 'feedback-and-suggestions' ? styles.selectedText : styles.listText} primary={"Feedback and Suggestions"} />
            </ListItem>
            </Link>

            <Link to="/profile">
            <ListItem disableRipple={true} className={path == 'profile' ? styles.active : styles.list} button>
              <ListItemIcon><img className={path == 'profile' ? styles.selected : styles.filter} src={users_cog} /></ListItemIcon>
              <ListItemText style={{ whiteSpace: open ? 'break-spaces': ""}} className={path == 'profile' ? styles.selectedText : styles.listText} primary={"Profile Settings"} />
            </ListItem>
            </Link>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div id="toolbar" className={classes.toolbar} />
        {props.page}
      </main>
    </div>
  );
}

const mapStateToProps = (state) => {

	return {
    isLoading: state.Stations.isLoading,
    loginMessage: state.Auth.loginMessage,
    token: state.Auth.tokenId,
    authData: state.Auth.authData,
		// loading: state.auth.loading,
		// error: state.auth.error,
		// isAuthenticated: state.auth.token !== null,
		// authRedirectPath: state.auth.authRedirectPath,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		logOut: () =>
			dispatch(actions.auth()),
		// 	updateSignup:()=>
		// 	  dispatch(actions.updateSingupFlag()),
		// onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/")),
	};
};

export default compose(connect(mapStateToProps,  mapDispatchToProps))(MiniDrawer);
