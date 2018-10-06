import React from 'react'
import Card from './Card'
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
  componentDidUpdate() {
    if (window)
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      })
  }
  componentDidMount = () => {
    this.setState({
      data: createChunks(this.props.data),
    })
  }

  render() {
    const { show, data, videoId, keyId } = this.state
    return (
      <div className="row">
        {show && <TrailerVideo videoId={videoId} />}
        {data.map((items, index) =>
          items.map(item => (
            <div className="example card" key={item.EventGroup}>
              <Card item={item} keyId={keyId} />
              <br />
            </div>
          ))
        )}
      </div>
    )
  }
}

export default MovieCard
