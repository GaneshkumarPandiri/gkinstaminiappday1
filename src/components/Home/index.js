import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'

import PostItem from '../PostItem'
import UserStoriesList from '../UserStoriesList'

import './index.css'

// user stories status initialization
const userStoriesResponse = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

// user posts status initialization
const postsListResponse = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  // maintaining state for both users stories and posts list

  state = {
    userStoriesList: [],
    isLoadingStories: true,
    userStoriesResponseStatus: userStoriesResponse.initial,
    postsList: [],
    isLoadingPosts: true,
    postsListResponseStatus: postsListResponse.initial,
    likedPostsList: [],
    likeCounting: 0,
  }

  // mounting user stories and posts list

  componentDidMount() {
    this.getUserStories()
    this.getPostsList()
  }

  // getting user stories start

  getUserStories = async () => {
    const userStoriesAPIUrl = 'https://apis.ccbp.in/insta-share/stories'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(userStoriesAPIUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const convertedStoriesData = data.users_stories.map(story => ({
        userId: story.user_id,
        userName: story.user_name,
        storyUrl: story.story_url,
      }))
      this.setState({
        userStoriesList: convertedStoriesData,
        isLoadingStories: false,
        userStoriesResponseStatus: userStoriesResponse.success,
        likeCounting: 1,
      })
    } else {
      this.setState({
        isLoadingStories: false,
        userStoriesResponseStatus: userStoriesResponse.failure,
        likeCounting: -1,
      })
    }
  }

  // stories slick success view

  onSuccessStoriesResponse = () => {
    const {userStoriesList} = this.state
    return <UserStoriesList userStoriesList={userStoriesList} />
  }

  // stories slick failed view
  onRetryStories = () => {
    this.setState({isLoadingStories: true}, this.getUserStories)
  }

  onFailureStoriesResponse = () => (
    <div className="response-failed-container-stories">
      <img
        src="https://res.cloudinary.com/nxt-wave-ganesh/image/upload/v1672649241/alert-triangle_qj59vs.png"
        alt="failure view"
      />
      <h1 className="fail-posts">Something went wrong. Please try again</h1>
      <button
        type="button"
        className="retry-button"
        onClick={this.onRetryStories}
      >
        Try again
      </button>
    </div>
  )

  // stories slick status

  renderStoriesSlick = () => {
    const {userStoriesResponseStatus} = this.state
    switch (userStoriesResponseStatus) {
      case userStoriesResponse.success:
        return this.onSuccessStoriesResponse()
      case userStoriesResponse.failure:
        return this.onFailureStoriesResponse()
      default:
        return null
    }
  }

  // getting user stories end

  // getting posts list start

  getPostsList = async () => {
    const postsListAPIUrl = 'https://apis.ccbp.in/insta-share/posts'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(postsListAPIUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const convertedPostsList = data.posts.map(post => ({
        userId: post.user_id,
        userName: post.user_name,
        profilePic: post.profile_pic,
        postId: post.post_id,
        createdAt: post.created_at,
        likesCount: post.likes_count,
        comments: post.comments,
        postDetails: post.post_details,
      }))
      this.setState({
        postsList: convertedPostsList,
        isLoadingPosts: false,
        postsListResponseStatus: postsListResponse.success,
      })
    } else {
      this.setState({
        isLoadingPosts: false,
        postsListResponseStatus: postsListResponse.failure,
      })
    }
  }

  // ON Like Post

  onClickLikePost = async postId => {
    const {likedPostsList} = this.state
    let like
    if (likedPostsList.includes(postId)) {
      like = false
    } else {
      like = true
    }
    const jwtToken = Cookies.get('jwt_token')
    const postLikeAPI = `https://apis.ccbp.in/insta-share/posts/${postId}/like`
    const likeStatus = {
      like_status: like,
    }
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(likeStatus),
    }
    const response = await fetch(postLikeAPI, options)
    console.log(response)

    if (!likedPostsList.includes(postId)) {
      this.setState(prevState => ({
        likedPostsList: [...prevState.likedPostsList, postId],
      }))
    } else {
      const updatedLikedList = likedPostsList.filter(item => item !== postId)
      this.setState({likedPostsList: updatedLikedList})
    }
  }

  // On success post render

  onSuccessPostsResponse = () => {
    const {postsList, likedPostsList, likeCounting} = this.state
    return (
      <ul>
        {postsList.map(postItem => (
          <PostItem
            postItem={postItem}
            onClickLikePost={this.onClickLikePost}
            likedPostsList={likedPostsList}
            likeCounting={likeCounting}
            key={postItem.postId}
          />
        ))}
      </ul>
    )
  }

  onRetryPosts = () => {
    this.setState({isLoadingPosts: true}, this.getPostsList)
  }

  onFailurePostsResponse = () => (
    <div className="response-failed-container-posts">
      <img
        src="https://res.cloudinary.com/nxt-wave-ganesh/image/upload/v1672649241/alert-triangle_qj59vs.png"
        alt="failure view"
      />

      <h1 className="fail-posts">Something went wrong. Please try again</h1>
      <button
        type="button"
        className="retry-button"
        onClick={this.onRetryPosts}
      >
        Try again
      </button>
    </div>
  )

  renderPostsList = () => {
    const {postsListResponseStatus} = this.state
    switch (postsListResponseStatus) {
      case userStoriesResponse.success:
        return this.onSuccessPostsResponse()
      case userStoriesResponse.failure:
        return this.onFailurePostsResponse()
      default:
        return null
    }
  }

  // rendering loader for both users stories and posts list

  renderLoaderUserSlick = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#4094EF" height={25} width={25} />
    </div>
  )

  renderLoaderPostsList = () => (
    <div className="loader-container-posts">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  render() {
    const {isLoadingStories, isLoadingPosts} = this.state
    return (
      <div>
        <Header />
        <div className="home-container">
          {isLoadingStories
            ? this.renderLoaderUserSlick()
            : this.renderStoriesSlick()}
          {isLoadingPosts
            ? this.renderLoaderPostsList()
            : this.renderPostsList()}
        </div>
      </div>
    )
  }
}

export default Home
