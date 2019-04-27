import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Link
} from "react-router-dom";
import { connect } from 'react-redux';
import Gallery from '../../container/Gallery/Gallery';

class Home extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        const currentUser = this.props.currentUser;
        return(
            <div className="container">
                <div className="home">
                    <div className="home__text-box">
                    {
                        currentUser ? (
                            <React.Fragment>
                            
                            <span className="home__primary--main">
                                The best free stock photos & videos shared by talented creators.
                            </span>
    
                            <form action="#" className="search">
                                <input className="search__input home__search-input" placeholder="Search for free photos" />
                            </form>
    
                            <span className="home__primary--sub">
                                Suggested: girl, construction, business, flowers, architecture, city,  more
                            </span>
                            
                        </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <span className="home__signup-primary--main">
                                    Find your inspiration.
                                </span>
                                <span className="home__signup-primary--sub">
                                    Join the Flickr community, home to tens of billions of photos and 2 million groups.
                                </span>

                                <span className="home__signup-button">
                                <Link to="/signup">
                                    <button className="btn btn--white">Sign Up</button>
                                </Link>
                                </span>
                            </React.Fragment>
                        )

                    }
                    </div>
                </div>

                <Gallery />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    currentUser: state.currentUser
});

export default connect(mapStateToProps)(Home);