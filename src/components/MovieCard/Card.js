import React from 'react'

export default ({ item, keyId }) => (
  <div
    className={`${item.EventGroup === keyId ? 'wrapper selected' : 'wrapper'}`}
  >
    <div className="date">
      <span className="day">
        {item.DispReleaseDate.split(' ')[1].replace(',', '')}
      </span>
      <span className="month">
        {item.DispReleaseDate.split(' ')[0].substr(0, 3)}
      </span>
      <span className="year">{item.DispReleaseDate.split(' ')[2]}</span>
    </div>
    <img
      src={`https://in.bmscdn.com/events/moviecard/${item.EventCode}.jpg`}
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
)
