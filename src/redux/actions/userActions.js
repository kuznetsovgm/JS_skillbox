import { USER, SET_USER, LOAD_USER } from '../types';
import Storage from '../../api/Storage';

const storage = new Storage();

export function loadUser() {
    const user = storage.get(USER) || "";
    return {
        type: LOAD_USER,
        user
    }
}

export function setUser(userName) {
    storage.set(USER, userName);
    return {
        type: SET_USER,
        userName
    }
}
