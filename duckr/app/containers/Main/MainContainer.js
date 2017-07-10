import React, {Component} from 'react'
import { Router, Route, HashRouter, Switch } from 'react-router-dom'
import { Navigation } from 'components'
import {HomeContainer} from 'containers'
import { container, innerContainer } from './MainContainer.css'

class MainContainer extends Component {
  render () {
    return (
      <div className={container}>
        <Navigation isAuthed={true}/>
        <div className={innerContainer}>
          <Switch>
            <Route component={HomeContainer}/>
          </Switch>
        </div>
      </div>
    )
  }
}

export default MainContainer
