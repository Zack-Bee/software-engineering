import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import classNames from 'classnames'
import FormControl from '@material-ui/core/FormControl'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

const styles = theme => ({
  textField: {
    flexBasis: 200
  },
  margin: {
    margin: theme.spacing.unit
  }
})

class PasswordInput extends Component {
  render () {
    const { classes } = this.props
    return (
      <FormControl className={classNames(classes.textField, classes.margin)}>
        <InputLabel htmlFor={this.props.inputId}>
          {this.props.label}
        </InputLabel>
        <Input
          autoFocus={this.props.autoFocus}
          id={this.props.inputId}
          type={this.state.showPassword ? 'text' : 'password'}
          value={this.props.password || ''}
          onChange={this.props.onChange}
          endAdornment={
            <InputAdornment position='end'>
              <IconButton
                aria-label='Toggle password visibility'
                onClick={this.handleClickShowPassword}
              >
                {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    )
  }

  constructor (props) {
    super(props)
    this.state = {
      showPassword: false
    }
    this.handleClickShowPassword = this.handleClickShowPassword.bind(this)
  }

  handleClickShowPassword () {
    this.setState({
      showPassword: !this.state.showPassword
    })
  }
}

export default withStyles(styles)(PasswordInput)
