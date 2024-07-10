import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchPosts } from '../../store/post';
import { fetchPostReviews } from '../../store/review';
import PostIndexItem from '../PostIndexItem/PostIndexItem';
import SplashPage from '../../components/splashPage';
import bikeImg from '../../assets/bikes.avif';
import bikeImg2 from '../../assets/heybike.jpeg';
import './PostIndex.css';
import Footer from '../Footer/Footer.js';

const PostIndex = () => {
    const dispatch = useDispatch();
    const posts = Object.values(useSelector(store => store.post));
    const [sidebarActive, setSideBarActive] = useState(false);
    const [sidebarContent, setSidebarContent] = useState("");
    const location = useLocation();
    const query = location.search;

    console.log(posts, 'I am the posts object')

    useEffect(() => {
        dispatch(fetchPosts({ query }));
    }, [query]);

    const toggleSidebar = () => {
        setSideBarActive(!sidebarActive);
    };

    const updateSidebarContent = (content) => {
        setSidebarContent(content);
        if (!sidebarActive) setSideBarActive(true);
    };

    return (
        <>
            <div id='post-index-page'>
                <div id='post-index-container'>
                    <div className="containerAroundImages">
                        <div className='image-container'>
                            <img className='splashPageImage' src={bikeImg} alt="Bike 1" />
                        </div>
                        <div className='image-container'>
                            <img className='splashPageImage' src={bikeImg2} alt="Bike 2" />
                        </div>
                    </div>
                    <ul id='post-item-list'>
                        {posts && posts.map((post, i) => (
                            <PostIndexItem key={i} key1={i} post={post} updateSidebarContent={updateSidebarContent} />
                        ))}
                    </ul>
                </div>
                <div id={sidebarActive ? 'post-index-sidebar-active' : 'post-index-sidebar'}>
                    <div id='sidebar-content'>
                        <i onClick={() => toggleSidebar()} id='x-icon'>x</i>
                        <h1 id='sidebar-title'>sidebar</h1>
                        <p>
                            {sidebarContent}
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default PostIndex;
