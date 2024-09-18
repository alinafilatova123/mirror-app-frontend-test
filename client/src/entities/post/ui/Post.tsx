import { FC, memo } from 'react';

import {PostI} from '../../../shared/interfaces';
import likeIconFill from '../../../shared/assets/icons/like-fill.svg'
import likeIconLine from '../../../shared/assets/icons/like-line.svg'
import commentIconFill from '../../../shared/assets/icons/comment-fill.svg'
import commentIconLine from '../../../shared/assets/icons/comment-line.svg'
import shevronIcon from '../../../shared/assets/icons/double-shevron.svg';
import { getDate } from '../lib';

import styles from './Post.module.scss';

interface Props {
    type?: string,
    post: PostI
};

const Post: FC<Props> = ({type='classic', post}) => {
    const likeIcon = type === 'classic' ? likeIconFill : likeIconLine;
    const commentIcon = type === 'classic' ? commentIconFill : commentIconLine;
    const date = getDate(new Date(post.date));
      
    return (
        <div className={styles[type]}>
            <div>
                <div className={styles[`${type}__header`]}>
                    <span className={styles[`${type}__user`]}>{post.username}</span>
                    {type !== 'classic' && <img className={styles['shevron']} src={shevronIcon} alt="shevronIcon" /> }
                </div>
                
                <p className={styles[`${type}__text`]}>{post.caption}</p>
            </div>
            

            <div className={styles[`${type}__statistics`]}>
                <div className={styles[`${type}__interaction`]}>
                    <img src={likeIcon} alt="likeIcon" />
                    {post.likes}
                </div>
                <div className={styles[`${type}__interaction`]}>
                    <img src={commentIcon} alt='commentIcon'/>
                    {post.comments}
                </div>
                <span className={styles[`${type}__date`]}>{date}</span>
            </div>
        </div>
    )
}

export default memo(Post);