import React from 'react'
import { Router, HashRouter, Route, BrowserRouter, Switch } from 'react-router-dom'
import { MainContainer, HomeContainer, AuthenticateContainer } from 'containers'

const routes = (
  <HashRouter>
    <Route path='/' component={MainContainer} />
  </HashRouter>
)

export default routes
