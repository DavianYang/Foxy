import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Link
} from "react-router-dom";
import Popup from '../Popup/Popup';
import { connect } from 'react-redux';
import { fetchPhotos } from '../../../actions/photosAction';
import { timeStampToDate } from '../../../utilities/utilities';
import { addLike, fetchLike, deleteLike } from '../../../actions/likesAction';

import iconSet from '../../../img/selection.json';
import IcomoonReact, {iconList} from 'icomoon-react';
import { POINT_CONVERSION_COMPRESSED } from 'constants';

class Gallery extends React.Component {
    constructor(props){
        super(props);
        this.props.fetchPhotos();
        this.props.fetchLike();
        this.state = {
            showPopup: false,
            curID: null
        }
    }

    Liked = id => this.props.likes.findIndex(el => el.photoID === id) !== -1;
    
    handleLikes = (e) => {
        e.preventDefault();
        const btn = e.target.closest('.gallery__icon--love');
        if(btn && this.props.currentUser){
            const curID = e.target.parentElement.parentElement.parentElement.parentElement.dataset.photoid;
            // User has NOT yet liked the current photo
            console.log(this.Liked(curID));
            if(!this.Liked(curID)){
                // New Like
                const like = {
                    photoID: curID,
                    user: this.props.currentUser.name
                };
                console.log('LIKED!!')

                // Add Like to state
                this.props.addLike(like);
                
            // User Has liked to the current photo
            } else {
                // Remove like from list
                const photo = this.props.likes.find(el => el.photoID === curID);

                // Delete Photo
                this.props.deleteLike(photo.id);
                
                console.log('NOT LIKED!!');
                
            }            
        } else if(!this.props.currentUser){
            alert('Please Log in!!!');
        }
    }

    togglePopup = e => {
        e.preventDefault();
        const curID = e.target.parentElement.dataset.photoid;
        this.setState({
            showPopup: !this.state.showPopup,
            curID: curID
        });
    }

    render(){
        const photos = this.props.photos;
       return(
        <section className="section-gallery">
            <div className="gallery">                            
                    {photos &&
                        (
                            <React.Fragment>
                                {
                                    photos.map((photo, index) => {
                                        const time = timeStampToDate(photo.created_at);
                                        return (<div className="gallery__item" key={index}>
                                                        <Link to="#" data-photoid={photo.id} onClick={this.togglePopup.bind(this)}>
                                                            <img className="gallery__image" src={photo.image}/>
                                                            <figcaption className="gallery__caption gallery__caption--main">{photo.created_by}</figcaption>
                                                            <figcaption className="gallery__caption gallery__caption--sub gallery__caption--sub-1">{time.month} / {time.day} / {time.year}</figcaption>
                                                            <figcaption className="gallery__caption gallery__caption--sub gallery__caption--sub-2">{time.hour} : {time.minute}</figcaption>
                                                            <figcaption className="gallery__caption gallery__caption--sub gallery__caption--sub-3">
                                                                <div className="gallery__image-love">
                                                                <Link to="#" onClick={this.handleLikes} className="gallery__image-link">
                                                                <IcomoonReact iconSet={iconSet} icon={this.Liked(photo.id) ? 'heart' : 'heart-outlined'} className="gallery__icon gallery__icon--love"/>
                                                                </Link>
                                                                </div>
                                                                
                                                                <div className="gallery__image-collection">
                                                                <Link to="#">
                                                                <IcomoonReact iconSet={iconSet} icon="circle-with-plus" className="gallery__icon gallery__icon--collection"/>
                                                                </Link> 
                                                                </div>
                                                            </figcaption>
                                                        </Link>
                                                </div>)
                                    })
                                }
                            </React.Fragment>
                        )

                    }
            </div>

        {
            this.state.showPopup && (
                <Popup closePopup={this.togglePopup.bind(this)} curID={this.state.curID}/>
                )
        }   
    </section>
       )
    }
}

const mapStateToProps = state => ({
    photos: state.photos,
    currentUser: state.currentUser,
    likes: state.likes
});

const mapDispatchToProps = {
    fetchPhotos,
    addLike,
    fetchLike,
    deleteLike
}


export default connect(mapStateToProps, mapDispatchToProps)(Gallery);