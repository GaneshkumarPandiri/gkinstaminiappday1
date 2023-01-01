import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsGrid3X3} from 'react-icons/bs'

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
    const {userId} = params
    const userProfileAPIUrl = `https://apis.ccbp.in/insta-share/users/${userId}`
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
            <div className="user-profile-story-background">
              <img
                src={item.image}
                alt="user story"
                key={item.id}
                className="user-story"
              />
            </div>
          ))}
        </ul>
        <hr />
        <div className="posts-grid-container">
          <button type="button" className="grid-button">
            <BsGrid3X3 className="bs-grid" />
          </button>
          <p className="posts">Posts</p>
        </div>
        <ul className="user-profile-posts">
          {posts.map(post => (
            <li>
              <img
                src={post.image}
                alt="user post"
                key={post.id}
                className="user-profile-post"
              />
            </li>
          ))}
        </ul>
      </div>
    )
  }

  // on failure user profile view

  onRetryPosts = () => {
    this.setState({isLoadingUserProfile: true}, this.getUserProfile)
  }

  onFailureUserProfile = () => (
    <div className="response-failed-container-user-profile">
      <h1>Oops! Something Went Wrong</h1>
      <button
        type="button"
        className="retry-button"
        onClick={this.onRetryPosts}
      >
        Retry
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
      <div className="user-profile-container">
        {isLoadingUserProfile
          ? this.renderLoaderUserProfile()
          : this.renderUserProfile()}
      </div>
    )
  }
}

export default UserProfile
