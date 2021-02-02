import { ADD_COMMENT, SAVE } from '../types';

export function addComment(name, comment) {
    return dispatch => {
        dispatch({
            type: ADD_COMMENT,
            payload: {
                name,
                comment
            }
        });
    };
}

export function save() {
    const storage = window.localStorage;
    const storageKey = "comments";
    
    return dispatch => {
        storage.setItem(storageKey, JSON.stringify(dispatch('GET_STATE').comments));

    }

}

