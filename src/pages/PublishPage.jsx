import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import handleFormChangeFactor from '../utils/handleFormChangeFactor'

const styles = (theme) => ({
  input: {
    display: 'none'
  },
  button: {
    margin: theme.spacing.unit
  }
})

class PublishPage extends Component {
  render () {
    const {
      classes: {
        input,
        button
      }
    } = this.props
    const {
      imageURL,
      title
    } = this.state
    console.log(TextField)
    return (
      <>
        <Grid container justify='center' alignItems='center'>
          <Grid item>
            <TextField
              id='outlined-name'
              label='抽奖标题'
              value={title}
              onChange={this.changeTitle}
              margin='normal'
              variant='outlined'
            />
          </Grid>
        </Grid>
        <Grid container justify='center' alignItems='center'>
          <Grid item>
            <input
              accept='image/*'
              className={input}
              id='text-button-file'
              type='file'
              onChange={this.changeImage}
            />
            <label htmlFor='text-button-file'>
              <Button color='secondary' component='div' className={button}>
                上传图片
              </Button>
            </label>
          </Grid>
        </Grid>
        <Grid container justify='center' alignItems='center'>
          <Grid item>
            {imageURL && <img src={imageURL} height='240' />}
          </Grid>
        </Grid>
        <Grid container justify='center' alignItems='center'>
          <Grid item>
            <Button color='primary' variant='contained'
              className={button} onClick={this.publish}
            >
                发布抽奖
            </Button>
          </Grid>
        </Grid>
      </>
    )
  }

  state = {
    imageURL: '',
    title: ''
  }

  constructor (props) {
    super(props)
    this.changeTitle = handleFormChangeFactor(this, 'title')
  }

  changeImage = (event) => {
    const imageFile = event.target.files[0]
    const fileReader = new window.FileReader()
    fileReader.readAsDataURL(imageFile)
    fileReader.onload = () => {
      this.setState({
        imageURL: fileReader.result
      })
    }
  }

  publish = () => {
    const storage = window.localStorage
    const username = storage.getItem('username')
    const list = JSON.parse(storage.getItem('lotteryList'))
    const {
      imageURL,
      title
    } = this.state
    list.push({
      img: imageURL,
      title: title,
      author: username,
      publishTime: Date.now(),
      disabled: false,
      id: Math.floor(Math.random() * 100000000)
    })
    storage.setItem('lotteryList', JSON.stringify(list))
    setTimeout(() => {
      this.props.history.push('/user/lottery')
    }, 500)
  }
}

export default withStyles(styles)(PublishPage)
