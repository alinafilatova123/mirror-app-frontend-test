import {makeAutoObservable, runInAction} from 'mobx';
import { getPosts } from '@/shared/api';
import { PostI } from '../../shared/interfaces';

class PostsStore {
    posts: PostI[] = []
    loading = false

    constructor() {
        makeAutoObservable(this)
    }

    getPostsAction = async () => {
        try {
            this.loading = true
            const res = await getPosts()
            runInAction(() => {
                this.posts = res
                this.loading = false
            })
        } catch {
            this.loading = false
        }
    }
}

export default new PostsStore();