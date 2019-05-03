export default (that, field) => (event) => {
  that.setState({
    [field]: event.target.value
  })
}
