import React from 'react'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'

const styles = {
  marginTop: {
    marginTop: '32px'
  },
  card: {
    maxWidth: 345
  },
  media: {
    height: 140
  },
  fullHeight: {
    height: '100%',
    minHeight: '100%'
  }
}

const share = (item, url) => {
  navigator.share({
    title: item.title,
    text: item.title,
    url: 'https://baidu.com'
  })
}

const LotteryItem = (props) => {
  const {
    lotteryList,
    classes: {
      media,
      card,
      fullHeight
    },
    onLotteryComplete
  } = props
  const {
    params: {
      id
    }
  } = props.match || { params: { id: '' } }
  console.log(props)
  return (
    lotteryList.filter(({ id: itemId }) => (id === String(itemId))).map((item) => (
      <Grid
        container key={id} justify='center' alignItems='center'
        className={fullHeight}
      >
        <Grid item>
          <Card className={card}>
            <CardActionArea>
              <CardMedia
                className={media}
                image={item.img}
                title={item.title}
                component='img'
                style={{
                  height: '240px'
                }}
              />
              <CardContent>
                <Typography gutterBottom variant='h5' component='h2'>
                  {item.title}
                </Typography>
                <Typography component='p'>
                  {`发布者: ${item.author}`}
                </Typography>
                <Typography component='p' variant='caption'>
                  {`发布时间: ${new Date(item.publishTime)}`}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Grid container justify='space-around'>
                <Button variant='outlined' color='secondary'
                  disabled={item.disabled}
                  onClick={() => {
                    share(item)
                  }}
                >
                  分享
                </Button>
                <Button variant='outlined' color='primary'
                  disabled={item.disabled}
                  onClick={() => {
                    onLotteryComplete(item.id)
                  }}
                >
                  {item.disabled ? '已经抽奖完成' : '抽奖'}
                </Button>
              </Grid>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    ))
  )
}

export default withStyles(styles)(LotteryItem)
