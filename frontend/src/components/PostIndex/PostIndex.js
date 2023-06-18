import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchPosts } from '../../store/post';
import { fetchPostReviews } from '../../store/review';
import PostIndexItem from '../PostIndexItem/PostIndexItem';




const PostIndex = () => {
    const dispatch = useDispatch();
    const posts = Object.values(useSelector(store => store.post));
    const [sidebarActive,setSideBarActive] = useState(false);
    const [sidebarContent,setSidebarContent] = useState("");
    const location = useLocation();
    const query = location.search;

    useEffect(()=>{
        // setTimeout('', 3000);
        dispatch(fetchPosts({query}));

    },[query])

    const toggleSidebar = () => {


        setSideBarActive(!sidebarActive);
    }

    const updateSidebarContent = (content) => {
        setSidebarContent(content);
        if (!sidebarActive) setSideBarActive(true)
    }



    return (
        <div id='post-index-page'>
            <div id='post-index-container'>
                <ul id='post-item-list'>



                    {posts && posts.map((post,i)=><PostIndexItem key={i} key1={i} post={post} updateSidebarContent={updateSidebarContent}/>)}

                    {/* {posts && posts.map((post,i)=><PostIndexItem key={i} post={post} updateSidebarContent={updateSidebarContent}/>)} */}

                </ul>
            </div>
            <div id={sidebarActive ? 'post-index-sidebar-active' : 'post-index-sidebar'}>
                <div id='sidebar-content'>
                    <i onClick={()=>toggleSidebar()} id='x-icon'>x</i>
                    <h1 id='sidebar-title'>sidebar</h1>
                    <p>
                        {sidebarContent}
                        {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dui ut ornare lectus sit amet est placerat in egestas. Semper quis lectus nulla at volutpat diam ut. Vitae auctor eu augue ut lectus. Sed enim ut sem viverra aliquet eget sit. Suspendisse sed nisi lacus sed viverra tellus. Felis imperdiet proin fermentum leo vel orci porta non. Erat pellentesque adipiscing commodo elit at imperdiet dui accumsan. Nibh nisl condimentum id venenatis a condimentum vitae sapien. Vitae turpis massa sed elementum tempus egestas sed sed risus. Ut consequat semper viverra nam libero justo laoreet. Eu scelerisque felis imperdiet proin fermentum leo. Justo donec enim diam vulputate ut pharetra sit amet aliquam. Eget sit amet tellus cras adipiscing enim eu turpis egestas.
                        Pharetra vel turpis nunc eget lorem dolor sed viverra. Tincidunt id aliquet risus feugiat in ante metus. Nisi lacus sed viverra tellus in hac. Felis eget velit aliquet sagittis id consectetur purus. Ac tortor vitae purus faucibus ornare suspendisse sed nisi. Nulla pharetra diam sit amet nisl suscipit. Nunc id cursus metus aliquam eleifend mi in. Fames ac turpis egestas integer eget aliquet nibh. Lorem sed risus ultricies tristique nulla aliquet enim tortor. Integer malesuada nunc vel risus commodo viverra. Tristique senectus et netus et malesuada fames ac turpis. Ut faucibus pulvinar elementum integer enim. Nam at lectus urna duis convallis convallis tellus id interdum. Eu non diam phasellus vestibulum lorem sed risus. Sollicitudin ac orci phasellus egestas tellus. Lobortis scelerisque fermentum dui faucibus in ornare quam. Neque volutpat ac tincidunt vitae semper quis lectus. Viverra tellus in hac habitasse platea dictumst. Turpis egestas integer eget aliquet nibh. Bibendum ut tristique et egestas quis ipsum suspendisse ultrices.
                        In est ante in nibh mauris. Odio aenean sed adipiscing diam. Odio euismod lacinia at quis risus sed. Scelerisque fermentum dui faucibus in ornare quam viverra. Morbi tempus iaculis urna id volutpat lacus laoreet non curabitur. Donec ultrices tincidunt arcu non sodales neque sodales ut etiam. Fringilla est ullamcorper eget nulla facilisi etiam dignissim diam quis. Lectus nulla at volutpat diam ut venenatis. Maecenas ultricies mi eget mauris. Dui accumsan sit amet nulla facilisi morbi tempus iaculis urna. Adipiscing at in tellus integer feugiat scelerisque. Viverra suspendisse potenti nullam ac tortor vitae purus. Consequat semper viverra nam libero justo laoreet. Posuere urna nec tincidunt praesent semper. Suspendisse sed nisi lacus sed viverra tellus in hac habitasse. Vel fringilla est ullamcorper eget nulla facilisi etiam dignissim diam.
                        Laoreet non curabitur gravida arcu ac tortor dignissim convallis. Lorem dolor sed viverra ipsum nunc aliquet bibendum enim. Tellus molestie nunc non blandit massa enim nec dui. Donec ac odio tempor orci dapibus ultrices in. Mi ipsum faucibus vitae aliquet nec ullamcorper sit. Semper risus in hendrerit gravida. Lobortis scelerisque fermentum dui faucibus in ornare quam. Suscipit tellus mauris a diam maecenas sed enim. Sit amet massa vitae tortor condimentum. Varius vel pharetra vel turpis nunc eget lorem. Risus feugiat in ante metus dictum at. Neque ornare aenean euismod elementum nisi quis eleifend quam. Viverra suspendisse potenti nullam ac tortor vitae. Cursus euismod quis viverra nibh cras pulvinar. Turpis in eu mi bibendum neque egestas.
                        Non diam phasellus vestibulum lorem sed risus ultricies. Nunc congue nisi vitae suscipit. Nisl vel pretium lectus quam id. Nulla porttitor massa id neque aliquam vestibulum. Fringilla ut morbi tincidunt augue interdum velit. Posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Suspendisse in est ante in nibh mauris cursus mattis. Sed arcu non odio euismod lacinia at quis risus sed. Varius morbi enim nunc faucibus a pellentesque. Tellus integer feugiat scelerisque varius morbi enim nunc. Posuere lorem ipsum dolor sit amet consectetur. Felis eget nunc lobortis mattis aliquam. In aliquam sem fringilla ut morbi tincidunt. At consectetur lorem donec massa sapien. Eget magna fermentum iaculis eu non diam. */}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default PostIndex;
