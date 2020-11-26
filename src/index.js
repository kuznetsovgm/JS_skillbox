// import createStore from './createStore';
import configureStore from './redux/configureStore';
import { increment, decrement, asyncIncrement } from './redux/actions/counterActions';
import { changeTheme } from './redux/actions/themeActions';
import './styles.css';

const counter = document.getElementById('counter');
const addBtn = document.getElementById('add');
const subBtn = document.getElementById('sub');
const asyncBtn = document.getElementById('async');
const themeBtn = document.getElementById('theme');
const body = document.body;

const store = configureStore({counter: 14, theme: 'dark'});

window.store = store;

addBtn.addEventListener('click', () => {
    store.dispatch(increment());
})

subBtn.addEventListener('click', () => {
    store.dispatch(decrement());
})

asyncBtn.addEventListener('click', () => {
    store.dispatch(asyncIncrement());
})

themeBtn.addEventListener('click', () => {
    const newTheme = body.classList.contains('light') ? 'dark' : 'light';
    store.dispatch(changeTheme(newTheme));
})

store.subscribe(() => {
    const state = store.getState();
    counter.innerText = state.counter;
    body.className = state.theme;
})

store.dispatch({type: 'INIT_APP'});
