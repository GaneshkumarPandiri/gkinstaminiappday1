import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FaSearch} from 'react-icons/fa'

import './index.css'

const searchResultsResponse = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Header extends Component {
  state = {
    activeTab: 'Home',
    searchInput: '',
  }

  homeActive = () => {
    this.setState({activeTab: 'Home'})
  }

  profileActive = () => {
    this.setState({activeTab: 'Profile'})
  }

  onChangeInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onSearchPosts = () => {
    const {searchInput} = this.state
    const {history} = this.props
  }

  render() {
    const {activeTab} = this.state
    const {history} = this.props
    const onLogoutAccount = () => {
      Cookies.remove('jwt_token')
      history.replace('/login')
    }

    const home = 'active-tab'
    const profile = 'active-tab'

    return (
      <nav className="navbar">
        <div className="logo-container">
          <Link to="/" className="header-links-style">
            <img
              src="https://res.cloudinary.com/nxt-wave-ganesh/image/upload/v1672648742/Standard_Collection_8_wbkmcc.png"
              alt="website logo"
              className="logo-image-on-header"
            />
          </Link>
          <h1 className="logo-title">Insta Share</h1>
        </div>
        <div className="nav-controllers">
          <div className="search-input-container">
            <input
              type="search"
              placeholder="Search Caption"
              className="search-input"
              onChange={this.onChangeInput}
            />
            <button
              type="button"
              className="search-icon-button"
              onClick={this.onSearchPosts}
              // testid="searchIcon"
            >
              <FaSearch />
            </button>
          </div>
          <ul className="header-link-list-container">
            <Link
              to="/"
              className="header-links-style"
              onClick={this.homeActive}
            >
              <li className={`nav-item ${home}`}>Home</li>
            </Link>

            <Link
              to="/my-profile"
              className="header-links-style"
              onClick={this.profileActive}
            >
              <li className={`nav-item ${profile}`}>Profile</li>
            </Link>
          </ul>

          <button
            type="button"
            className="logout-desktop-btn"
            onClick={onLogoutAccount}
          >
            Logout
          </button>
        </div>
      </nav>
    )
  }
}

export default withRouter(Header)
