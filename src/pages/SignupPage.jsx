import React, { Component, createRef } from 'react'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
// import PhoneNumberIcon from '@material-ui/icons/PhoneIphone'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import StepContent from '@material-ui/core/StepContent'
import Button from '@material-ui/core/Button'
import classNames from 'classnames'
import logo from '../icon/icon.png'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import PasswordInput from '../components/PasswordInput.jsx'
import ColorSnackbar from '../components/ColorSnackbar.jsx'
// import post from '../utils/post'
import openSnackbar from '../utils/openSnackbar'
import AccountCircle from '@material-ui/icons/AccountCircle'
import handleFormChangeFactor from '../utils/handleFormChangeFactor'
import validate from '../utils/validate'
// import md5 from 'md5'
// import statusTable from '../utils/statusTable'
// import Captcha from '../components/Captcha.jsx'

const styles = (theme) => ({
  alignCenter: {
    display: 'flex',
    justifyContent: 'center'
  },
  marginLeftAndRight: {
    margin: '0 24px'
  },
  padding: {
    padding: '20px 0'
  },
  marginTopAndBottom: {
    margin: '12px 0'
  },
  root: {
    [theme.breakpoints.down('500')]: {
      width: '100vw'
    },
    [theme.breakpoints.up('500')]: {
      width: '450px'
    }
  },
  stepperRoot: {
    width: '100%'
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  actionsContainer: {
    marginTop: theme.spacing.unit * 2,
    display: 'flex',
    justifyContent: 'flex-end'
  },
  resetContainer: {
    padding: theme.spacing.unit * 3
  },
  twoButtonContainer: {
    marginTop: theme.spacing.unit * 2,
    display: 'flex',
    justifyContent: 'space-between'
  },
  fullScreenHeight: {
    minHeight: '100vh'
  },
  fullHeight: {
    height: '100%'
  },
  captcha: {
    height: '32px',
    cursor: 'pointer'
  }
})

class SginupPage extends Component {
  render () {
    const {
      classes: {
        alignCenter,
        // fullHeight,
        fullScreenHeight,
        twoButtonContainer,
        button,
        stepperRoot,
        root,
        marginTopAndBottom,
        padding,
        marginLeftAndRight
        // captcha
      }
    } = this.props
    // let text = '输入图片验证码'
    // if (this.state.isDisabledSendCode) {
    //   if (this.state.isCodeSended) {
    //     text = `${this.state.remainTime}s后可再次获取验证码`
    //   } else {
    //     text = '正在发送验证码, 请稍等'
    //   }
    // }
    return (
      <Grid
        container
        alignItems='center'
        justify='center'
        alignContent='center'
        className={fullScreenHeight}
      >
        <Grid item>
          <div className={root}>
            <Paper>
              <div className={marginLeftAndRight}>
                <div className={classNames(alignCenter, padding)}>
                  <img width='40' height='40' src={logo} />
                </div>
                <div className={alignCenter}>
                  <Typography variant='h6'>
                    注册
                  </Typography>
                </div>
                <div className={classNames(alignCenter, marginTopAndBottom)}>
                  <Typography>
                    开始使用『抽多多』
                  </Typography>
                </div>
                <div className={stepperRoot}>
                  <Stepper activeStep={this.state.activeStep} orientation='vertical'>
                    <Step key={0}>
                      <StepLabel>设置用户名</StepLabel>
                      <StepContent>
                        <Typography variant='caption'>
                          初始昵称与用户名相同, 登录后可以修改
                        </Typography>
                        <Grid container spacing={8} alignItems='flex-end'>
                          <Grid item>
                            <AccountCircle />
                          </Grid>
                          <Grid item>
                            <TextField autoFocus
                              label='用户名'
                              value={this.state.username}
                              onChange={this.setUsername}
                              helperText='3到32位英文, 数字或下划线组成'
                            />
                          </Grid>
                        </Grid>
                        <div className={twoButtonContainer}>
                          <div>
                            <Button
                              variant='contained'
                              color='secondary'
                              onClick={this.goToLogin}
                              className={button}
                            >
                              去登陆
                            </Button>
                          </div>
                          <div>
                            <Button
                              variant='contained'
                              color='primary'
                              onClick={this.completeUsername}
                              className={button}
                            >
                              下一步
                            </Button>
                          </div>
                        </div>
                      </StepContent>
                    </Step>
                    <Step key={1}>
                      <StepLabel>设置密码</StepLabel>
                      <StepContent>
                        <Typography variant='caption'>
                          设置你的密码, 长度不少于8位
                        </Typography>
                        <PasswordInput label='密码'
                          inputId='password'
                          autoFocus
                          password={this.state.password}
                          onChange={this.setPassword}
                        />
                        <PasswordInput label='确认密码'
                          inputId='comfirmPassword'
                          password={this.state.comfirmPassword}
                          onChange={this.setComfirmPassword}
                          defaultValue={this.state.comfirmPassword || ''}
                        />
                        <div className={twoButtonContainer}>
                          <Button
                            variant='contained'
                            color='secondary'
                            onClick={this.prevStep}
                            className={button}
                          >
                            上一步
                          </Button>
                          <Button
                            variant='contained'
                            color='primary'
                            onClick={this.completeSignup}
                            className={button}
                            disabled={this.state.isLoading}
                          >
                            完成注册
                          </Button>
                        </div>
                      </StepContent>
                    </Step>
                    {/* <Step key={2}>
                      <StepLabel>填写手机号</StepLabel>
                      <StepContent>
                        <Typography variant='caption'>
                          用于找回密码, 修改信息等操作, 仅限中国大陆手机号
                        </Typography>
                        <Grid container spacing={8} alignItems='flex-end'>
                          <Grid item>
                            <PhoneNumberIcon />
                          </Grid>
                          <Grid item>
                            <TextField autoFocus
                              label='手机号'
                              value={this.state.phoneNumber}
                              onChange={this.setPhoneNumber}
                            />
                          </Grid>
                        </Grid>
                        <div className={twoButtonContainer}>
                          <div>
                            <Button
                              variant='contained'
                              color='secondary'
                              onClick={this.prevStep}
                              className={button}
                            >
                              上一步
                            </Button>
                          </div>
                          <div>
                            <Button
                              variant='contained'
                              color='primary'
                              onClick={this.completePhoneNumber}
                              className={button}
                            >
                              下一步
                            </Button>
                          </div>
                        </div>
                      </StepContent>
                    </Step> */}
                    {/* <Step key={3}>
                      <StepLabel>获取短信验证码</StepLabel>
                      <StepContent>
                        <Typography variant='caption'>
                          {text}
                        </Typography>
                        <Grid
                          container
                          justify='space-between'
                          spacing={16}
                          alignItems='center'>
                          <Grid item>
                            <TextField
                              label='图片验证码'
                              placeholder='请输入验证码'
                              helperText='点击右侧图片刷新'
                              value={this.state.captcha}
                              onChange={this.setCaptcha}
                            />
                          </Grid>
                          <Grid item>
                            <Captcha ref={this.captchaRef} className={captcha} title='点击图片刷新验证码' />
                          </Grid>
                        </Grid>
                        <Grid
                          container
                          justify='space-between'
                          spacing={16}
                          alignContent='center'
                        >
                          <Grid item>
                            <TextField autoFocus
                              label='短信验证码'
                              value={this.state.code}
                              onChange={this.setCode}
                              helperText='点击右侧按钮获取短信验证码'
                            />
                          </Grid>
                          <Grid item>
                            <Grid container alignItems='stretch'
                              justify='center' alignContent='center'
                              className={fullHeight}>
                              <Grid item>
                                <Button
                                  variant='outlined'
                                  color='primary'
                                  size='small'
                                  onClick={this.getCode}
                                  disabled={this.state.isDisabledSendCode}
                                >
                                  发送短信
                                </Button>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid> */}
                    {/* </StepContent> */}
                    {/* </Step> */}
                  </Stepper>
                </div>
              </div>
            </Paper>
            <ColorSnackbar onClose={this.closeSnackBar}
              type={this.state.snackbarType}
              autoHideDuration={4000}
              open={this.state.isSnackbarOpen}
              message={this.state.snackbarMessage}
            />
          </div>
        </Grid>
      </Grid>
    )
  }

  state = {
    activeStep: 0,
    username: '',
    password: '',
    comfirmPassword: '',
    phoneNumber: '',
    captcha: '',
    snackbarType: 'warning',
    snackbarMessage: '',
    code: '',
    isCodeSended: false,
    remainTime: 30,
    isDisabledSendCode: false,
    isSnackbarOpen: false,
    isLoading: false,
    imageUrl: `/validate/captcha`
  }

  constructor (props) {
    super(props)
    this.setPhoneNumber = handleFormChangeFactor(this, 'phoneNumber')
    this.setComfirmPassword = handleFormChangeFactor(this, 'comfirmPassword')
    this.setPassword = handleFormChangeFactor(this, 'password')
    this.setUsername = handleFormChangeFactor(this, 'username')
    this.setCode = handleFormChangeFactor(this, 'code')
    this.setCaptcha = handleFormChangeFactor(this, 'captcha')
    this.image = createRef()
    this.captchaRef = createRef()
  }

  componentDidMount () {

  }

  closeSnackBar = () => {
    this.setState({
      isSnackbarOpen: false
    })
  }

  prevStep = () => {
    this.setState({
      activeStep: this.state.activeStep - 1
    })
  }

  completeUsername = () => {
    const { username } = this.state
    const validateInfo = validate.username(username)
    if (validateInfo !== true) {
      openSnackbar(this, validateInfo, 'warning')
      return
    }
    this.setState({
      activeStep: this.state.activeStep + 1
    })
  }

  completeSignup = () => {
    const {
      username,
      password,
      isLoading,
      comfirmPassword
    } = this.state
    const validatePasswordInfo = validate.password(password)
    const validateComfirmPasswordInfo = validate.comfirmPassword(password, comfirmPassword)
    if (validatePasswordInfo !== true) {
      openSnackbar(this, validatePasswordInfo, 'warning')
      return
    }
    if (validateComfirmPasswordInfo !== true) {
      openSnackbar(this, validateComfirmPasswordInfo, 'warning')
      return
    }
    if (isLoading) {
      return
    }
    this.setState({
      isLoading: true
    })
    setTimeout(() => {
      this.setState({
        isLoading: false
      })
      openSnackbar(this, '注册成功, 正在为您跳转到首页', 'success').then(() => {
        window.localStorage.setItem('username', username)
        window.localStorage.setItem('password', password)
        window.localStorage.setItem('isLogin', true)
        setTimeout(() => {
          this.props.history.push('/user/lottery')
        }, 500)
      })
    }, 1000)
    // post('/api/user/register', {
    // username,
    // code,
    // nickname: username,
    // phone: phoneNumber,
    // education: '小学',
    // password: md5(password)
    // }).then((res) => (
    // res.json()
    // )).then((res) => {
    // if (res.status === 0) {
    // openSnackbar(this, '注册成功, 正在为您跳转到首页', 'success').then(() => {
    // setTimeout(() => {
    // this.props.history.push('/user/lottery')
    // }, 500)
    // })
    // } else {
    // openSnackbar(this, statusTable[res.status], 'error')
    // let activeStep = 3
    // switch (res.status) {
    // case 105: {
    // activeStep = 0
    // break
    // }
    // default: {
    // activeStep = 3
    // this.captchaRef.current.freshCaptcha()
    // }
    // }
    // this.setState({
    // isLoading: false,
    // activeStep
    // })
    // }
    // })
  }

  goToLogin = () => {
    this.props.history.push('/')
  }
}

export default withStyles(styles)(SginupPage)
