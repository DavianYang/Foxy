const photos = (state = [], action) => {
    switch(action.type){
        case 'FETCH_PHOTOS':
            return[...action.urls]
        case 'ADD_NEW_PHOTO':
            return[
                ...state,
                action.photo
            ];
        case 'UPDATE_PHOTO': 
            return [
                ...state.filter(item => item !== action.photo.id),
                action.photo
            ]
        default:
            return state;
    };
};

export default photos;