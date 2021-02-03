import { LOAD_USER } from '../types';

// const initialState = {
//     comments: [],
// };

export const userReducer = (state = [], action) => {
    switch (action.type) {
        case LOAD_USER: 
            return {...action.user};
        // case SAVE: 
            // state = {...(state.comments.push({...action.comment}))};
            // return state;

        default: return state;
    }
}
