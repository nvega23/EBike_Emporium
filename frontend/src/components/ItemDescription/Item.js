import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ItemDescription from "./ItemDescription";
import { fetchPost } from "../../store/post";
import { useParams } from "react-router";

const Item = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const post = useSelector(store => store.post[id]);

  useEffect(() => {
    if (id) {
      dispatch(fetchPost(id));
    }
  }, [dispatch, id]);

  if (!post) {
    return <h1 className="notWorking">Not working</h1>;
  }

  return (
    <>
      <ItemDescription post={post} />
    </>
  );
};

export default Item;
