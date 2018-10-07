import React, { Component } from 'react'
import YouTube from 'react-youtube'
import Details from './Details'

class TrailerVideo extends Component {
  render() {
    const { videoId, itemData } = this.props
    const opts = {
      height: '390',
      width: '100%',
      playerVars: {
        autoplay: 1,
      },
    }
    console.log(itemData)
    return (
      <div className="video">
        <div className="videoWrapper">
          <YouTube videoId={videoId || ''} opts={opts} />
        </div>
        <Details data={itemData} />
      </div>
    )
  }
}

export default TrailerVideo
