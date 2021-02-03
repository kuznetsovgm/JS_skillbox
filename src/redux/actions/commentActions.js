import { ADD_COMMENT, INIT_APP, SAVE, COMMENTS, USER, LOAD_COMMENTS } from '../types';
import Storage from '../../api/Storage';

const storage = new Storage();

export function loadComments() {
    return async (dispatch, getState) => {
        const comments = storage.get(COMMENTS);
        return {
            type: LOAD_COMMENTS,
            comments
        }
    }
}

export function addComment(name, comment) {
    return dispatch => {
        dispatch(addNewComment(name, comment));
        dispatch(saveComments());
    };
}

export function addNewComment(name, comment) {
    return {
        type: ADD_COMMENT,
        newComment: {
            name,
            comment
        }
    };
}

export function saveComments() {
    return (dispatch, getState) => {
        storage.set(COMMENTS, getState().comments);
    }
}


