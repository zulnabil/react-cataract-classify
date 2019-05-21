import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import KNNClassify from './KNNClassify'
import ExtractFeature from './ExtractFeature'
import './App.css';


class App extends Component {
  render() {
    return (
      <Router>
          <Switch>
            <Route exact path="/" component={KNNClassify} />
            <Route path="/add-sample/" component={ExtractFeature} />
          </Switch>
      </Router>
    );
  }
}

export default App;
