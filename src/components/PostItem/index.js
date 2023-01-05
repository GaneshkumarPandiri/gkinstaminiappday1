import {Link} from 'react-router-dom'

import {FcLike} from 'react-icons/fc'
import {BsHeart} from 'react-icons/bs'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'

import './index.css'

const PostItem = props => {
  const {postItem, onClickLikePost, likedPostsList, likeCounting} = props
  const {
    userId,
    userName,
    profilePic,
    postId,
    createdAt,
    likesCount,
    comments,
    postDetails,
  } = postItem

  const onLikePost = () => {
    onClickLikePost(postId)
  }

  const isLikedPost = likedPostsList.includes(postId)
  let count
  if (isLikedPost) {
    count = likesCount + likeCounting
  } else {
    count = likesCount
  }

  return (
    <li className="post-item-container">
      <div className="post-by">
        <div className="profile-background">
          <img
            src={profilePic}
            alt="post author profile"
            className="profile-pic"
          />
        </div>
        <Link to={`/users/${userId}`} className="header-links-style">
          <p className="username">{userName}</p>
        </Link>
      </div>
      <img src={postDetails.image_url} alt="post" className="post-image" />
      <div className="post-reactions-container">
        {isLikedPost ? (
          <button
            testid="unLikeIcon"
            type="button"
            className="react-icons"
            onClick={onLikePost}
          >
            <FcLike className="fc-like" />
          </button>
        ) : (
          <button
            testid="likeIcon"
            type="button"
            className="react-icons"
            onClick={onLikePost}
          >
            <BsHeart className="bs-heart" />
          </button>
        )}

        <button type="button" className="react-icons">
          <FaRegComment className="fa-comment" />
        </button>
        <button type="button" className="react-icons">
          <BiShareAlt className="bi-share" />
        </button>
      </div>
      <p className="likes-count">{count} likes</p>
      <p className="caption">{postDetails.caption}</p>
      <ul>
        {comments.map(commentItem => (
          <li key={commentItem.user_id} className="comment-description">
            <p>
              <span className="commented-by">{commentItem.user_name}</span>
              &nbsp;&nbsp;
              {commentItem.comment}
            </p>
          </li>
        ))}
      </ul>
      <p className="time">{createdAt}</p>
    </li>
  )
}

export default PostItem
