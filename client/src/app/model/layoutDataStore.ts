import { makeAutoObservable, runInAction } from "mobx";

import { getLayoutSettings } from "@/shared/api";
import { LayoutI } from "@/shared/interfaces";

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

    constructor() {
        makeAutoObservable(this)
    }

    getLayoutAction = async () => {
        try {
            const res = await getLayoutSettings();
            runInAction(() => {
                this.layoutSettings = res;
            })
        } catch (err) {
            throw err;
        };
    };
};

export default new LayoutStore()