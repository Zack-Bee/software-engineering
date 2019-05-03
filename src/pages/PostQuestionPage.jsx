import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import get from '../utils/get'
import post from '../utils/post'
import config from '../../config/config'
import ColorSnackbar from '../components/ColorSnackbar.jsx'
import openSnackbar from '../utils/openSnackbar'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import AddIcon from '@material-ui/icons/AddCircleOutline'
import UploadIcon from '@material-ui/icons/CloudUpload'
import postFormData from '../utils/postFormData'

const styles = theme => ({
  root: {
    display: 'flex'
  },
  formControl: {
    margin: theme.spacing.unit * 3
  },
  group: {
    margin: `${theme.spacing.unit}px 0`
  },
  input: {
    display: 'none'
  }
})

class PostQuestionPage extends Component {
  render () {
    const { classes } = this.props

    return (
      <div>
        <form id='form'>
          <Grid container justify='center'>
            {this.state.questionCategoryList.length === 0
              ? (<p>暂无题目分类, 请点击下方按钮添加</p>)
              : <FormControl component='fieldset' className={classes.formControl}>
                <FormLabel component='legend'>
                  {
                    this.state.questionCategoryList.length === 0
                      ? ('暂无题目分类, 请点击下方按钮添加')
                      : ('题目分类')
                  }
                </FormLabel>
                <RadioGroup
                  aria-label='category'
                  name='category'
                  className={classes.group}
                  value={this.state.questionCategory}
                  onChange={this.selectQuestionCategory}
                >
                  {this.state.questionCategoryList.map((type) => (
                    <FormControlLabel key={type}
                      value={type} control={<Radio />} label={type} />
                  ))}
                </RadioGroup>
              </FormControl>
            }
          </Grid>
          <Grid container justify='center'>
            <Button variant='contained' color='secondary' onClick={this.openDialog}>
                        添加分类
              <AddIcon className={classes.rightIcon} />
            </Button>
          </Grid>
          <Grid container justify='center'>
            <FormControl component='fieldset' className={classes.formControl}>
              <FormLabel component='legend'>题目类型</FormLabel>
              <RadioGroup
                aria-label='Gender'
                name='questionType'
                className={classes.group}
                value={this.state.questionType}
                onChange={this.selectQuestionType}
              >
                <FormControlLabel value='singleChoice' control={<Radio />} label='单选题' />
                <FormControlLabel value='multipleChoice' control={<Radio />} label='多选题' />
              </RadioGroup>
            </FormControl>
            <FormControl component='fieldset' className={classes.formControl}>
              <FormLabel component='legend'>内容类型</FormLabel>
              <RadioGroup
                aria-label='Gender'
                name='contentType'
                className={classes.group}
                value={this.state.contentType}
                onChange={this.selectContentType}
              >
                <FormControlLabel value='static' control={<Radio />} label='static' />
                <FormControlLabel value='JavaScript' control={<Radio />} label='JavaScript' />
                <FormControlLabel value='shell' control={<Radio />} label='shell' />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid container justify='center'>
            <input
              name='files'
              accept='image/*'
              className={classes.input}
              id='contained-button-file'
              multiple
              type='file'
              onChange={this.selectFile}
            />
            <label htmlFor='contained-button-file'>
              <Button variant='contained' component='span' className={classes.button}>
                            选择图片
              </Button>
            </label>
          </Grid>
          <Grid container justify='center'>
            <div>{this.state.fileList.length === 0
              ? (<p>暂未选择文件</p>)
              : (this.state.fileList.map((file, index) => (
                <p key={index}>文件名: {file.name}</p>
              )
              ))}
            </div>
          </Grid>
          <Grid container justify='center'>
            <div>
              <p>描述</p>
              <textarea name='description' rows='10' cols='50'
                onChange={this.setDescription}
                value={this.state.description}
              />
            </div>
            <div>
              <p>选项</p>
              <textarea name='choice' rows='10' cols='50'
                onChange={this.setChoice}
                value={this.state.choice}
              />
            </div>
            <div>
              <p>答案</p>
              <textarea name='answer' rows='10' cols='50'
                onChange={this.setAnswer}
                value={this.state.answer}
              />
            </div>
          </Grid>
          <ColorSnackbar onClose={this.closeSnackBar}
            type={this.state.snackbarType}
            message={this.state.snackbarMessage}
            open={this.state.isSnackbarOpen}
            autoHideDuration={3000}
          />
          <Grid container justify='center' className={classes.group}>
            <Button variant='contained' color='primary' onClick={this.postQuestion}>
                        上传题目
              <UploadIcon className={classes.rightIcon} />
            </Button>
          </Grid>
        </form>
        <Dialog
          open={this.state.isDialogOpen}
          onClose={this.closeDialog}
          aria-labelledby='form-dialog-title'
        >
          <DialogTitle id='form-dialog-title'>添加题目类别</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin='dense'
              label='题目类别名称'
              type='text'
              fullWidth
              value={this.state.questionCategory}
              onChange={this.setQuestionCategory}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeDialog} color='primary'>
                            取消
            </Button>
            <Button onClick={this.addQuestionCategory} color='primary'>
                            添加
            </Button>
          </DialogActions>
        </Dialog>
      </div >
    )
  }

  constructor (props) {
    super(props)
    this.state = {
      contentType: 'static',
      questionType: 'singleChoice',
      fileList: [],
      category: [],
      questionCategoryList: [],
      isSnackbarOpen: false,
      snackbarMessage: '',
      snackbarType: 'success',
      questionCategory: '',
      isDialogOpen: false,
      choice: '',
      description: '',
      answer: ''
    }

    this.selectContentType = this.selectContentType.bind(this)
    this.selectQuestionType = this.selectQuestionType.bind(this)
    this.selectFile = this.selectFile.bind(this)
    this.closeSnackBar = this.closeSnackBar.bind(this)
    this.openDialog = this.openDialog.bind(this)
    this.closeDialog = this.closeDialog.bind(this)
    this.addQuestionCategory = this.addQuestionCategory.bind(this)
    this.setQuestionCategory = this.setQuestionCategory.bind(this)
    this.selectQuestionCategory = this.selectQuestionCategory.bind(this)
    this.postQuestion = this.postQuestion.bind(this)
    this.setDescription = this.setDescription.bind(this)
    this.setAnswer = this.setAnswer.bind(this)
    this.setChoice = this.setChoice.bind(this)
  }

  componentDidMount () {
    this.getQuestionCategoryList()
  }

  postQuestion () {
    if (this.state.questionCategory === '') {
      openSnackbar(this, '未选择题目分类', 'warning')
      return
    }
    if (this.state.contentType !== 'static') {
      if (this.state.answer === '' || this.state.choice === '') {
        openSnackbar(this, '未提供答案或者选项', 'warning')
        return
      }
    }
    const formData = new window.FormData()
    for (let file of this.state.fileList) {
      formData.append('files', file)
    }
    formData.set('description', this.state.description)
    formData.set('answer', this.state.answer)
    formData.set('choice', this.state.choice)
    formData.set('contentType', this.state.contentType)
    formData.set('questionType', this.state.questionType)
    formData.set('category', this.state.questionCategory)
    postFormData(config.postQuestionRoutr, formData).then((res) => (
      res.json()
    )).then((res) => {
      console.log(res)
      if (res.isSuccess) {
        openSnackbar(this, '上传题目成功', 'success')
        this.setState({
          description: '',
          choice: '',
          answer: ''
        })
      } else {
        openSnackbar(this, res.err, 'error')
      }
    })
  }

  setAnswer (event) {
    this.setState({
      answer: event.target.value
    })
  }

  setDescription (event) {
    this.setState({
      description: event.target.value
    })
  }

  setChoice (event) {
    this.setState({
      choice: event.target.value
    })
  }

  addQuestionCategory () {
    if (this.state.questionCategory.includes(' ')) {
      openSnackbar(this, '题目类别名称中不允许含有空格', 'warning')
      return
    }
    if (this.state.questionCategory.length === 0) {
      openSnackbar(this, '题目类别名称中不允许为空', 'warning')
      return
    }
    post(config.addQuestionCategoryRouter, {
      category: this.state.questionCategory
    }).then((res) => (
      res.json()
    )).then((res) => {
      if (res.isSuccess) {
        this.getQuestionCategoryList()
        this.closeDialog()
      } else {
        openSnackbar(this, res.err, 'error')
      }
    })
  }

  setQuestionCategory (event) {
    this.setState({
      questionCategory: event.target.value
    })
  }

  selectQuestionType (event) {
    this.setState({
      questionType: event.target.value
    })
  }

  openDialog () {
    this.setState({
      isDialogOpen: true
    })
  }

  closeDialog () {
    this.setState({
      isDialogOpen: false
    })
  }

  selectContentType (event) {
    this.setState({
      contentType: event.target.value
    })
  }

  selectQuestionCategory (event) {
    this.setState({
      questionCategory: event.target.value
    })
  }

  selectFile (event) {
    this.setState({
      fileList: [...event.target.files]
    })
  }

  getQuestionCategoryList () {
    return get(config.getQuestionCategoryListRouter).then((res) => (
      res.json()
    )).then((res) => {
      if (res.isSuccess) {
        this.setState({
          questionCategoryList: res.questionCategoryList
        })
      } else {
        openSnackbar(this, res.err, 'error')
      }
    })
  }

  closeSnackBar () {
    this.setState({
      isSnackbarOpen: false
    })
  }
}

export default withStyles(styles)(PostQuestionPage)
