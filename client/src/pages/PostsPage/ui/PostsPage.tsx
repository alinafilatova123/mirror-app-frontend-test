import { memo } from "react";
import { observer } from "mobx-react-lite";

import layoutDataStore from "@/app/model/layoutDataStore";
import Posts from "./Posts";
import UpdateSettings from "./UpdateSettings";

const PostsPage = observer(() => {

    const {layoutSettings} = layoutDataStore
    
    return (
        <>
            <UpdateSettings layoutSettings={layoutSettings}/>
            <Posts layoutSettings={layoutSettings}/>
        </>
    )
})

export default memo(PostsPage);