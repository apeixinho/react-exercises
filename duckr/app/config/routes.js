import React from 'react'
import { Router, HashRouter, Route, BrowserRouter, Switch } from 'react-router-dom'
import { MainContainer, HomeContainer, AuthenticateContainer } from 'containers'

export default function getRoutes(checkAuth) {
  return (
    <HashRouter>
      <Route path='/' component={MainContainer}/>
    </HashRouter>
  );
}
