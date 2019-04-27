import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Link
} from "react-router-dom";
import iconSet from '../../../img/selection.json';
import IcomoonReact, {iconList} from 'icomoon-react';

import { connect } from 'react-redux';

class Navigation extends React.Component{
  constructor(props){
    super(props);
  }

    render(){
      const currentUser = this.props.currentUser;
        return(
            <header className="header">
            <Link to="/"><IcomoonReact iconSet={iconSet} icon="firefox" className="logo"/></Link>
            
              <form action="#" className="search">
                <input className="search__input" placeholder="Search for free photos" />
              </form>

              <nav className="user-nav">
                  {
                    currentUser ? (
                      <React.Fragment>
                        <Link to="/photos/new">
                        <div className="user-nav__upload">
                          <span className="user-nav__upload-text">Upload</span>
                        </div>
                        </Link>

                        <Link to="#">
                        <div className="user-nav__likes">
                        <IcomoonReact iconSet={iconSet} icon="heart" className="user-nav__icon"/>
                        </div>
                        </Link>

                        <div className="user-nav__user">
                        <span className="user-nav__user-name">{currentUser.name}</span>
                        </div>  
                      </React.Fragment>                        
                    ) : (
                      <React.Fragment>
                          <Link to="/login">
                          <div className="user-nav__login">
                            <span className="user-nav__login-text">Login</span>
                          </div>
                          </Link>

                          <Link to="/signup">
                          <div className="user-nav__signup">
                            <span className="user-nav__signup-text">Sign Up</span>
                          </div>
                          </Link>
                      </React.Fragment>
                    )
                  }

                  {/* { currentUser && (
                        <div className="user-nav__user">
                        <span className="user-nav__user-name">{currentUser.name}</span>
                      </div>                    
                  )
                  } */}
              </nav>
            </header>
        )
    }
}

const mapStateToProps = (state) => ({
    currentUser: state.currentUser
});


export default connect(mapStateToProps)(Navigation);