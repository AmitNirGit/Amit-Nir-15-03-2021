// import logo from "./logo.svg";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NotFound from "../src/components/helpers/NotFound";
import Home from "../src/components/page1/Home";
import Stores from "./components/page2/Stores";
import NavBar from "../src/components/helpers/NavBar";

// import "./App.css";
const ArchiveContext = React.createContext();
const ParchusedContext = React.createContext();
const StoreContext = React.createContext();
const CurrencyContext = React.createContext();

function App() {
  return (
    <Router>
      <>
        <NavBar />
        <Switch>
          <Route exact path='/'>
            <Home />
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
