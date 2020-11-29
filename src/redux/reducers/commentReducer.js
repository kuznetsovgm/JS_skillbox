import { ADD_COMMENT } from '../types';
import { addComment } from '../actions/commentActions';

const initialState = {
    comments: {comments: JSON.parse(window.localStorage.getItem("comments") || "[]")}
};
export const commentReducer = (state = initialState, action) => {
    switch (action) {
        case ADD_COMMENT: 
    }

    return state;
}