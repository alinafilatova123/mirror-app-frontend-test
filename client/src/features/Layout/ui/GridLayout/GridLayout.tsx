import { FC, memo } from "react";

import Post from "@/entities/post/ui/Post";
import { PostI } from "@/shared/interfaces";

import styles from './GridLayout.module.scss'

interface Props {
    templateType: string,
    posts: PostI[],
    structure: {
        columns: number, 
        rows: number
    }
}

const GridLayout: FC<Props> = ({posts, templateType, structure}) => {
    return (
        <div
            style={{
                "--columns": structure.columns, 
                "--rows": structure.rows 
            } as React.CSSProperties}
            className={styles['grid']}
        >
            {posts.map(post => (
                <div 
                    className={styles["grid-item"]}
                    key={post.id}>
                    <Post type={templateType} post={post}/>
                </div>
            ))}
        </div>
    )
}

export default memo(GridLayout);