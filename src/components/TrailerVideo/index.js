import React from 'react';
import YouTube from 'react-youtube';

class TrailerVideo extends React.Component {
    render() {
      const { videoId } = this.props;
      const opts = {
        height: '390',
        width: '640',
        playerVars: {
          autoplay: 1
        }
      };
      return (
        <div className="video">
            <YouTube
            videoId={videoId || ''}
            opts={opts}
            />
        </div>
      );
    }
  }


export default TrailerVideo;