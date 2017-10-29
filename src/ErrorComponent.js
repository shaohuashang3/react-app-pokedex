import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import './App.css';


class ErrorComponent extends Component {
  render() {
    return (
        <div>
            <h3>404 - Not Found</h3>   
            <div><h3><Link to={`/`}>Back to Home</Link></h3></div>
        </div>
    );
  }
}

export default ErrorComponent;