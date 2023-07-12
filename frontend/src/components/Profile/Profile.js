import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchUserPosts } from '../../store/post'
import { fetchUserProfile } from '../../store/profile'
import { fetchUsersReview} from '../../store/review';
// import ProfilePostIndex from '../Profile/ProfilePostIndex';
import PostIndexItem from '../PostIndexItem/PostIndexItem';
import ReviewIndexItem from '../ReviewIndexItem/ReviewIndexItem'
import { deletePost } from '../../store/post';
import './Profile.css'

function Profile({key1}) {
    const dispatch = useDispatch()
    const { userId } = useParams()
    let currentProfileUser = useSelector(state => state?.profile.profile);
    const posts = Object.values(useSelector(state => state?.post));
    const reviews = Object.values(useSelector(state => state.review))
    const [contentState,setContentState] = useState('reviews');

    useEffect(()=> {
        dispatch(fetchUserProfile(userId));
        dispatch(fetchUserPosts(userId));
        dispatch(fetchUsersReview(userId));
    }, [dispatch, userId])

    const handleClick = (post) => {
        dispatch(deletePost(post._id, key1))
    }

    const editDeleteButton = (post) => {
        if (currentProfileUser._id === post.author._id){
            return(
                <>
                <div>
                    <button onClick={()=> handleClick(post)} className="EditDeleteButton">Delete</button>
                </div>
                </>
            )
        }
    }

    const capitalizedUsername = currentProfileUser?.username ?
    currentProfileUser.username.charAt(0).toUpperCase() + currentProfileUser.username.slice(1).toLowerCase()
    : '';

    let profileContent;
    if (contentState === 'posts') {
        profileContent = (
            <div>
                <h1 id="ProfilePostsTitle">{posts ? "" : "This user does not have any posts."}</h1>
                <div className='profilePosts'>
                    {posts?.map((post, i)=>
                        <React.Fragment key={i}>
                            <PostIndexItem key={`post-${i}`} post={post} />
                            {editDeleteButton(post)}
                        </React.Fragment>
                    )}
                </div>
            </div>
        )
    }
    else if (contentState === 'reviews') {
        profileContent = (
            <div>
                <h1 id="ProfilePostsTitle">{reviews ? "Reviews" : "This user does not have any reviews."}</h1>
                <div className='reviewDivs'>
                    {reviews?.map((review, i) => review.rating ?
                        <ReviewIndexItem key={i} review={review} /> :
                        <></>
                    )}
                </div>
            </div>
        )
    }


    return (
    <div id="outer">
        <h1 id="ProfileUsername">{capitalizedUsername}</h1>
        <div id='user-button-group'>
            <div id='user-button-group-button-left' className='user-button-group-button' onClick={()=>setContentState('reviews')}>Reviews</div>
            <div className='user-button-group-button' onClick={()=>setContentState('posts')}>Posts</div>
        </div>
        {profileContent}
    </div>
  )
}

export default Profile;
