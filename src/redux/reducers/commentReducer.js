import { ADD_COMMENT, SAVE } from '../types';

const initialState = {
    comments: {comments: JSON.parse(window.localStorage.getItem("comments") || "[]")}
};

export const commentReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_COMMENT: 
            state = {...(state.comments.push({...action.comment}))};
            return state;
        case SAVE: 
            state = {...(state.comments.push({...action.comment}))};
            return state;

        default: return state;
    }
}
