export default (that = null, snackbarMessage = '发生了一些错误', snackbarType = 'error', duration = 3000) => (
  new Promise((resolve, reject) => {
    that.setState({
      isSnackbarOpen: true,
      snackbarMessage: snackbarMessage,
      snackbarType: snackbarType,
      snackbarDuration: duration
    }, () => {
      resolve()
    })
  })
)
