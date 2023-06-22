const ProfilePostIndex = ({post}) => {

    const convertDate = (date) => {
        const d = new Date(date);
        return d.toDateString();
    }

    return(
        <>
            <li className='post-container'>
                <div className='post-main-content'>
                    <span className='post-info-span' >
                        <span id="profileLink">
                            {post.author.username}
                        </span>
                        - {convertDate(post.createdAt)}</span>
                    <p className='post-body-text'>{post.body}</p>
                    <p>{post.reciepeName}</p>
                    <p>{post.price}</p>
                </div>
            </li>
        </>
    )
}

export default ProfilePostIndex;
