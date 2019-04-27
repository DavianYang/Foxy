import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Link
} from "react-router-dom";

import Navigation from './components/presentational/Navigation/Navigation';
import Home from './components/presentational/Home/Home';
import Footer from './components/presentational/Footer/Footer'

import SignUpForm from './components/auth/SignUpForm/SignUpForm';
import LoginForm from './components/auth/LoginForm/LoginForm';

import NewPhotoForm from './components/container/NewPhotoForm/NewPhotoForm';
import { connect } from 'react-redux';

class App extends React.Component {
  constructor(props){
    super(props);
  }

  render() {

    return (
      <Router>
        <div className="App">
            <Navigation />
            <Route
              path="/"
              exact
              component={Home} />
            <Route 
              path="/signup"
              component={SignUpForm}/>

            <Route 
              path="/login"
              component={LoginForm} />

            <Route 
              path="/photos/new"
              component={NewPhotoForm}/>
            <Footer />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser
});

export default connect(mapStateToProps)(App);
