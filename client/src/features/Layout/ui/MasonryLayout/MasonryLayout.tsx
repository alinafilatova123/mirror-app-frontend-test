import cn from "classnames";
import { memo } from "react";

import Post from "@/entities/post"
import styles from './MasonryLayout.module.scss'
import { PostI } from "@/shared/interfaces";

interface Props {
    templateType: string,
    posts: PostI[],
    structure: {
        columns: number, 
        rows: number
    };
};

const MasonryLayout = ({templateType, posts, structure}: Props) => {

    return (
        <div
            style={{ "--columns": structure.columns } as React.CSSProperties}
            className={cn(
                styles['masonry'], 
            )}>
            {posts.map(post => (
                <div 
                    className={styles["masonry-item"]}
                    key={post.id}
                >
                    <Post type={templateType} post={post}/>
                </div>
            ))}
        </div>
    );
};

export default memo(MasonryLayout);