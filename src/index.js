import createStore from './createStore';
import rootReducer from './redux/rootReducer';
import './styles.css';

const counter = document.getElementById('counter');
const addBtn = document.getElementById('add');
const subBtn = document.getElementById('sub');
const asyncBtn = document.getElementById('async');
const themeBtn = document.getElementById('theme');

const store = createStore(rootReducer, {
    counter: 0,
});

window.store = store;

addBtn.addEventListener('click', () => {
    store.dispatch({type: 'INCREMENT'});
})

subBtn.addEventListener('click', () => {
    store.dispatch({type: 'DECREMENT'});
})

asyncBtn.addEventListener('click', () => {
    store.dispatch({type: 'ASYNC'});
})

themeBtn.addEventListener('click', () => {
    store.dispatch({type: 'THEME'});
})

store.subscribe(() => {
    const state = store.getState();
    console.log(state);
    counter.innerText = state.counter;
})

store.dispatch({type: 'INIT_APP'});