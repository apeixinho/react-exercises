import React from 'react'
import PropTypes from 'prop-types'
import styles from './Logout.css'

export default function Logout(props) {
  return (
    <div className={styles.text}>
      {'You are now logged out'}
    </div>
  )
}
