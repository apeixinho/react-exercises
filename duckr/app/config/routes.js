import React from "react";
import { Router, Route, HashRouter } from "react-router-dom";
import { MainContainer } from "../containers";


const routes = (
  <HashRouter>
    <Route path="/" component={MainContainer}/>
  </HashRouter>
)

export default routes;