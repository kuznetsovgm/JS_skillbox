import { ADD_COMMENT, INIT_APP, SAVE, SET_COMMENTS } from '../types';

export const commentReducer = (state = [], action) => {
    console.log(action);
    switch (action.type) {
        case ADD_COMMENT: 
            state.push({...action.newComment});
            return state;
        case SET_COMMENTS:
            return action.comments.slice();

        default: return state;
    }
}
