import { React, useEffect } from "react";
import { useDispatch } from "react-redux";
import ItemDescription from "./ItemDescription";
import { fetchPost, fetchPosts } from "../../store/post";
import { useParams } from "react-router";

const Item = () => {
  const dispatch = useDispatch();
  const {id} = useParams();
  // console.log(post, postId, 'im in the Item');

  useEffect(() => {
    dispatch(fetchPost(id));
  }, [dispatch, id]);

  return <ItemDescription />;
};

export default Item;
