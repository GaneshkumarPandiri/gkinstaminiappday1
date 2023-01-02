import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'

import Header from '../Header'

import './index.css'

const userProfileResponse = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class UserProfile extends Component {
  state = {
    userProfile: [],
    isLoadingUserProfile: true,
    userProfileResponseStatus: userProfileResponse.initial,
  }

  componentDidMount() {
    this.getUserProfile()
  }

  getUserProfile = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const userProfileAPIUrl = `https://apis.ccbp.in/insta-share/users/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(userProfileAPIUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const userDetails = data.user_details
      const convertedProfileData = {
        id: userDetails.id,
        userId: userDetails.user_id,
        userName: userDetails.user_name,
        userBio: userDetails.user_bio,
        profilePic: userDetails.profile_pic,
        followersCount: userDetails.followers_count,
        followingCount: userDetails.following_count,
        stories: userDetails.stories,
        posts: userDetails.posts,
        postsCount: userDetails.posts_count,
      }
      this.setState({
        userProfile: convertedProfileData,
        isLoadingUserProfile: false,
        userProfileResponseStatus: userProfileResponse.success,
      })
    } else {
      this.setState({
        isLoadingUserProfile: false,
        userProfileResponseStatus: userProfileResponse.failure,
      })
    }
  }

  // on success user profile view

  onSuccessUserProfile = () => {
    const {userProfile} = this.state
    const {
      userId,
      userName,
      userBio,
      profilePic,
      followersCount,
      followingCount,
      stories,
      posts,
      postsCount,
    } = userProfile
    return (
      <div>
        <div className="profile-description-container">
          <img
            src={profilePic}
            alt="user profile"
            className="profile-pic-user-profile"
          />
          <div>
            <h1 className="profile-name">{userName}</h1>
            <div className="details">
              <p className="specifications">{postsCount} posts</p>
              <p className="specifications">{followersCount} followers</p>
              <p className="specifications">{followingCount} following</p>
            </div>
            <p className="user-id">{userId}</p>
            <p className="bio">{userBio}</p>
          </div>
        </div>
        <ul className="user-profile-stories-container">
          {stories.map(item => (
            <li className="user-profile-story-background" key={item.id}>
              <img src={item.image} alt="user story" className="user-story" />
            </li>
          ))}
        </ul>
        <hr />
        <div className="posts-grid-container">
          <button type="button" className="grid-button">
            <BsGrid3X3 className="bs-grid" />
          </button>
          <h1 className="posts">Posts</h1>
        </div>
        {posts.length > 0 ? (
          <ul className="user-profile-posts">
            {posts.map(post => (
              <li key={post.id}>
                <img
                  src={post.image}
                  alt="user post"
                  className="user-profile-post"
                />
              </li>
            ))}
          </ul>
        ) : (
          <div className="no-posts-view">
            <div className="no-posts-camera">
              <BiCamera className="bi-camera" />
            </div>
            <h1 className="no-posts">No Posts Yet</h1>
          </div>
        )}
      </div>
    )
  }

  // on failure user profile view

  onRetryPosts = () => {
    this.setState({isLoadingUserProfile: true}, this.getUserProfile)
  }

  onFailureUserProfile = () => (
    <div className="response-failed-container-user-profile">
      <img
        src="https://res.cloudinary.com/nxt-wave-ganesh/image/upload/v1672649558/Group_7522_gzeezv.png"
        alt="failure view"
      />
      <p className="failure-my-profile-view">
        Something went wrong. Please try again
      </p>
      <button
        type="button"
        className="retry-button"
        onClick={this.onRetryPosts}
      >
        Try again
      </button>
    </div>
  )

  // render user profile

  renderUserProfile = () => {
    const {userProfileResponseStatus} = this.state
    switch (userProfileResponseStatus) {
      case userProfileResponse.success:
        return this.onSuccessUserProfile()
      case userProfileResponse.failure:
        return this.onFailureUserProfile()
      default:
        return null
    }
  }

  // render loader fro profile
  renderLoaderUserProfile = () => (
    <div className="loader-container-user-profile">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  render() {
    const {isLoadingUserProfile} = this.state
    return (
      <div>
        <Header />
        <div className="user-profile-container">
          {isLoadingUserProfile
            ? this.renderLoaderUserProfile()
            : this.renderUserProfile()}
        </div>
      </div>
    )
  }
}

export default UserProfile
