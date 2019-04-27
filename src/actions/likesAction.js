import firebase from '../utilities/firebase';

const firestore = firebase.firestore();

export const fetchLike = () => dispatch => {
    const likesData = firestore.collection('likes').get();

    likesData.then(snapshot => {
        const likes = [];

        snapshot.docs.forEach(item => {
            const like = item.data();

            like.id = item.id;

            likes.push(like);
        });

        console.log('LIKES', likes);

        dispatch({
            type: 'FETCH_LIKES',
            likes: likes
        });
    });
};

export const addLike = like => dispatch => {
    firestore.collection('likes').add(like).then(data => {
        like.id = data.id;

        dispatch({
            type: 'ADD_LIKE',
            like: like
        });
    });
};

export const deleteLike = id => dispatch => {
    firestore.collection('likes').doc(id).delete().then(data => {
        dispatch({
            type: 'DELETE_LIKE',
            id: id
        });
    });
};
