import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import TrailerVideo from '../components/TrailerVideo'
import { getMoviesList, debounce } from '../helpers'

const data = require('../../data/list.json')
const list = getMoviesList(data)

class MoviesTrailers extends Component {
  constructor() {
    super()
    this.divRefs = {}

    this.showInfo = (index, link, key) =>
      this.renderInfo.bind(this, index, link, key)

    this.getDivRef = index => {
      this.divRefs[index] = React.createRef()
      return this.divRefs[index]
    }
    this.debouncedFn = debounce(this.resizeHandler.bind(this), 500)
  }
  /* keyId for active state */
  state = {
    keyId: '',
  }

  componentDidMount() {
    /* should debounce the function call. improves performance */
    window.addEventListener('resize', this.debouncedFn)
  }

  componentWillUnmount() {
    /* removing event listener */
    window.removeEventListener('resize', this.debouncedFn)
  }

  resizeHandler() {
    if (this.selectedIndex) {
      this.renderInfo(this.selectedIndex)
    }
  }

  deleteInfoNode() {
    /* Delete any if previous div in the DOM */
    const divToDelete = document.querySelector('.detail')
    if (divToDelete) {
      divToDelete.remove()
    }
  }

  createElement(index) {
    const detailDiv = document.createElement('div')
    detailDiv.classList = 'detail'
    detailDiv.id = index
    return detailDiv
  }

  renderInfo(index, link, key) {
    const videoId = link.split('?v=')[1].split('&')[0]
    /* setState for active item */
    this.setState({
      keyId: key,
    })

    if (list.length > 0) {
      this.deleteInfoNode()

      const prevItemY = this.divRefs[0].current.offsetTop
      let lastNodeIndex = 0
      for (let i = 0; i <= index; i++) {
        const divItem = this.divRefs[i]
        if (divItem.current.offsetTop !== prevItemY) {
          lastNodeIndex = parseInt(index / i) * i
          lastNodeIndex = lastNodeIndex < 0 ? 0 : lastNodeIndex
          break
        }
      }

      const lastNodeRow = this.divRefs[lastNodeIndex].current

      const detailDiv = this.createElement(index)
      console.log(detailDiv.offsetTop)
      lastNodeRow.parentNode.insertBefore(detailDiv, lastNodeRow)
      /* after appending div to dom attaching Video Component */
      ReactDOM.render(<TrailerVideo videoId={videoId} />, detailDiv)

      setTimeout(() => window.scrollBy(0, detailDiv.offsetTop - window.scrollY))
      this.selectedIndex = index
    }
  }

  render() {
    const { keyId } = this.state
    return (
      <div className="list">
        {list.map((item, index) => (
          <div
            ref={this.getDivRef(index)}
            onClick={this.showInfo(index, item.TrailerURL, item.EventGroup)}
            className="example card"
            key={item.EventGroup}
          >
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
              <img
                src={`https://in.bmscdn.com/events/moviecard/${
                  item.EventCode
                }.jpg`}
                alt={item.EventName}
              />
              <div className="data">
                <div className="content">
                  <span className="author">{item.EventLanguage}</span>
                  <div className="author">{item.EventGenre}</div>
                  <h1 className="title">{item.EventName}</h1>
                </div>
              </div>
            </div>
            <br />
          </div>
        ))}
      </div>
    )
  }
}

export default MoviesTrailers
