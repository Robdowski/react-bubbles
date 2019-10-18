import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import BubblePage from './components/BubblePage'
import PrivateRoute from './utils/PrivateRoute'

import Login from "./components/Login";
import "./styles.scss";

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" render={props => <Login {...props} />} />
        <PrivateRoute path='/bubbles' component={BubblePage} />
      </div>
    </Router>
  );
}

export default App;
