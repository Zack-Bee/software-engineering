import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Transition } from 'react-transition-group'
import classNames from 'classnames'

const styles = {
  entering: {
    opacity: '0!important'
  },
  entered: {
    opacity: '1!important'
  },
  exiting: {
    opacity: '0!important'
  },
  exited: {
    opacity: '0!important'
  },
  default: {
    transition: `opacity 300ms linear`,
    opacity: '1'
  }
}

class Fade extends Component {
  render () {
    const { classes, exit, className, children } = this.props
    return (
      <Transition in={this.props.in} unmountOnExit exit={exit} timeout={300}>
        {(state) => (
          <div className={classNames(classes.default, classes[state], className)}>
            {children}
          </div>
        )}
      </Transition>
    )
  }
}

export default withStyles(styles)(Fade)
