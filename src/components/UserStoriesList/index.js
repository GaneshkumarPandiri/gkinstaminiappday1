import Slider from 'react-slick'

import './index.css'

const UserStoriesList = props => {
  const {userStoriesList} = props

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  }

  return (
    <div className="main-container">
      <div className="slick-container">
        <Slider {...settings}>
          {userStoriesList.map(story => (
            <div className="slick-item" key={story.userId}>
              <img
                src={story.storyUrl}
                alt="user story"
                className="story-image"
              />
              <p className="story-name">{story.userName}</p>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  )
}

export default UserStoriesList
