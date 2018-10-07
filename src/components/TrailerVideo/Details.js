import React from 'react'
import { formatVotes } from '../../helpers'

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
        <h4>
          <i className="fa fa-thumbs-o-up fa-1x" aria-hidden="true" />
          {` ${data.wtsPerc}%`}
        </h4>
        <p>
          {formatVotes(Number(data.wtsCount) + Number(data.dwtsCount))} votes
        </p>
      </div>
      <div className="block">
        <h4>
          <i className="fa fa-calendar fa-1x" aria-hidden="true" />
          {` ${data.ShowDate.split(',')[0]}`}
        </h4>
        <p>{data.ShowDate.split(',')[1]}</p>
      </div>
    </div>
    <div className="video-desc">
      <p>Any movie description goes here..................</p>
      <button>Read More</button>
    </div>
    <div className="user-reviews">
      <div className="block green">
        <i className="fa fa-thumbs-o-up fa-2x" aria-hidden="true" />
        <h4>WILL WATCH</h4>
        <p>({formatVotes(data.wtsCount)})</p>
      </div>
      <div className="block yellow">
        <i className="fa fa-question fa-2x" aria-hidden="true" />
        <h4>MAYBE</h4>
        <p>({formatVotes(data.maybeCount)})</p>
      </div>
      <div className="block red">
        <i className="fa fa-thumbs-o-down fa-2x" aria-hidden="true" />
        <h4>WONT'S WATCH</h4>
        <p>({formatVotes(data.dwtsCount)})</p>
      </div>
    </div>
  </div>
)
