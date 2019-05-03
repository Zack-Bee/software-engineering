import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import Radio from '@material-ui/core/Radio'
import Typography from '@material-ui/core/Typography'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup'
import Checkbox from '@material-ui/core/Checkbox'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import StarIcon from '@material-ui/icons/Star'
import red from '@material-ui/core/colors/red'
import green from '@material-ui/core/colors/green'
import yellow from '@material-ui/core/colors/yellow'
import blue from '@material-ui/core/colors/blue'
import CircularProgress from '@material-ui/core/CircularProgress'

// import Fade from './Fade.jsx'

const styles = (theme) => ({
  red: {
    color: red[700]
  },
  green: {
    color: green[500]
  },
  yellow: {
    color: yellow[700]
  },
  infoBar: {
    margin: '16px 0'
  },
  actions: {
    margin: '16px 0'
  },
  analysisContent: {
    marginTop: '16px',
    width: '80%',
    [theme.breakpoints.up('sm')]: {
      width: '60%'
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

const convertContentToElement = (content) => {
  switch (content.type) {
    case 'plainText': {
      return (
        <span key={content.contain}>{content.contain}</span>
      )
    }
    case 'latex': {
      return (
        <InlineMath key={content.contain} math={content.contain} />
      )
    }
    case 'image': {
      return (
        <img key={content.contain} src={content.contain} />
      )
    }
    default: {
      return (
        <span key={content.contain}>{content.contain}</span>
      )
    }
  }
}

const setSingleAnswerFactory = setAnswer => event => {
  setAnswer(event.target.value)
}

const setMultipleAnswerFactory = (setAnswer, answer) => value => {
  if (answer.includes(value)) {
    setAnswer(answer.filter((val) => (val !== value)))
  } else {
    setAnswer(answer.concat(value))
  }
}

const convertIndexToAlpha = (index) => {
  const aCharCode = 'A'.charCodeAt(0)
  return String.fromCharCode(aCharCode + index)
}

const Question = (props) => {
  const {
    classes: {
      yellow,
      green,
      red,
      infoBar,
      actions,
      analysisContent,
      buttonProgress,
      relative
    },
    description,
    choice,
    answer,
    questionType,
    setAnswer,
    onSubmit,
    level,
    restTime,
    analysis,
    isAnalysisShow,
    isSubmitButtonShow,
    isNextQuestionButtonShow,
    onNextQuestion,
    isLoadingAnswer
  } = props
  const setSingleAnswer = setSingleAnswerFactory(setAnswer)
  const setMultipleAnswer = setMultipleAnswerFactory(setAnswer, answer)
  const starts = []
  for (let i = 0, count = Math.ceil(level * 5); i < count; i++) {
    if (count <= 2) {
      starts.push(<StarIcon className={green} key={green + i} />)
    } else if (count <= 4) {
      starts.push(<StarIcon className={yellow} key={yellow + i} />)
    } else {
      starts.push(<StarIcon className={red} key={red + i} />)
    }
  }
  return (
    <React.Fragment>
      <Grid container justify='space-around' className={infoBar}>
        <Grid item>
          <Grid container justify='center' alignItems='center' spacing={8}>
            <Grid item>
              <Typography variant='subtitle1'>题目难度:</Typography>
            </Grid>
            <Grid item>
              {starts}
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container justify='center' alignItems='center' spacing={8}>
            <Grid item>
              <Typography variant='caption'>本轮练习剩余时间:</Typography>
            </Grid>
            <Grid item>
              <Typography variant='subtitle1'>{restTime}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container justify='center'>
        <Grid item>
          <Typography paragraph variant='h6'>
            {description.map(convertContentToElement)}
          </Typography>
        </Grid>
      </Grid>
      <Grid container justify='center'>
        <Grid item>
          {
            questionType === 'singleChoice' ? (
              <RadioGroup
                aria-label='question'
                name='question'
                value={answer}
                onChange={setSingleAnswer}
              >
                {choice.map((choice, index) => (
                  <FormControlLabel key={index}
                    value={convertIndexToAlpha(index)}
                    control={<Radio />}
                    label={
                      <div>
                        <span>{convertIndexToAlpha(index) + '、 '} </span>
                        {choice.map(convertContentToElement)}
                      </div>
                    } />
                ))}
              </RadioGroup>
            ) : (
              <FormGroup>
                {choice.map((choice, index) => {
                  const value = convertIndexToAlpha(index)
                  return (
                    <FormControlLabel key={value}
                      value={value}
                      control={
                        <Checkbox checked={answer.includes(value)}
                          onChange={setMultipleAnswer(value)}
                          value={value}
                        />
                      }
                      label={
                        <div>
                          <span>{value + '、 '} </span>
                          {choice.map(convertContentToElement)}
                        </div>
                      }
                    />
                  )
                })}
              </FormGroup>
            )
          }
        </Grid>
      </Grid>
      <Grid container justify='center' className={actions}>
        <Grid item>
          {isSubmitButtonShow && <div className={relative}>
            <Button
              variant='contained'
              color='primary'
              disabled={isLoadingAnswer}
              onClick={onSubmit}
            >
              {isLoadingAnswer ? '正在提交' : '提交答案'}
            </Button>
            {isLoadingAnswer && <CircularProgress size={24}
              className={buttonProgress} />
            }
          </div>}
          {isNextQuestionButtonShow ? <Button color='primary' variant='contained' onClick={onNextQuestion}>
            下一题
          </Button> : null}
        </Grid>
      </Grid>
      {isAnalysisShow ? <Grid container justify='center'>
        <Grid item className={analysisContent}>
          <Typography align='center' variant='subtitle1'>题目解析</Typography>
        </Grid>
        <Grid item className={analysisContent}>
          {analysis.map(convertContentToElement)}
        </Grid>
      </Grid> : null
      }
    </React.Fragment>
  )
}

export default withStyles(styles)(Question)
