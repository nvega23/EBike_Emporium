import ItemDescription from "./ItemDescription";

const Item = ({post}) => {
    return (
        <>
        {post.map((p) => (
            <ItemDescription key={p._id} p={p} />
        ))}
        </>
    )
}

export default Item;
