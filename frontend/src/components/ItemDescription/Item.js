import { React, useEffect } from "react";
import { useDispatch } from "react-redux";
import ItemDescription from "./ItemDescription";
import { fetchPosts } from "../../store/post";

const Item = ({ post, postId }) => {
  const dispatch = useDispatch();
  console.log(post, postId, 'im in the Item');

  useEffect(() => {
    dispatch(fetchPosts(post));
  }, [dispatch, post]);

  return <ItemDescription post={post} postId={postId} />;
};

export default Item;
