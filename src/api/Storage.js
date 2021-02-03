export default class Storage {
    constructor() {
        // this.storageKey = "comments";
        this.storage = window.localStorage;
    }

    set(code, value) {
        this.storage.setItem(code, JSON.stringify(value));
    }

    get(code) {
        const value = this.storage.getItem(code);
        console.log(value);
        return !!value ? JSON.parse(value) : null;
    }
}
