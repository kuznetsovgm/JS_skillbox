export default function rootReducer(state, action) {
    if (action.type === 'INCREMENT') {
        return {...state, counter: ++state.counter};
    }
    if (action.type === 'DECREMENT') {
        return {...state, counter: --state.counter};
    }
    if (action.type === 'ASYNC') {
        return async () => await setTimeout(() => {
            dispa
        }, 1000)
    }
    if (action.type === 'THEME') {
        return state;
    }

    return state;
}