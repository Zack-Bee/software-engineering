import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import MenuIcon from '@material-ui/icons/Menu'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import blue from '@material-ui/core/colors/blue'
import AccountIcon from '@material-ui/icons/AccountCircle'
import Fade from '../components/Fade.jsx'
import { withStyles } from '@material-ui/core/styles'
import {
  NavLink,
  Route
} from 'react-router-dom'
// import Button from '@material-ui/core/Button'
import 'katex/dist/katex.min.css'
import ColorSnackbar from '../components/ColorSnackbar.jsx'
// import Grid from '@material-ui/core/Grid'
// import Grid from '@material-ui/core/Grid'
import LotteryPage from './LotteryPage.jsx'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import openSnackbar from '../utils/openSnackbar'
import PublishIcon from '@material-ui/icons/CardGiftcard'
import LotteryIcon from '@material-ui/icons/Pets'
import burgersImage from '../image/burgers.jpg'
import hatsImage from '../image/hats.jpg'
import honeyImage from '../image/honey.jpg'
import vegetablesImage from '../image/vegetables.jpg'
import mushroomImage from '../image/mushroom.jpg'
import cameraImage from '../image/camera.jpg'
import bikeImage from '../image/bike.jpg'
import oliveImage from '../image/olive.jpg'
import starImage from '../image/star.jpg'
import PublishPage from '../pages/PublishPage.jsx'

const tileData = [
  {
    img: burgersImage,
    title: '汉堡王皇堡',
    author: '楼超',
    publishTime: 1556792277492,
    disabled: false,
    id: 1
  },
  {
    img: cameraImage,
    title: '二手相机',
    author: '张亚强',
    publishTime: 1556792277492,
    disabled: false,
    id: 2
  },
  {
    img: hatsImage,
    title: '王景文同款帽子',
    author: '曹越',
    publishTime: 1556792277492,
    disabled: false,
    id: 3
  },
  {
    img: honeyImage,
    title: '一罐养生堂蜂蜜',
    author: '陈乔勇',
    publishTime: 1556792277492,
    disabled: false,
    id: 4
  },
  {
    img: vegetablesImage,
    title: '一篓子蔬菜',
    author: '王景文',
    publishTime: 1556792277492,
    disabled: false,
    id: 5
  },
  {
    img: mushroomImage,
    title: '两颗毒蘑菇',
    author: '方先立',
    publishTime: 1556792277492,
    disabled: false,
    id: 6
  },
  {
    img: oliveImage,
    title: '谢霆锋代言的橄榄油',
    author: '陈弘超',
    publishTime: 1556792277492,
    disabled: false,
    id: 7
  },
  {
    img: starImage,
    title: '一个海星',
    author: '牛昱斌',
    publishTime: 1556792277492,
    disabled: false,
    id: 8
  },
  {
    img: bikeImage,
    title: '破烂自行车',
    author: '曹越的die',
    publishTime: 1556792277492,
    disabled: false,
    id: 9
  }
]

const storage = window.localStorage
if (storage.getItem('lotteryList') === null) {
  storage.setItem('lotteryList', JSON.stringify(tileData))
}

const drawerWidth = 240

const styles = theme => ({
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
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    minHeight: 'calc(100vh - 56px)',
    marginTop: '56px',
    [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
      minHeight: 'calc(100vh - 48px)',
      marginTop: '48px'
    },
    [theme.breakpoints.up('sm')]: {
      minHeight: 'calc(100vh - 64px)',
      marginTop: '64px'
    },
    width: '100%'
  },
  flexAuto: {
    flex: '1 1 auto'
  },
  blue: {
    color: blue[600]
  },
  paddingLeft: {
    paddingLeft: '40px'
  },
  margin: {
    margin: '20px'
  },
  fullHeight: {
    height: '100%',
    minHeight: '100%'
  }
})

class UserPage extends Component {
  render () {
    const {
      classes,
      location: {
        pathname
      }
    } = this.props
    const {
      menuAnchor
    } = this.state
    const { path, url } = this.props.match || {}
    const lotteryPath = `${url}/lottery`
    const publishPath = `${url}/publish`
    const lotteryTo = `${path}/lottery`
    const publishTo = `${path}/publish`
    const pathnameMapToTitle = {
      [lotteryPath]: '参与抽奖',
      [publishPath]: '发起抽奖'
    }
    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <List>
          <NavLink to={lotteryTo} onClick={this.closeDrawer}>
            <ListItem button key='lottery'>
              <ListItemIcon>
                <LotteryIcon
                  classes={pathname === lotteryPath ? {
                    root: classes.blue
                  } : {}}
                />
              </ListItemIcon>
              <ListItemText
                primary='参与抽奖'
                classes={pathname === lotteryPath ? {
                  primary: classes.blue
                } : {}}
              />
            </ListItem>
          </NavLink>
          <NavLink to={publishTo} onClick={this.closeDrawer}>
            <ListItem button key='center'>
              <ListItemIcon>
                <PublishIcon classes={pathname === publishPath ? {
                  root: classes.blue
                } : {}} />
              </ListItemIcon>
              <ListItemText primary='发起抽奖' classes={pathname === publishPath ? {
                primary: classes.blue
              } : {}} />
            </ListItem>
          </NavLink>
        </List>
        <Divider />
      </div>
    )

    return (
      <div className={classes.root}>
        <AppBar position='fixed' className={classes.appBar} color='primary'>
          <Toolbar>
            <IconButton
              color='inherit'
              aria-label='Open drawer'
              onClick={this.handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant='h6' color='inherit' noWrap>
              {pathnameMapToTitle[pathname] || '抽奖详情'}
            </Typography>
            <div className={classes.flexAuto} />
            <div>
              <IconButton
                aria-owns={menuAnchor ? 'menu-appbar' : undefined}
                aria-haspopup='true'
                onClick={this.handleMenu}
                color='inherit'
              >
                <AccountIcon />
              </IconButton>
              <Menu
                id='menu-appbar'
                anchorEl={menuAnchor}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={Boolean(menuAnchor)}
                onClose={this.handleClose}
              >
                <MenuItem onClick={this.logout}>退出登陆</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation='css'>
            <Drawer
              container={this.props.container}
              variant='temporary'
              anchor='left'
              open={this.state.isMobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper
              }}
              ModalProps={{
                keepMounted: true // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation='css'>
            <Drawer
              classes={{
                paper: classes.drawerPaper
              }}
              variant='permanent'
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <Route key={0} path={lotteryPath} children={({ match, history, location }) => (
            <Fade in={match !== null} timeout={300} exit={false} className={classes.fullHeight}>
              <LotteryPage
                match={match}
                history={history}
                location={location}
              />
            </Fade>
          )} />
          <Route key={1} path={publishPath} children={({ match, history }) => (
            <Fade in={match !== null} timeout={300} exit={false} className={classes.fullHeight}>
              <PublishPage history={history} />
            </Fade>
          )} />
        </main>
        <ColorSnackbar onClose={this.closeSnackBar}
          type={this.state.snackbarType}
          autoHideDuration={this.state.snackbarDuration}
          open={this.state.isSnackbarOpen}
          message={this.state.snackbarMessage}
        />
      </div>
    )
  }

  state = {
    isMobileOpen: false,
    isLogin: false,
    isSnackbarOpen: false,
    snackbarMessage: '',
    snackbarType: 'warning',
    menuAnchor: null,
    snackbarDuration: 4000
  }

  componentDidMount () {

  }

  closeSnackBar = () => {
    this.setState({
      isSnackbarOpen: false
    })
  }

  handleDrawerToggle = () => {
    this.setState({
      isMobileOpen: !this.state.isMobileOpen
    })
  }

  closeDrawer = () => {
    this.setState({
      isMobileOpen: false
    })
  }

  handleMenu = event => {
    this.setState({ menuAnchor: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ menuAnchor: null })
  }

  logout = () => {
    // window.fetch('/api/user/logout').then((res) => (
    // res.json()
    // )).then((res) => {
    // if (res.status === 0) {
    // openSnackbar(this, '成功退出, 正在跳转到首页', 'success', 500).then(() => {
    // setTimeout(() => {
    // this.props.history.push('/')
    // }, 700)
    // })
    // }
    // })
    openSnackbar(this, '成功退出, 正在跳转到首页', 'success', 500).then(() => {
      setTimeout(() => {
        window.localStorage.setItem('isLogin', 'false')
        this.props.history.push('/')
      }, 700)
    })
  }
}

export default withStyles(styles, { withTheme: true })(UserPage)
