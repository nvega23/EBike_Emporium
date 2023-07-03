import React from "react";
import ItemDescription from "./ItemDescription";

const Item = ({ post, postId }) => {
  console.log(post, "im in the Item component");
  return (
    <ItemDescription itemPost={post} postId={postId} />
  );
};

export default Item;
