import React, {Component} from 'react'
import { Router, Route, HashRouter, Switch } from 'react-router-dom'
import { Navigation } from 'components'
import { HomeContainer, AuthenticateContainer } from 'containers'
import { container, innerContainer } from './MainContainer.css'

class MainContainer extends Component {
  render () {
    return (
      <div className={container}>
        <Navigation isAuthed={false}/>
        <div className={innerContainer}>
          <Switch>
            <Route path='/auth' component={AuthenticateContainer}/>
            <Route component={HomeContainer}/>
          </Switch>
        </div>
      </div>
    )
  }
}

export default MainContainer
