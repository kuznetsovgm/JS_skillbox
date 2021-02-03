import { USER } from '../types';
import Storage from '../../api/Storage';

const storage = new Storage();

export function loadUser() {
    return async (dispatch, getState) => {
        const user = storage.get(USER);
        return {
            type: LOAD_USER,
            user
        }
    }
}
