import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FaSearch} from 'react-icons/fa'

import './index.css'

const Header = props => {
  const {history} = props
  const onLogoutAccount = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  /*
  let activeNav
  const onActiveNavItemHome = () => {
    activeNav = 'Home'
  }

  const onActiveNavItemProfile = () => {
    activeNav = 'Profile'
  }
*/
  return (
    <nav className="navbar">
      <Link to="/" className="header-links-style">
        <h1 className="logo-heading-in-header">Insta Share</h1>
      </Link>
      <div className="nav-controllers">
        <div className="search-input-container">
          <input
            type="search"
            placeholder="Search Caption"
            className="search-input"
          />
          <button type="button" className="search-icon-button">
            <FaSearch />
          </button>
        </div>
        <ul className="header-link-list-container">
          <Link to="/" className="header-links-style">
            <li className="nav-item">Home</li>
          </Link>

          <Link to="/my-profile" className="header-links-style">
            <li className="nav-item">Profile</li>
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

export default withRouter(Header)
