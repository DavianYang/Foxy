import firebase from '../utilities/firebase';

const firestore = firebase.firestore();

export const fetchPhotos = () => dispatch => {
    const urls = [];
    
    const urlsData = firestore.collection('images').get();
    urlsData.then(snapshot => {
        snapshot.docs.forEach(item => {
            const url = item.data();

            url.id = item.id;
            
            urls.push(url);
        });

        console.log('URLS: ', urls);

        dispatch({
            type: 'FETCH_PHOTOS',
            urls: urls
        });
    });
};

export const insertPhotos = (photo, currentUser, cb) => dispatch => {

    var storageRef = firebase.storage().ref();

    const filePath = `images/${photo.name}`;
    const imageTask = storageRef.child(filePath).put(photo);

    imageTask.on('state_changed',
        (snapshot) => {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            console.log(progress);
        },
        (error) => {
            console.log(error);
        },
        () => {
            storageRef.child(filePath).getDownloadURL().then(url => {
                const image = {
                    image: url,
                    created_by: currentUser.name,
                    email: currentUser.email,
                    created_at: new Date()
                };
                firestore.collection('images').add(image).then(data => {
                    image.id = data.id;

                    dispatch({
                        type: 'ADD_NEW_PHOTO',
                        photo: photo
                    });

                    cb();
                });


            });
        }
    )
};

export const insertComment = (comment, photo) => dispatch => {
    if(photo.comment === undefined){
        photo.comment = [comment];
    } else {
        photo.comment.push(comment);
    }

    firestore.collection('images').doc(photo.id).update({
        comment: photo.comment
    }).then(() => {
        dispatch({
            type: 'UPDATE_PHOTO',
            photo: photo
        });
    });
}