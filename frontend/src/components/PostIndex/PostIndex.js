import { useEffect, useState, memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchPosts } from '../../store/post';
import PostIndexItem from '../PostIndexItem/PostIndexItem';
import Footer from '../Footer/Footer';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import bikeImg from '../../assets/bikes.avif';
import bikeImg2 from '../../assets/heybike.jpeg';
import 'react-lazy-load-image-component/src/effects/blur.css';
import './PostIndex.css';

const PostIndex = () => {
    const dispatch = useDispatch();
    const posts = Object.values(useSelector(store => store.post));
    const [sidebarActive, setSideBarActive] = useState(false);
    const [sidebarContent, setSidebarContent] = useState("");
    const location = useLocation();
    const query = location.search;

    useEffect(() => {
        dispatch(fetchPosts({ query }));
    }, [query, dispatch]);

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
                            <LazyLoadImage
                                className='splashPageImage'
                                src={bikeImg}
                                alt="Bike 1"
                                effect="blur"
                            />
                        </div>
                        <div className='image-container'>
                            <LazyLoadImage
                                className='splashPageImage'
                                src={bikeImg2}
                                alt="Bike 2"
                                effect="blur"
                            />
                        </div>
                    </div>
                    <ul id='post-item-list'>
                        {posts && posts.map((post, i) => (
                            <MemoizedPostIndexItem key={i} post={post} updateSidebarContent={updateSidebarContent} />
                        ))}
                    </ul>
                </div>
                <div id={sidebarActive ? 'post-index-sidebar-active' : 'post-index-sidebar'}>
                    <div id='sidebar-content'>
                        <i onClick={toggleSidebar} id='x-icon'>x</i>
                        <h1 id='sidebar-title'>sidebar</h1>
                        <p>{sidebarContent}</p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

const MemoizedPostIndexItem = memo(PostIndexItem);

export default PostIndex;
