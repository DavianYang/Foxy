import { combineReducers } from 'redux';
import users from './users';
import currentUser from './currentUser';
import photos from './photos'
import likes from './likes';

export default combineReducers({users, currentUser, photos, likes});