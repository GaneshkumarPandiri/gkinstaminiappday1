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
    searchInput: '',
    isSearchResults: false,
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
    const {userStoriesResponseStatus, isSearchResults} = this.state

    if (!isSearchResults) {
      switch (userStoriesResponseStatus) {
        case userStoriesResponse.success:
          return this.onSuccessStoriesResponse()
        case userStoriesResponse.failure:
          return this.onFailureStoriesResponse()
        default:
          return null
      }
    }
    return null
  }

  // getting user stories end

  // getting posts list start

  getPostsList = async () => {
    const {searchInput} = this.state
    const postsListAPIUrl = `https://apis.ccbp.in/insta-share/posts?search=${searchInput}`
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
    const {
      postsList,
      likedPostsList,
      likeCounting,
      isSearchResults,
    } = this.state
    if (postsList.length > 0) {
      return (
        <>
          {isSearchResults && (
            <h1 className="search-results-heading">Search Results</h1>
          )}
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
        </>
      )
    }
    return (
      <div className="no-search-results-container">
        <img
          src="https://res.cloudinary.com/nxt-wave-ganesh/image/upload/v1672813165/Group_lce97o.png"
          alt="search not found"
          className="search-not-fount-image"
        />
        <h1 className="no-search-heading">Search Not Found</h1>
        <p className="no-search-para">Try different keyword or search again</p>
      </div>
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

      <p className="fail-posts">Something went wrong. Please try again</p>
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

  renderLoaderUserSlick = () => {
    const {isSearchResults} = this.state
    if (!isSearchResults) {
      return (
        <div testid="loader" className="loader-container">
          <Loader type="TailSpin" color="#4094EF" height={25} width={25} />
        </div>
      )
    }
    return null
  }

  renderLoaderPostsList = () => (
    <div testid="loader" className="loader-container-posts">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  onResetHome = () => {
    this.setState(
      {isSearchResults: false, isLoadingPosts: true},
      this.getPostsList,
    )
  }

  onSearchResultPosts = value => {
    this.setState(
      {searchInput: value, isSearchResults: true, isLoadingPosts: true},
      this.getPostsList,
    )
  }

  render() {
    const {isLoadingStories, isLoadingPosts} = this.state
    return (
      <div>
        <Header
          onSearchResultPosts={this.onSearchResultPosts}
          onResetHome={this.onResetHome}
        />
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
