import React, { Component, createRef } from 'react'
import Tooltip from '@material-ui/core/Tooltip'

class Captcha extends Component {
  render () {
    const {
      className,
      title
    } = this.props
    return (
      <Tooltip
        title={title}
        aria-label='click'
        placement='top'
      >
        <img
          onClick={this.freshCaptcha}
          src={this.state.imageUrl}
          className={className}
          ref={this.image}

        />
      </Tooltip>
    )
  }

  state = {
    imageUrl: '/api/validate/captcha'
  }

  constructor (props) {
    super(props)
    this.image = createRef()
  }

  componentDidMount () {
    this.freshCaptcha()
  }

  freshCaptcha = () => {
    window.fetch('/api/validate/captcha', {
      headers: {
        'Cache-Control': 'no-cache'
      }
    }).then((res) => (
      res.blob()
    )).then((image) => {
      const prevImageUrl = this.state.imageUrl
      const imageUrl = URL.createObjectURL(image)
      this.setState({
        imageUrl
      }, () => {
        URL.revokeObjectURL(prevImageUrl)
      })
    })
  }

  componentWillUnmount () {
    URL.revokeObjectURL(this.state.imageUrl)
  }
}

export default Captcha
