import React, {useEffect} from 'react'
import clsx from 'clsx';
import { fade,makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { createBrowserHistory } from "history";
import AddIcon from '@material-ui/icons/Add';
import AddProductForm from './AddProductForm';
let history = new createBrowserHistory({forceRefresh: true});
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  activeSideButton: {
    color: 'blue'
  }
}));


export default function Header(props) {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const [currentRoute,setActiveRoute] = React.useState('/');
  const {SearchVal,ChangeSearchTerm} = props;
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(()=>{
    console.log(history);
    setActiveRoute(history.location.pathname);
  },[])
  
 
  return (
    <div className={classes.root}>
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
<Toolbar className={classes.toolbar}>
  <Grid container spacing={1} alignItems="center">
    <Grid>
    <IconButton
    edge="start"
    color="inherit"
    aria-label="open drawer"
    onClick={handleDrawerOpen}
    className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
  >
    <MenuIcon />
  </IconButton>
    </Grid>
  <Grid item xs>
  <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
    Dashboard
  </Typography>
  </Grid>
 {/* <Grid item xs> */}
 <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              value={SearchVal}
              onChange={ChangeSearchTerm}
            />
          </div>
  {/* </Grid> */}
  </Grid>
</Toolbar>
</AppBar>
<Drawer
variant="permanent"
classes={{
  paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
}}
open={open}
>
<div className={classes.toolbarIcon}>
  <IconButton onClick={handleDrawerClose}>
    <ChevronLeftIcon />
  </IconButton>
</div>
<Divider />
<List> 
  <ListItem button 
  className={clsx(currentRoute==='/' && classes.activeSideButton)}
  onClick={()=>{
    history.push("/")
  }}>
      <ListItemIcon>
        <DashboardIcon className={clsx(currentRoute==='/' && classes.activeSideButton)} />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button 
    className={clsx(currentRoute==='/trash' && classes.activeSideButton)}
    onClick={()=>{
      history.push("/trash")
    }}>
      <ListItemIcon>
        <DeleteIcon className={clsx(currentRoute==='/trash' && classes.activeSideButton)} />
      </ListItemIcon>
      <ListItemText primary="Orders" />
    </ListItem>
  </List>
</Drawer>
    </div>
  )
}
