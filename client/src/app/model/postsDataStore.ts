import {makeAutoObservable, runInAction} from 'mobx';
import { getPosts } from '@/shared/api';
import { PostI } from '../../shared/interfaces';

class PostsStore {
    posts: PostI[] = [];

    constructor() {
        makeAutoObservable(this);
    };

    getPostsAction = async () => {
        try {
            const res = await getPosts();
            runInAction(() => {
                this.posts = res;
            })
        } catch (err) {
            throw err;
        }
    };
};

export default new PostsStore();