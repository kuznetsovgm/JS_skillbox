export default class CommentStorage {
    constructor() {
        this._comments = [];
        this.commentsItem = "comments";
        this.storage = window.localStorage;
        this.downloadComments();
    }

    downloadComments = () => {
        this._comments = JSON.parse(this.storage.getItem(this.commentsItem) || "[]");
    }

    get comments() {
        return this._comments.filter(comment => !comment.deleted).sort((a, b) => b.date - a.date);
    }

    addNewComment(name, text) {
        this._comments.push({name, text, date: Date.now(), id: (1000 + this.comments.length)})
        this.save();
        return this.comments;
    }

    deleteComment(commentId) {
        const comment = this.comments.find(comment => comment.id === commentId);
        comment.deleted = true;
        this.save();
        return this.comments;
    }

    save() {
        this.storage.setItem(this.commentsItem, JSON.stringify(this.comments));
    }
}