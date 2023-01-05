import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FaSearch} from 'react-icons/fa'

import HeaderContext from '../../HeaderContext/headerContext'

import './index.css'

const Header = props => (
  <HeaderContext.Consumer>
    {value => {
      const {
        searchValue,
        activeTab,
        onChangeInput,
        onActiveHomeTab,
        onActiveProfileTab,
      } = value
      const {history, onSearchResultPosts} = props
      const onLogoutAccount = () => {
        Cookies.remove('jwt_token')
        history.replace('/login')
      }

      const onChangeSearchInput = event => {
        onChangeInput(event.target.value)
      }
      const onActiveHome = () => {
        onActiveHomeTab()
      }

      const onActiveProfile = () => {
        onActiveProfileTab()
      }
      const onSearchPosts = () => {
        onSearchResultPosts(searchValue)
      }

      const home = activeTab === 'Home' ? 'active-tab' : ''
      const profile = activeTab === 'Profile' ? 'active-tab' : ''

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
                onChange={onChangeSearchInput}
                value={searchValue}
              />
              <button
                type="button"
                className="search-icon-button"
                onClick={onSearchPosts}
                testid="searchIcon"
              >
                <FaSearch />
              </button>
            </div>
            <ul className="header-link-list-container">
              <Link
                to="/"
                className="header-links-style"
                onClick={onActiveHome}
              >
                <li className={`nav-item ${home}`}>Home</li>
              </Link>

              <Link
                to="/my-profile"
                className="header-links-style"
                onClick={onActiveProfile}
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
    }}
  </HeaderContext.Consumer>
)

export default withRouter(Header)
