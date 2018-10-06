import React from 'react'
import { Link } from 'gatsby'
import TrailerVideo from '../TrailerVideo'
import { sortData, createChunks } from '../../helpers'

class MovieCard extends React.Component {
  state = {
    show: false,
    videoId: '',
    data: [],
    keyId: '',
  }
  handleOnClick = (link, keyId, index) => e => {
    e.preventDefault()
    const videoId = link.split('?v=')[1].split('&')[0]
    this.setState({
      show: true,
      videoId,
      data: sortData(this.state.data, index),
      keyId,
    })
  }
  componentWillMount() {
    this.setState({
      data: createChunks(this.props.data),
    })
  }
  componentDidUpdate() {
    if (window)
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      })
  }
  render() {
    const { show, data, videoId, keyId } = this.state
    console.log(keyId)
    return (
      <div className="row">
        {show && <TrailerVideo videoId={videoId} />}
        {data.map((items, index) =>
          items.map(item => (
            <div className="example card" key={item.EventGroup}>
              <div
                className={`${
                  item.EventGroup === keyId ? 'wrapper selected' : 'wrapper'
                }`}
              >
                <div className="date">
                  <span className="day">
                    {item.DispReleaseDate.split(' ')[1].replace(',', '')}
                  </span>
                  <span className="month">
                    {item.DispReleaseDate.split(' ')[0].substr(0, 3)}
                  </span>
                  <span className="year">
                    {item.DispReleaseDate.split(' ')[2]}
                  </span>
                </div>
                <a
                  href="#"
                  className="noDecoration"
                  onClick={this.handleOnClick(
                    item.TrailerURL,
                    item.EventGroup,
                    index
                  )}
                >
                  <img
                    src={`https://in.bmscdn.com/events/moviecard/${
                      item.EventCode
                    }.jpg`}
                    alt="Movie title"
                  />
                  <div className="data">
                    <div className="content">
                      <span className="author">{item.EventLanguage}</span>
                      <div className="author">{item.EventGenre}</div>
                      <h1 className="title">
                        <a href="#">{item.EventName}</a>
                      </h1>
                    </div>
                  </div>
                </a>
              </div>
              <br />
            </div>
          ))
        )}
      </div>
    )
  }
}

export default MovieCard
