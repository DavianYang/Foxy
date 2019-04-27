const likes = (state = [], action) => {
    switch(action.type){
        case 'FETCH_LIKES':
            return action.likes;
        case 'ADD_LIKE':
            return [
                ...state,
                action.like
            ];
        case 'DELETE_LIKE':
            return state.filter(item => item.id !== action.id);
        default:
            return state;
    }
}

export default likes;