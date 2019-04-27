import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Link
} from "react-router-dom";
import IcomoonReact, {iconList} from 'icomoon-react';
import iconSet from '../../../img/selection.json';
import { connect } from 'react-redux';
import { fetchPhotos, insertComment } from '../../../actions/photosAction';
import { addLike, fetchLike, deleteLike } from '../../../actions/likesAction';
import { timeStampToDate } from '../../../utilities/utilities';


class Popup extends React.Component {
    constructor(props){
        super(props);
        this.props.fetchPhotos();
        this.props.fetchLike();
        this.comment = React.createRef();
    }

    Liked = id => this.props.likes.findIndex(el => el.photoID === id) !== -1;

    handleOnSubmit = e => {
        e.preventDefault();
        const newComment = {
            comment: this.comment.current.value,
            curUser: this.props.currentUser
        };
        console.log(newComment);
        const curID = this.props.curID;
        const photos = this.props.photos;
        const currentPhoto = photos.find(photo => photo.id === curID);
        this.props.insertComment(newComment, currentPhoto);
    }

    render(){
        const curID = this.props.curID;
        const photos = this.props.photos;
        const currentPhoto = photos.find(photo => photo.id === curID);
        const time = timeStampToDate(currentPhoto.created_at);
        const curUser = this.props.currentUser;
        return(
            <div className="popup" id="popup">
                <Link to="/" className="popup__close" onClick={this.props.closePopup}>&times;</Link>
                <div className="popup__content">
                    <div className="popup__left">
                        <img src={currentPhoto.image} className="popup__img" />
                    </div>

                    <div className="popup__right">
                        <div className="popup__comments">
                        <div className="popup__icon-box">
                        <div className="popup__love">
                        <Link to="#">
                        <IcomoonReact iconSet={iconSet} icon={this.Liked(currentPhoto.id) ? 'heart' : 'heart-outlined'} className="love popup__icon"/>
                        </Link>
                        </div>
                        <div className="popup__collection">
                        <Link to="#">
                        <IcomoonReact iconSet={iconSet} icon="circle-with-plus" className="collection popup__icon"/>
                        </Link>
                        </div>
                        </div>

                        {
                            curUser && (
                                <form className="popup__comment" onSubmit={this.handleOnSubmit}>
                                <div className="form__group popup__group u-margin-bottom-medium">
                                        <textarea className="form__input popup__input" placeholder="Enter Comment...." id="comment" ref={this.comment}/>
                                </div>
    
    
                                <div className="form__group popup__group">
                                        <button className="btn-inline popup__btn" type="submit">Add Comment</button>
                                </div>
                                </form>
                            )
                        }
                        </div>
                        <div className="comments">
                        {
                            currentPhoto.comment && (
                                <React.Fragment>
                                    {
                                        currentPhoto.comment.map((comment, index) => {
                                            return ( 
                                                <div className="comments-wrap">
                                                <div className="comments-wrap__photo">
                                                    <span className="comments-wrap__avatar">{currentPhoto.created_by}</span>
                                                </div>
                                                <div className="comments-wrap__block">
                                                    <p className="comments-wrap__text">
                                                        {comment.comment}
                                                    </p>
                
                                                    <div className="comments-wrap__bottom">
                                                        <div className="comments-wrap__date">{time.month} {time.day}, {time.year} @ {time.hour}:{time.minute} {time.hour < 12 ? 'AM' : 'PM'}</div>
                                                        <ul className="comments-wrap__action">
                                                            <li className="comments-wrap__complain">Complain</li>
                                                            <li className="comments-wrap__replay">Reply</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                </div>
                                            )
                                        })
                                    }
                                </React.Fragment>
                            )

                        }

                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    photos: state.photos,
    likes: state.likes,
    currentUser: state.currentUser,
});

const mapDispatchToProps = {
    fetchPhotos,
    addLike,
    fetchLike,
    deleteLike,
    insertComment
}

export default connect(mapStateToProps, mapDispatchToProps)(Popup);