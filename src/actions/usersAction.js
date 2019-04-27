import firebase from '../utilities/firebase';

const firestore = firebase.firestore();

export const fetchUsers = () => dispatch => {
    const userData = firestore.collection('users').get();

    userData.then(snapshot => {
        const users = [];

        snapshot.docs.forEach(item => {
            const user = item.data();
            user.id = item.id;

            users.push(user);
        });

        console.log('Users', users);

        dispatch({
            type: 'FETCH_USERS',
            users: users
        });
    });
};

export const insertUser = (user, cb) => dispatch => {
    firestore.collection('users').add(user).then(data => {
        user.id = data.id;

        dispatch({
            type: 'ADD_NEW_USER',
            user: user
        });

        cb();
    });
};

export const loginUser = (user, cb) => dispatch => {
    dispatch({
        type: 'LOGIN',
        user: user
    });

    cb();
};