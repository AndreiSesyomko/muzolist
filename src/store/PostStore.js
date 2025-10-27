import {makeAutoObservable} from "mobx";


export default class PostStore {
    posts = []
    cats = []

    constructor() {
        makeAutoObservable(this);
    }

    setPosts(posts) {
        this.posts = posts;
    }

    setCats(cats) {
        this.cats = cats;
    }
}