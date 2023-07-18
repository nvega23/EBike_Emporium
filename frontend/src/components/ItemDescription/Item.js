import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ItemDescription from "./ItemDescription";
import { fetchPost, fetchPosts } from "../../store/post";
import { useParams } from "react-router";

const Item = () => {
  const dispatch = useDispatch();
  const {id} = useParams();
  const posts = Object.values(useSelector(store => store.post));
  // const posts = useSelector((state) =>{
  //   return Object.values(state.posts).filter((post)=>post.id === id)
  // });

  useEffect(() => {
    dispatch(fetchPost(id));
  }, [dispatch, id]);

    return (
      <>
      {posts && posts.map((post,i)=><ItemDescription post={post}/>)}
    </>
  )
  // return <ItemDescription />;
};

export default Item;
