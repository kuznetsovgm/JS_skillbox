import { ADD_COMMENT, INIT_APP, SAVE, LOAD_COMMENTS } from '../types';

// const initialState = {
//     comments: [],
// };

export const commentReducer = (state = [], action) => {
    switch (action.type) {
        case ADD_COMMENT: 
            state.push({...action.newComment});
            return state;
        // case SAVE: 
            // state = {...(state.comments.push({...action.comment}))};
            // return state;
        case LOAD_COMMENTS: 
            return action.comments;

        default: return state;
    }
}
