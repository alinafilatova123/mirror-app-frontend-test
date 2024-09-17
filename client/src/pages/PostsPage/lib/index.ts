import { LayoutI } from "@/shared/interfaces";

export const calculatePostsPerPage = (layoutSettings: LayoutI, layoutType: string) => {
    if(layoutSettings?.layout && layoutType) {
        const rows = layoutSettings.layout.params[layoutType].rows;
        const columns = layoutSettings.layout.params[layoutType].columns;
        return Math.floor(rows * columns);
    }
    else return 1
};