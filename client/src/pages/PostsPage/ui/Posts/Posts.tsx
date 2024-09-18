import { observer } from "mobx-react-lite";
import { FC, memo, useEffect, useState } from "react";

import postsStore from "../../../../app/model/postsDataStore";
import { LayoutI, PostI } from '../../../../shared/interfaces'
import Pagination from "@/features/Pagination";
import Button from "@/shared/ui/Button";
import Layout from "@/features/Layout";
import { calculatePostsPerPage } from "../../lib";

interface Props {
    layoutSettings: LayoutI
}

const Posts: FC<Props> = observer(({layoutSettings}) => {

    const {posts, getPostsAction} = postsStore;
    
    const [layoutType, setLayoutType] = useState('grid')
    const [templateType, setTemplateType] = useState('classic')
    const [navType, setNavType] = useState('pagination');
    const [isMore, setIsMore] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(1);
    const [displayedPosts, setDisplayedPosts] = useState<PostI[]>([]);
    const [structure, setStructure] = useState({columns: 0, rows: 0});
    
    const updatePostsDeps = [layoutSettings.navigation, postsPerPage, currentPage, layoutType, templateType, structure]

    const handlePaginate = (page: number) => {
        setCurrentPage(page);
    };
    
    const handleLoadMore = () => {
        if (isMore) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const updateLoadMorePosts = () => {
        const newPosts = posts.slice(0, currentPage * postsPerPage);
        setDisplayedPosts(newPosts);
        setIsMore(newPosts.length < posts.length);
    };

    const updatePaginationPosts = () => {
        const lastPostIndex = currentPage * postsPerPage;
        const firstPostIndex = lastPostIndex - postsPerPage;
        setDisplayedPosts(posts.slice(firstPostIndex, lastPostIndex));
        setIsMore(lastPostIndex < posts.length);
    };

    // получаем посты
    useEffect(() => {
        getPostsAction()
    }, [])

    // получаем rows и columns
    useEffect(() => {
        if (layoutSettings.layout && layoutType) {
            setStructure({columns: layoutSettings.layout.params[layoutType].columns, 
            rows: layoutSettings.layout.params[layoutType].rows})
        }
    }, [layoutSettings, layoutType])

    // получаем кол-во постов на станицу
    useEffect(() => {    
        if (layoutSettings.layout) {
            setPostsPerPage(calculatePostsPerPage(layoutSettings, layoutType));
            setCurrentPage(1);
            setDisplayedPosts([]);
        }
    }, [layoutSettings.layout, layoutType]);

    // апдейтим кол-во постов в зависимости от типа навигации
    useEffect(() => {
        if (navType === "pagination") {
            updatePaginationPosts();
        } else {
          updateLoadMorePosts();
        }
    }, [...updatePostsDeps]);
    
    useEffect(() => {
        if (layoutSettings?.layout) {
            setLayoutType(layoutSettings.layout.current)
            setTemplateType(layoutSettings.template)
            setNavType(layoutSettings.navigation)
        }
    }, [layoutSettings, posts, layoutType])

    return (
        <div className="mt-16 mx-auto px-4">
            {displayedPosts?.length > 0 && (
                <Layout 
                    templateType={templateType} 
                    layoutType={layoutType} 
                    posts={displayedPosts}
                    structure={structure}
                />
            )}
            
            <div className="flex justify-center mt-16">
                {navType === "pagination" ? (
                    <Pagination
                        className="pagination-bar"
                        currentPage={currentPage}
                        totalCount={posts.length}
                        pageSize={postsPerPage}
                        onPageChange={(page:number) => handlePaginate(page)}
                    />
                ) : (
                    isMore && (
                        <Button type={'light'} onClick={handleLoadMore}>
                            Загрузить еще
                        </Button>
                    )
                )}
            </div>
        </div>
    )
})

export default memo(Posts);