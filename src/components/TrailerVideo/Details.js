import React from 'react'

export default ({ data }) => (
  <div className="videoDetails">
    <div>
      <h4>{data.EventName}</h4>
      <h6>{data.EventLanguage}</h6>
    </div>
    <div>
      {data.EventGenre.split('|').map((type, index) => (
        <label key={String(index)}>{type}</label>
      ))}
    </div>
    <div className="dates-and-votes">
      <div className="block">
        <h4>{data.wtsPerc} %</h4>
        <p>{Number(data.wtsCount) + Number(data.dwtsCount)} votes</p>
      </div>
      <div className="block">
        <h4>{data.ShowDate.split(',')[0]}</h4>
        <p>{data.ShowDate.split(',')[1]}</p>
      </div>
    </div>
    <div className="video-desc">
      <p>Any movie description goes here..................</p>
      <button>Read More</button>
    </div>
    <div className="user-reviews">
      <div className="block green">
        <h4>WILL WATCH</h4>
        <p>({data.wtsCount})</p>
      </div>
      <div className="block yellow">
        <h4>MAYBE</h4>
        <p>({data.maybeCount})</p>
      </div>
      <div className="block red">
        <h4>WONT'S WATCH</h4>
        <p>({data.dwtsCount})</p>
      </div>
    </div>
  </div>
)
