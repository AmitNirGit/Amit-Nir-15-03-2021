// import logo from "./logo.svg";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NotFound from "../src/components/helpers/NotFound";
import Home from "../src/components/page1/Home";
import ContainerPage1 from "../src/components/page1/Container";
import Stores from "./components/page2/Stores";
import NavBar from "../src/components/helpers/NavBar";
import { useSelector, useDispatch } from "react-redux";
import { useDataLayerValue } from "./Data/DataLayer";
import { get } from "./network";
const axios = require("axios");

function App() {
  return (
    <Router>
      <>
        <NavBar />
        <Switch>
          <Route exact path='/'>
            <ContainerPage1 />
          </Route>
          <Route path='/stores'>
            <Stores />
          </Route>
          <Route path='*'>
            <NotFound />
          </Route>
        </Switch>
      </>
    </Router>
  );
}

export default App;
