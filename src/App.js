import './App.css';
import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import Paperbase from './components/Paperbase';
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register'

const App = () => {
  return (
        <Router>
          <Switch>
            <Route path="/" component={Paperbase} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </Switch>
        </Router>
        // <div>
        //   <Paperbase />
        // </div>
  );
};

export default App;
