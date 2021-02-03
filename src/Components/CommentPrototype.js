class CommentPrototype {
    constructor(user, value, id) {
        this.name = user;
        this.comment = this.filterHtml(value);
        this.date = Date.now();
        this.id = 1000 + id;
        this.reactions = {up: [], down: []};
    }

    filterHtml = (text) => {
        return text.replace(/(<([^>]+)>)/gm, '');
    }
}
