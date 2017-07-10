import React from 'react'
import PropTypes from 'prop-types'
import {container, title, slogan} from './Home.css'

export default function Home (props) {
  return (
    <div className={container}>
      <p className={title}>{'Duckr'}</p>
      <p className={slogan}>{'The real time, cloud based social platform. In the cloud.'}</p>
    </div>
  )
}
