import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {isLoginFail: false, errorMessage: '', username: '', password: ''}

  onLoginAccount = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const loginAPIUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(loginAPIUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onLoginSuccess(data.jwt_token)
    } else {
      this.onLoginFailure(data.error_msg)
    }
  }

  onLoginSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onLoginFailure = errorMessage => {
    this.setState({isLoginFail: true, errorMessage})
  }

  onUsernameInput = event => {
    this.setState({username: event.target.value})
  }

  onPasswordInput = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {isLoginFail, errorMessage, username, password} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-page-main-container">
        <form className="log-in-form-container" onSubmit={this.onLoginAccount}>
          <img src="" alt="" />
          <h1 className="logo-heading-on-form">Insta Share</h1>
          <label htmlFor="username" className="label">
            USERNAME
          </label>
          <input
            type="text"
            className="login-input-field"
            placeholder="Username"
            value={username}
            onChange={this.onUsernameInput}
          />
          <label htmlFor="password" className="label">
            PASSWORD
          </label>
          <input
            type="password"
            className="login-input-field"
            placeholder="Password"
            value={password}
            onChange={this.onPasswordInput}
          />
          <button type="submit" className="submit-button">
            Submit
          </button>
          {isLoginFail && <p className="error-msg">*{errorMessage}</p>}
        </form>
      </div>
    )
  }
}

export default Login
