import { ADD_COMMENT, COMMENTS, SET_COMMENTS, DELETE_COMMENT } from '../types';
import Storage from '../../api/Storage';

const storage = new Storage();

export function init() {
    return (dispatch, getState) => {
        const comments = storage.get(COMMENTS) || [];
        dispatch(setComments(comments))
    };
}

export function addComment(name, text) {
    return (dispatch, getState) => {
        const comments = getState().comments.slice();
        const newComment = {
            name, 
            text, 
            date: Date.now(), 
            id: (1000 + comments.length), 
            reactions: {up: [], down: []}
        }
        dispatch(addNewComment(newComment));
        dispatch(saveComments());
    };
}

export function addReaction(commentId, reaction, myName) {
    return (dispatch, getState) => {
        const comments = getState().comments.slice();
        const commentIndex = comments.findIndex(comment => comment.id === commentId);
        const comment = {...comments[commentIndex]};

        comment.reactions = {...comment.reactions};
        Object.keys(comment.reactions).map(reaction => reaction.slice());

        toggleReaction(comment, reaction, myName);

        comments[commentIndex] = comment;

        dispatch(setComments(comments));
        dispatch(saveComments());
    };
}

export function deleteComment(id) {
    return (dispatch, getState) => {
        const comments = getState().comments.slice();
        const commentIndex = comments.findIndex(comment => comment.id === id);
        comments.splice(commentIndex, 1);
        dispatch(removeComment());
        dispatch(setComments(comments))
        dispatch(saveComments());
    };
}

export function setComments(comments) {
    return {
        type: SET_COMMENTS,
        comments
    }
}

export function addNewComment(newComment) {
    return {    
        type: ADD_COMMENT,
        newComment
    };
}

export function removeComment() {
    return {    
        type: DELETE_COMMENT
    };
}

export function saveComments() {
    return (dispatch, getState) => {
        storage.set(COMMENTS, getState().comments);
    }
}

function toggleReaction(comment, reaction, myName) {
    //если уже есть реакция, удаляем её, иначе добавляем
    return comment.reactions[reaction].includes(myName) 
        ? removeReaction(comment, reaction, myName) 
        : insertReaction(comment, reaction, myName);
}

function insertReaction(comment, reaction, myName) {
    if (!comment.reactions[reaction].includes(myName)) {
        comment.reactions[reaction].push(myName);
        //если поставили лайк, нужно удалить дизлайк и наоборот
        const rmReaction = reaction === 'up' ? 'down' : 'up';
        removeReaction(comment, rmReaction, myName);
    }

    return comment;
}

function removeReaction(comment, reaction, myName) {
    const id = comment.reactions[reaction].findIndex(name => name === myName);
    if (id > -1) {
        comment.reactions[reaction].splice(id, 1);
    }

    return comment;
}
