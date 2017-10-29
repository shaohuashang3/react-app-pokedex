import React, { Component } from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    Redirect
  } from "react-router-dom";

import logo from './pokeball_template_by_poke_lab.png';

import Pokemons from './Pokemons';
import ErrorComponent from './ErrorComponent';


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1>
              {this.props.title}
            </h1>
            <cite>
              Brought to you by {this.props.author} on{" "}
              {this.props.now.toDateString()}
            </cite>
          </div>
        
          <div className="App-body">
            <Switch>
              <Route path="/pokemon/" component={Pokemons} />
              <Route path="/error" component={ErrorComponent}/>
              <Redirect from="/" to="/pokemon/page/0"/>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;




