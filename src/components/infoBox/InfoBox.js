import React from 'react'
import './InfoBox.scss'

const InfoBox = (props) => {
  const {bgColor, title, count, icon} = props;


    return (
    <div className={`info-box ${bgColor}`}>
      <span className='info-icon --color-white'>{icon}</span>
      <span>
        <p>{title}</p>
        <h4>{count}</h4>
      </span>
    </div>
  )
}

export default InfoBox
