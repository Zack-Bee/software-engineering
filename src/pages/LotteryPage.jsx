import React, { Component } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import Fade from '../components/Fade.jsx'
import ColorSnackbar from '../components/ColorSnackbar.jsx'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import ListSubheader from '@material-ui/core/ListSubheader'
import IconButton from '@material-ui/core/IconButton'
import InfoIcon from '@material-ui/icons/Info'
import { Route, NavLink } from 'react-router-dom'
import LotteryItem from './LotteryDetail.jsx'

const styles = (theme) => ({
  whiteSpace: {
    whiteSpace: 'pre-line'
  },
  marginTop: {
    marginTop: '16px'
  },
  paper: {
    [theme.breakpoints.up('md')]: {
      minWidth: '400px',
      minHeight: '250px'
    }
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)'
  },
  fullHeight: {
    height: '100%',
    minHeight: '100%'
  }
})

class LotteryPage extends Component {
  render () {
    const {
      classes: {
        whiteSpace,
        marginTop,
        paper,
        root,
        gridList,
        icon,
        fullHeight
      }
    } = this.props
    const {
      url,
      path
    } = this.props.match || {}
    const {
      lotteryList,
      dialogTitle,
      dialogText
    } = this.state
    return (
      <React.Fragment>
        <Route path={url} exact strict children={({ match }) => (
          <Fade in={match !== null} timeout={300} exit={false} className={`${marginTop} ${fullHeight}`}>
            <div className={root}>
              <GridList cellHeight={180} className={gridList} spacing={16}>
                <GridListTile key='Subheader' cols={2} style={{ height: 'auto' }}>
                  <ListSubheader component='div'>奖品列表</ListSubheader>
                </GridListTile>
                {lotteryList.filter(item => !item.disabled).map(item => (
                  <GridListTile key={item.id}>
                    <img src={item.img} alt={item.title} />
                    <GridListTileBar
                      title={item.title}
                      subtitle={<span>发布者: {item.author}</span>}
                      actionIcon={
                        <NavLink to={`${path}/${item.id}`} onClick={this.closeDrawer}>
                          <IconButton className={icon}>
                            <InfoIcon />
                          </IconButton>
                        </NavLink>
                      }
                    />
                  </GridListTile>
                ))}
              </GridList>
            </div>
          </Fade>
        )} />
        <Route path={`${url}/:id`} children={({ match }) => (
          <Fade in={match !== null} timeout={300} exit={false} className={fullHeight}>
            <LotteryItem
              match={match}
              lotteryList={lotteryList}
              onLotteryComplete={this.completeLottery}
            />
          </Fade>
        )} />
        <Dialog
          classes={{
            paper: paper
          }}
          open={this.state.isDialogOpen}
          onClose={this.goBack}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>
            {dialogTitle}
          </DialogTitle>
          <DialogContent>
            <DialogContentText align='center'
              id='alert-dialog-description'
              className={whiteSpace}
            >
              {dialogText}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.goBack} color='primary' autoFocus>
              确认
            </Button>
          </DialogActions>
        </Dialog>
        <ColorSnackbar onClose={this.closeSnackBar}
          type={this.state.snackbarType}
          message={this.state.snackbarMessage}
          open={this.state.isSnackbarOpen}
          autoHideDuration={this.state.snackbarDuration}
        />
      </React.Fragment>
    )
  }

  constructor (props) {
    super(props)

    this.state = {
      isSnackbarOpen: false,
      isDialogOpen: false,
      lotteryList: JSON.parse(window.localStorage.getItem('lotteryList')),
      dialogText: '',
      dialogTitle: ''
    }
  }

  goBack = () => {
    this.setState({
      isDialogOpen: false
    })
    this.props.history.push('/user/lottery')
  }

  completeLottery = (id) => {
    const { lotteryList } = this.state
    this.setState({
      lotteryList: lotteryList.map((item) => {
        if (item.id === id) {
          item.disabled = true
        }
        return item
      })
    }, () => {
      window.localStorage.setItem('lotteryList', JSON.stringify(this.state.lotteryList))
    })
    if (Math.random() > 0.8) {
      this.setState({
        isDialogOpen: true,
        dialogText: '恭喜你中奖了',
        dialogTitle: '恭喜你中奖了'
      })
    } else {
      this.setState({
        isDialogOpen: true,
        dialogText: '很抱歉没中奖',
        dialogTitle: '很抱歉没中奖'
      })
    }
  }
}

export default withStyles(styles)(LotteryPage)
