import React, { Component, createRef } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import ColorSnackbar from '../components/ColorSnackbar.jsx'
import openSnackbar from '../utils/openSnackbar'
import validate from '../utils/validate'
import green from '@material-ui/core/colors/green'
import blue from '@material-ui/core/colors/blue'
import CircularProgress from '@material-ui/core/CircularProgress'
import handleFormChangeFactor from '../utils/handleFormChangeFactor'
import banner1 from '../image/banner1.png'
import banner2 from '../image/banner2.png'
import banner3 from '../image/banner3.png'
import banner4 from '../image/banner4.png'

const styles = (theme) => ({
  margin: {
    margin: '8px 0'
  },
  minHeight: {
    minHeight: '420px'
  },
  relative: {
    position: 'relative'
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[500]
    }
  },
  buttonProgress: {
    color: blue[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  },
  captcha: {
    height: '32px',
    cursor: 'pointer'
  }
})

class HomePage extends Component {
  render () {
    const {
      classes: {
        margin,
        minHeight,
        relative,
        buttonSuccess,
        buttonProgress
      }
    } = this.props
    const {
      isSuccess,
      isLoading
    } = this.state
    return (
      <React.Fragment>
        <AppBar color='primary' position='static'>
          <Toolbar>
            <Typography variant='h6' color='inherit'>
              抽多多-抽得多-得的多
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid container
          classes={{
            container: margin
          }}>
          <Grid item xs={12} md={6} lg={8}>
            <Carousel
              showStatus={false}
              showArrows
              showThumbs={false}
              infiniteLoop
              emulateTouch
              autoPlay>
              <a href='#'>
                <div>
                  <img src={banner1} />
                  <p className='legend'>广告位租赁</p>
                </div>
              </a>
              <a href='#'>
                <div>
                  <img src={banner2} />
                  <p className='legend'>广告位租赁</p>
                </div>
              </a>
              <a href='#'>
                <div>
                  <img src={banner3} />
                  <p className='legend'>广告位租赁</p>
                </div>
              </a>
              <a href='#'>
                <div>
                  <img src={banner4} />
                  <p className='legend'>广告位租赁</p>
                </div>
              </a>
            </Carousel>
          </Grid>
          <Grid item xs={12} md={6} lg={4}
            container direction='column'
            alignItems='stretch' alignContent='space-around'
            justify='space-around'
            classes={{
              container: minHeight
            }}
          >
            <Grid item>
              <TextField
                fullWidth
                label='用户名'
                value={this.state.username}
                onChange={this.changeUserName}
                autoComplete='on'
              />
            </Grid>
            <Grid item>
              <TextField
                label='密码'
                fullWidth
                type='password'
                value={this.state.password}
                onChange={this.changePassword}
                autoComplete='on'
              />
            </Grid>
            <Grid item>
              <Grid container justify='space-between'>
                <Grid item>
                  <Button variant='contained'
                    color='secondary' onClick={this.goToSingupPage}>
                    注册
                  </Button>
                </Grid>
                <Grid item>
                  <div className={relative}>
                    <Button
                      variant='contained'
                      color='primary'
                      disabled={isLoading}
                      onClick={this.login}
                      classes={{
                        root: isSuccess ? buttonSuccess : ''
                      }}
                    >
                      {isSuccess ? '登陆成功' : '登陆'}
                    </Button>
                    {isLoading && <CircularProgress size={24}
                      className={buttonProgress} />
                    }
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <ColorSnackbar onClose={this.closeSnackBar}
          type={this.state.snackbarType}
          message={this.state.snackbarMessage}
          open={this.state.isSnackbarOpen}
          autoHideDuration={this.state.snackbarDuration}
        />
      </React.Fragment>
    )
  }

  state = {
    isLoading: false,
    isSuccess: false,
    captcha: '',
    username: '',
    password: '',
    isSnackbarOpen: false,
    snackbarMessage: '',
    snackbarType: 'warning',
    snackbarDuration: 3000
  }

  constructor (props) {
    super(props)
    this.changeUserName = handleFormChangeFactor(this, 'username')
    this.changePassword = handleFormChangeFactor(this, 'password')
    this.changeCaptcha = handleFormChangeFactor(this, 'captcha')
    this.captchaRef = createRef()
  }

  componentDidMount () {
  }

  login = () => {
    const {
      username,
      password,
      isLoading,
      isSuccess
    } = this.state
    const userNameValidateInfo = validate.username(username)
    const passwordValidateInfo = validate.password(password)
    if (isLoading || isSuccess) {
      return
    }
    if (username.trim() === '') {
      openSnackbar(this, '请输入用户名', 'warning')
      return
    }
    if (password.trim() === '') {
      openSnackbar(this, '请输入密码', 'warning')
      return
    }
    if (userNameValidateInfo !== true) {
      openSnackbar(this, userNameValidateInfo, 'warning')
      return
    }
    if (passwordValidateInfo !== true) {
      openSnackbar(this, passwordValidateInfo, 'warning')
      return
    }
    this.setState({
      isLoading: true
    }, () => {
      setTimeout(() => {
        if (window.localStorage.getItem('username') === null) {
          this.setState({
            isLoading: false
          })
          openSnackbar(this, '账号不存在, 请注册后登陆', 'warning')
        } else {
          const savedUserName = window.localStorage.getItem('username')
          const savedPassword = window.localStorage.getItem('password')
          if (savedUserName === username && savedPassword === password) {
            this.setState({
              isSuccess: true,
              isLoading: false
            })
            window.localStorage.setItem('isLogin', true)
            openSnackbar(this, '登陆成功, 正在跳转', 'success', 300).then(() => {
              setTimeout(() => {
                this.props.history.push('/user/lottery')
              }, 500)
            })
          } else {
            openSnackbar(this, '用户名或者密码错误', 'error', 1000)
            this.setState({
              isLoading: false
            })
          }
        }
      }, 1000)
    })
  }

  goToSingupPage = () => {
    this.props.history.push('/signup')
  }

  closeSnackBar = () => {
    this.setState({
      isSnackbarOpen: false
    })
  }
}

export default withStyles(styles)(HomePage)
