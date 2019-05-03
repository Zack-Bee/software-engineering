export default {
  username: (username) => {
    if (username === '') {
      return '请输入用户名'
    } else {
      return /^\w{3,32}$/.test(username) || '用户名为3到32个字母数字下划线组合'
    }
  },
  password: (password) => {
    if (password.length === 0) {
      return '请输入密码'
    } else if (password.length < 8) {
      return '为了账号的安全, 密码长度不得小于8位'
    } else {
      return /^\S{8,32}$/.test(password) || '密码长度应为8到32位的字符'
    }
  },
  comfirmPassword: (password, comfirmPassword) => {
    if (comfirmPassword !== password) {
      return '两次密码输入不一致, 请重新输入'
    } else {
      return true
    }
  },
  phoneNumber: (phoneNumber) => (
    /^1[34578]\d{9}$/.test(phoneNumber) || '请输入正确的中国大陆手机号'
  )
}
