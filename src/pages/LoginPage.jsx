import { Component } from 'react'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'
import blue from '@material-ui/core/colors/blue'
import green from '@material-ui/core/colors/green'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import Typography from '@material-ui/core/Typography'
import FormControl from '@material-ui/core/FormControl'
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'
import classNames from 'classnames'
import logo from '../icon/icon.png'
import config from '../../config/config'
import post from '../utils/post'
import openSnackbar from '../utils/openSnackbar'
import ColorSnackbar from '../components/ColorSnackbar.jsx'

const styles = (theme) => ({
  alignCenter: {
    display: 'flex',
    justifyContent: 'center'
  },
  marginLeftAndRight: {
    margin: '0 40px'
  },
  padding: {
    padding: '20px 0'
  },
  marginTopAndBottom: {
    margin: '12px 0'
  },
  root: {
    [theme.breakpoints.down('500')]: {
      width: '100vw',
      height: '100vh'
    },
    [theme.breakpoints.up('500')]: {
      width: '450px',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    }
  },
  wrapper: {
    [theme.breakpoints.down('500')]: {
      height: '100vh'
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
  relative: {
    position: 'relative',
    margin: theme.spacing.unit
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700]
    }
  }
})

class LoginPage extends Component {
  render () {
    console.log(this.props.match)
    const { classes } = this.props
    const { isLoading, isSuccess } = this.state
    const buttonClassname = classNames({
      [classes.buttonSuccess]: isSuccess
    })

    return (
      <div className={classes.root}>
        <Paper>
          <div className={classNames(classes.marginLeftAndRight, classes.wrapper)}>
            <div className={classNames(classes.alignCenter, classes.padding)}>
              <img width='40' height='40' src={logo} />
            </div>
            <div className={classes.alignCenter}>
              <Typography variant='h6'>
                                登陆
              </Typography>
            </div>
            <div className={classNames(classes.alignCenter, classes.marginTopAndBottom)}>
              <Typography>
                                使用你的EXAM平台账号
              </Typography>
            </div>
            <div className={classes.alignCenter}>
              <FormControl fullWidth error={this.state.isInvalidId}
                margin='normal' >
                <InputLabel htmlFor='user-id'>手机号</InputLabel>
                <Input placeholder='张三' id='user-id'
                  autoFocus autoComplete='on'
                  onChange={this.setId} />
              </FormControl>
            </div>
            <div className={classes.alignCenter}>
              <FormControl fullWidth
                margin='normal' >
                <InputLabel htmlFor='user-pass'>密码</InputLabel>
                <Input type='password' autoComplete='on'
                  id='user-pass' onChange={this.setPassword}
                />
              </FormControl>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }} className={classes.padding}>
              <div>
                <Button variant='contained'
                  color='secondary'
                  onClick={this.goToSignup}>
                      去注册
                </Button>
              </div>
              <div className={classes.relative}>
                <Button
                  variant='contained'
                  color='primary'
                  className={buttonClassname}
                  disabled={isLoading}
                  onClick={this.login}
                >
                  {isSuccess ? '登陆成功' : '登陆'}
                </Button>
                {isLoading && <CircularProgress size={24}
                  className={classes.buttonProgress} />
                }
              </div>
              <ColorSnackbar onClose={this.closeSnackBar}
                type={this.state.snackbarType}
                message={this.state.snackbarMessage}
                open={this.state.isSnackbarOpen}
                autoHideDuration={3000} />
            </div>
          </div>
        </Paper>
      </div>
    )
  }

  constructor (props) {
    super(props)
    this.state = {
      isLoading: false,
      isSuccess: false,
      id: '',
      password: '',
      isSnackbarOpen: false,
      isInvalidId: false,
      snackbarMessage: '',
      snackbarType: ''
    }
    this.setId = this.setId.bind(this)
    this.setPassword = this.setPassword.bind(this)
    this.login = this.login.bind(this)
    this.closeSnackBar = this.closeSnackBar.bind(this)
    this.goToSignup = this.goToSignup.bind(this)
  }

  closeSnackBar () {
    this.setState({
      isSnackbarOpen: false
    })
  }

  setId (event) {
    const test = /^1[34578]\d{9}$/
    const id = event.target.value
    this.setState({
      id
    })
    if (event.target.value.length === 11) {
      if (!test.test(id)) {
        this.setState({
          isInvalidId: true
        })
      } else {
        this.setState({
          isInvalidId: false
        })
      }
    }
  }
  setPassword (event) {
    this.setState({
      password: event.target.value
    })
  }

  login () {
    const test = /^1[34578]\d{9}$/
    if (this.state.isLoading || this.state.isSuccess) {
      return
    }
    if (this.state.isInvalidId || !test.test(this.state.id)) {
      openSnackbar(this, '请输入正确格式的手机号', 'warning')
      return
    }
    this.setState({
      isLoading: true
    })
    const id = this.state.id
    const password = this.state.password
    post(config.loginRouter, {
      id,
      password
    }).then((res) => {
      return res.json()
    }).then((data) => {
      console.log(data)
      if (data.isSuccess) {
        this.setState({
          isLoading: false,
          isSuccess: true
        })
        setTimeout(() => {
          this.props.history.push('/user/lottery')
        }, 500)
      } else {
        this.setState({
          isLoading: false,
          isSuccess: false
        })
        openSnackbar(this, '手机号或者密码错误', 'error')
      }
    })
  }

  goToSignup () {
    this.props.history.push('/signup')
  }
}

export default withStyles(styles)(LoginPage)
