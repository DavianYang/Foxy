import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Link
} from "react-router-dom";
import { connect } from "react-redux";
import iconSet from '../../../img/selection.json';
import IcomoonReact, {iconList} from 'icomoon-react';

import { insertPhotos } from '../../../actions/photosAction';
import { fetchUsers } from '../../../actions/usersAction';
import ImageInput from '../ImageInput/ImageInput';

class NewPhotoForm extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            selectedFile: null,
            completeUploadPhoto: false
        };
    }

    fileSelectHandler = e => {
        e.preventDefault();

        console.log(e.target.files[0]);
        this.setState({
            selectedFile: e.target.files[0]
        });
    }

    fileUploadHandler = (e) => {
        e.preventDefault();

        const photo = this.state.selectedFile;
        const currentUser = this.props.currentUser;
        if(currentUser){
            this.props.insertPhotos(photo, currentUser, () => {
                this.setState({
                    completeUploadPhoto: true
                });
            });
        } else if(!currentUser){
            alert('Please Log in!!')
        } 

    }

    render(){
        const progress = this.props;
        console.log('Complete Upload Photo: ',this.state.completeUploadPhoto);
        console.log(progress);
        return(
            <div className="section-form">
                <div className="row">
                    <div className="card">
                        <div className="card__form">
                            <form className="form" onChange={this.fileSelectHandler}>
                                <h2 className="card__heading u-margin-bottom-medium">
                                    Upload Your Photos
                                </h2>

                                <div className="form__group">
                                    <ul className="form__list">
                                        <li className="form__list-item">
                                        Your uploads will be distributed for free under the Pexels license. <Link to="/">Learn more</Link>
                                        </li>

                                        <li className="form__list-item">
                                        Ensure that people who are the main subject agreed to publish your photo or video.
                                        </li>

                                        <li className="form__list-item">
                                        We'll review your submission and if it's selected, you'll get an email notification. Then it'll be featured on our home page and in the search.
                                        </li>
                                    </ul>
                                </div>

                                <div className="form__group">
                                
                                        <ImageInput
                                        className="form__upload-photo"
                                        name="avatarURL"
                                        maxHeight={64}
                                        value="upload"
                                        /> 
                                    
                                        {/* <React.Fragment>
                                            <div className="loader">
                                             <IcomoonReact iconSet={iconSet} icon="cw" className="loader__icon"/>
                                            </div>
                                        </React.Fragment> */}

                                </div>

                                <div className="form__group">
                                    <button className="btn btn--primary" onClick={this.fileUploadHandler}>Upload</button>
                                </div>
                            </form>
                        </div>
                    </div>
            </div>
        </div>
        )
    }
}

const mapStateToProps = state => ({
    currentUser: state.currentUser,
    photos: state.photos,
});

const mapDispatchToProps = {
    insertPhotos,
    fetchUsers
};

export default connect(mapStateToProps, mapDispatchToProps)(NewPhotoForm);