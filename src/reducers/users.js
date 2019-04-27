const users = (state = [], action) => {
    switch(action.type){
        case 'FETCH_USERS':
            return action.users;
        case 'ADD_NEW_USER':
            return [
                ...state,
                action.user
            ];
        default:
            return state;
    }
}

export default users;