import './index.css'

const NotFound = props => {
  const onNotFountPage = () => {
    const {history} = props
    history.replace('/')
  }
  return (
    <div className="not-found-container">
      <img
        src="https://res.cloudinary.com/nxt-wave-ganesh/image/upload/v1672649018/erroring_1_axnulm.png"
        alt="page not found"
        className="page-not-found"
      />
      <h1 className="not-found-heading">Page Not Found</h1>
      <p className="not-found-para">
        we are sorry, the page you requested could not be found. Please go back
        to the homepage.
      </p>
      <button
        type="button"
        className="not-found-button"
        onClick={onNotFountPage}
      >
        Home Page
      </button>
    </div>
  )
}

export default NotFound
