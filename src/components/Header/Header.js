import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import MenuIcon from '@material-ui/icons/Menu'
import Home from '@material-ui/icons/Home'
import ExitToApp from '@material-ui/icons/ExitToApp'
import SettingsApplications from '@material-ui/icons/SettingsApplications'
import Input from '@material-ui/icons/Input'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles, useTheme } from '@material-ui/core/styles'

// Styling
const drawerWidth = 240
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}))

// Options
const authenticatedOptions = (
  <Fragment>
    <ListItem button component={Link} to="/change-password" key={'change-password'}>
      <ListItemIcon><SettingsApplications /></ListItemIcon>
      <ListItemText primary={'Change-Password'}/>
    </ListItem>
    <ListItem button component={Link} to="/sign-out" key={'sign-out'}>
      <ListItemIcon><ExitToApp /></ListItemIcon>
      <ListItemText primary={'Sign-Out'}/>
    </ListItem>
  </Fragment>
)

const unauthenticatedOptions = (
  <Fragment>
    <ListItem button component={Link} to="/user-auth" key={'sign-in'}>
      <ListItemIcon><Input /></ListItemIcon>
      <ListItemText primary={'Sign-In'} />
    </ListItem>
  </Fragment>
)

const alwaysOptions = (
  <Fragment>
    <ListItem button component={Link} to="/" key={'home'}>
      <ListItemIcon><Home /></ListItemIcon>
      <ListItemText primary={'Home'} />
    </ListItem>
  </Fragment>
)

// Functional Component
const Header = (props) => {
  const classes = useStyles()
  const { container, user } = props
  const theme = useTheme()
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        { user ? authenticatedOptions : unauthenticatedOptions }
        {alwaysOptions}
      </List>
      <Divider />
    </div>
  )

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            myPersonal Trainer
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="Mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
      </main>
    </div>
  )
}

export default Header
