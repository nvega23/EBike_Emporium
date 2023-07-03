import React from "react";
import { useSelector } from "react-redux";

const ItemDescription = ({ post, postId }) => {
  const posts = useSelector(store => Object.values(store.post));
  // console.log(posts, postId);

  const handlePost = () => {
    const selectedPost = posts.find((post) => postId === postId);
    console.log(selectedPost, 'im the selected post')
    if (selectedPost) {
      return (
        <>
          <div>
            {/* <img className='images' loading='lazy' src={post.imageUrls[0]} alt='post-image'/> */}
            <p>{selectedPost.body}</p>
            <p>{selectedPost.reciepeName}</p>
          </div>
        </>
        )
      }
    return null;
  };

  return (
    <div>
      <h1>This is the item description</h1>
      <div>{handlePost()}</div>
    </div>
  );
};

export default ItemDescription;
