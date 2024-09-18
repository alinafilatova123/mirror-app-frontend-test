import { FC, memo } from "react";

import { PostI } from "@/shared/interfaces";
import GridLayout from "./GridLayout";
import MasonryLayout from "./MasonryLayout";

interface Props {
    templateType: string,
    layoutType?: string,
    posts: PostI[],
    structure: {
        columns: number, 
        rows: number
    };
};

const Layout: FC<Props> = ({layoutType='default', ...props}) => {
    return (
        <>
            {(layoutType === 'grid' || layoutType === 'default') && <GridLayout {...props}/>}
            {layoutType === 'masonry' && <MasonryLayout {...props}/>}
        </>
    );
};

export default memo(Layout);