import { hot } from 'react-hot-loader/root'
import React from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import 'typeface-roboto'
import CssBaseline from '@material-ui/core/CssBaseline'
import { MuiThemeProvider } from '@material-ui/core/styles'
import './index.css'
import UserPage from './pages/UserPage.jsx'
import theme from './themes/theme'
import HomePage from './pages/HomePage.jsx'
import Fade from './components/Fade.jsx'
import SignupPage from './pages/SignupPage.jsx'

const App = () => (
  <Router>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Route path='/'
        exact strict
        children={({ match, history, location }) => (
          <Fade in={match !== null} exit>
            <HomePage
              history={history}
            />
          </Fade>
        )}
      />
      <Route path='/user'
        children={({ match, history, location }) => (
          <Fade in={match !== null} exit>
            <UserPage
              match={match}
              history={history}
              location={location}
            />
          </Fade>
        )}
      />
      <Route path='/signup'
        children={({ match, history, location }) => (
          <Fade in={match !== null} exit>
            <SignupPage history={history} />
          </Fade>
        )}
      />
    </MuiThemeProvider>
  </Router>
)

export default hot(App)
