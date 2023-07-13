import {React, useEffect } from "react";
import ItemDescription from "./ItemDescription";

const Item = ({ post, postId }) => {
  useEffect(() => {
    fetchPosts(post)
  }, []);

  return (
    <ItemDescription itemPost={post} postId={postId} />
  );
};

export default Item;
