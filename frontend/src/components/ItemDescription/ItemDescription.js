import { useSelector } from "react-redux";

const ItemDescription = () => {
    const { post } = useSelector((state) => ({ ...state }));
    console.log(post, 'im the post')

    return (
        <>
            <div>
                <h1>This is the item description</h1>
            </div>
        </>
    )
}

export default ItemDescription;
