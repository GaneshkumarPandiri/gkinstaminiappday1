import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsGrid3X3} from 'react-icons/bs'

import './index.css'

const myProfileResponse = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class MyProfile extends Component {
  state = {
    myProfile: [],
    isLoadingMyProfile: true,
    myProfileResponseStatus: myProfileResponse.initial,
  }

  componentDidMount() {
    this.getMyProfile()
  }

  getMyProfile = async () => {
    const myProfileAPIUrl = 'https://apis.ccbp.in/insta-share/my-profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(myProfileAPIUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const myProfileDetails = data.profile
      const convertedMyProfileData = {
        id: myProfileDetails.id,
        userId: myProfileDetails.user_id,
        userName: myProfileDetails.user_name,
        userBio: myProfileDetails.user_bio,
        profilePic: myProfileDetails.profile_pic,
        followersCount: myProfileDetails.followers_count,
        followingCount: myProfileDetails.following_count,
        stories: myProfileDetails.stories,
        posts: myProfileDetails.posts,
        postsCount: myProfileDetails.posts_count,
      }
      this.setState({
        myProfile: convertedMyProfileData,
        isLoadingMyProfile: false,
        myProfileResponseStatus: myProfileResponse.success,
      })
    } else {
      this.setState({
        isLoadingMyProfile: false,
        myProfileResponseStatus: myProfileResponse.failure,
      })
    }
  }

  // on success my profile view

  onSuccessMyProfile = () => {
    const {myProfile} = this.state
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
    } = myProfile
    return (
      <div>
        <div className="profile-description-container">
          <img
            src={profilePic}
            alt="my profile"
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
                alt="my story"
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
                alt="my post"
                key={post.id}
                className="user-profile-post"
              />
            </li>
          ))}
        </ul>
      </div>
    )
  }

  // on failure my profile view

  onRetryMyProfile = () => {
    this.setState({isLoadingMyProfile: true}, this.getMyProfile)
  }

  onFailureMyProfile = () => (
    <div className="response-failed-container-user-profile">
      <h1>Oops! Something Went Wrong</h1>
      <button
        type="button"
        className="retry-button"
        onClick={this.onRetryMyProfile}
      >
        Retry
      </button>
    </div>
  )

  // render my profile

  renderMyProfile = () => {
    const {myProfileResponseStatus} = this.state
    switch (myProfileResponseStatus) {
      case myProfileResponse.success:
        return this.onSuccessMyProfile()
      case myProfileResponse.failure:
        return this.onFailureMyProfile()
      default:
        return null
    }
  }

  // render loader loader my profile
  renderLoaderMyProfile = () => (
    <div className="loader-container-user-profile">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  render() {
    const {isLoadingMyProfile} = this.state
    return (
      <div className="user-profile-container">
        {isLoadingMyProfile
          ? this.renderLoaderMyProfile()
          : this.renderMyProfile()}
      </div>
    )
  }
}

export default MyProfile
