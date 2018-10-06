import React from 'react'
import ReactDOM from 'react-dom'
import TrailerVideo from '../components/TrailerVideo'
import { getMoviesList } from '../helpers'

const data = require('../../data/list.json')
const list = getMoviesList(data)

const debounce = (callBack, delay) => {
  let timerId = null
  return () => {
    if (timerId) {
      clearTimeout(timerId)
      timerId = null
    }
    timerId = setTimeout(callBack, delay)
  }
}

class MoviesTrailers extends React.Component {
  constructor() {
    super()
    this.divRefs = {}

    this.showInfo = (index, link) => this.renderInfo.bind(this, index, link)

    this.getDivRef = index => {
      this.divRefs[index] = React.createRef()
      return this.divRefs[index]
    }

    this.debouncedFn = debounce(this.resizeHandler.bind(this), 500)
  }

  state = {
    show: false,
    videoId: '',
    data: [],
    keyId: '',
  }

  componentDidMount() {
    // should debounce the function call. Do not want to import lodash
    window.addEventListener('resize', this.debouncedFn)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.debouncedFn)
  }

  resizeHandler() {
    if (this.selectedIndex) {
      this.renderInfo(this.selectedIndex)
    }
  }

  deleteInfoNode() {
    // Delete any of the previous div
    const divToDelete = document.querySelector('.info')
    if (divToDelete) {
      divToDelete.remove()
    }
  }

  renderInfo(index, link) {
    const videoId = link.split('?v=')[1].split('&')[0]
    if (list.length > 0) {
      this.deleteInfoNode()

      let prevItemY = this.divRefs[0].current.offsetTop
      let lastNodeIndexOfEligibleRow = 0
      for (let i = 0; i <= index; i++) {
        const divItem = this.divRefs[i]
        if (divItem.current.offsetTop !== prevItemY) {
          lastNodeIndexOfEligibleRow = parseInt(index / i) * i

          lastNodeIndexOfEligibleRow =
            lastNodeIndexOfEligibleRow < 0 ? 0 : lastNodeIndexOfEligibleRow
          break
        }
      }

      const lastNodeOfEligibleRow = this.divRefs[lastNodeIndexOfEligibleRow]
        .current

      var infoDiv = this.createElement(index)
      console.log(infoDiv)
      lastNodeOfEligibleRow.parentNode.insertBefore(
        infoDiv,
        lastNodeOfEligibleRow
      )
      const divWrap = document.getElementById(index)
      divWrap.scrollIntoView(true)
      ReactDOM.render(<TrailerVideo videoId={videoId} />, divWrap)
      this.selectedIndex = index
    }
  }

  createElement(index) {
    const infoDiv = document.createElement('div')
    infoDiv.classList = ['info']
    infoDiv.id = index
    return infoDiv
  }

  render() {
    const { keyId } = this.state
    return (
      <div className="list">
        {list.map((item, index) => (
          <div
            ref={this.getDivRef(index)}
            onClick={this.showInfo(index, item.TrailerURL)}
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
            </div>
            <br />
          </div>
        ))}
      </div>
    )
  }
}

export default MoviesTrailers
