import { getLayoutSettings } from "@/shared/api";
import { LayoutI } from "@/shared/interfaces";
import { makeAutoObservable, runInAction } from "mobx";

class LayoutStore {
    layoutSettings = {
        layout: {
            current: '',
            params: {
                grid: {
                  columns: 0,
                  rows: 0
                },
                masonry: {
                  columns: 0,
                  rows: 0
                },
              },
        },
        template: '',
        navigation: ''
    } as LayoutI
    loading = false

    constructor() {
        makeAutoObservable(this)
    }

    getLayoutAction = async () => {
        try {
            this.loading = true;
            const res = await getLayoutSettings();
            runInAction(() => {
                this.layoutSettings = res;
                this.loading = false;
            })
        } catch {
            this.loading = false;
        };
    };
};

export default new LayoutStore()