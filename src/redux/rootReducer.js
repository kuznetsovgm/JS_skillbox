export default function rootReducer(state, action) {
    if (action.type === 'INCREMENT') {
        return Object.assign({}, state, ++state.counter);
    }
    if (action.type === 'DECREMENT') {
        return Object.assign({}, state, --state.counter);
    }
    if (action.type === 'ASYNC') {
        return ;
    }
    if (action.type === 'THEME') {
        return ;
    }

    return state;
}