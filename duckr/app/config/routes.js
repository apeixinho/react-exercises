import React from 'react'
import { Router, Route, HashRouter, Switch } from 'react-router-dom'
import { MainContainer, HomeContainer } from 'containers'

const routes = (
  <HashRouter>
    <Route path='/' component={MainContainer} />
  </HashRouter>
)

export default routes
