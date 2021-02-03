import Storage from '../api/Storage';

const comments = 'comments';
const user = 'user';

export default class CommentStorage {
    constructor() {
        this._comments = [];
        this.reactions = ['up', 'down'];
        this.storage = new Storage();
        // this.downloadComments();
    }

    downloadComments = () => {
        return this._comments = JSON.parse(this.storage.getItem(this.storageKey) || "[]");
    }

    get comments() {
        return this._comments.filter(comment => !comment.deleted).sort((a, b) => b.date - a.date);
    }

    addNewComment(name, text) {
        this._comments.push({name, text, date: Date.now(), id: (1000 + this.comments.length), reactions: {up: [], down: []}})
        this.save();
        return this.comments;
    }

    deleteComment(commentId) {
        const comment = this.getComment(commentId);
        comment.deleted = true;
        this.save();
        return this.comments;
    }

    addReaction(commentId, reaction, myName) {
        if (!this.reactions.includes(reaction)) return false;
        const comment = this.getComment(commentId);

        if (!comment.reactions[reaction].includes(myName)) {
            comment.reactions[reaction].push(myName);
            const rmReaction = reaction === 'up' ? 'down' : 'up';
            this.removeReaction(commentId, rmReaction, myName);
            this.save();
        }

        return this.comments;
    }

    removeReaction(commentId, reaction, myName) {
        if (!this.reactions.includes(reaction)) return false;
        const comment = this.getComment(commentId);

        const id = comment.reactions[reaction].findIndex(name => name === myName);
        if (id > -1) {
            comment.reactions[reaction].splice(id, 1);
            this.save();
        }

        return this.comments;
    }

    save(comments) {
        this.storage.setItem(this.storageKey, JSON.stringify(comments));
    }

    getComment(id) {
        return this._comments.find(comment => comment.id === id);
    }
}
