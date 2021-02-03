export default class Storage {
    constructor() {
        // this.storageKey = "comments";
        this.storage = window.localStorage;
    }

    set(code, value) {
        this.storage.setItem(code, JSON.stringify(value));
    }

    get(code) {
        return JSON.parse(this.storage.getItem(code) || null);
    }
}
