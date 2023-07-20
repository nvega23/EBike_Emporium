import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom';
import { clearPostErrors, composePost, fetchPosts } from '../../store/post';
import './CreatePost.css';

function CreatePost() {
    const [body, setBody] = useState("")
    const author = useSelector(state => state.session.user)
    const [images, setImages] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);
    const [bikeName, setBikeName] = useState('');
    const [price, setPrice] = useState('');
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation();
    const query = location.search;
    const errors = useSelector(state => state.errors.post)

    const updateFiles = async e => {
        const files = e.target.files;
        setImages(files);
        if (files.length !== 0) {
            let filesLoaded = 0;
            const urls = [];
            Array.from(files).forEach((file, index) => {
                const fileReader = new FileReader();
                fileReader.readAsDataURL(file);
                fileReader.onload = () => {
                    urls[index] = fileReader.result;
                    if (++filesLoaded === files.length)
                        setImageUrls(urls);
                }
            });
        }
        else setImageUrls([]);
    }

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(composePost(body, images, bikeName, price, query)); //
        // navigate.push('/posts')
    };


    useEffect(() => {
        dispatch(clearPostErrors());
    }, [dispatch]);


    let imgUploadTxt = "";
    if (images.length > 0) imgUploadTxt = images[0].name;

  return (
    <div id="outerItem">
        <h1 className='postTitle'>
            Spark the Future: Trade-Up Your Ride!"
        </h1>
        <form onSubmit={handleSubmit} className="PostForm">
            <input
            value= {body}
            placeholder="Bike Name"
            onChange={(e) => setBody(e.target.value)}
            rows="5"
            cols="33"
            className="sellItemInput"/>
            {/* <label>What are you selling?</label> */}

              <label className="entireUpload">
                  {imgUploadTxt} &nbsp;
                  <input
                      type="file"
                      accept=".jpg, .jpeg, .png"
                      multiple
                      onChange={updateFiles}
                      className="photoUpload"
                      />
              </label>

                {/* Display the image preview */}
                {imageUrls.length > 0 && (
                    <img src={imageUrls[0]} alt="Preview" className="imagePreview" />
                )}

               <input
                  value= {bikeName}
                  placeholder="Bike Bio"
                  onChange={(e) => setBikeName(e.target.value)}
                  className="sellItemInput"
                  id='itemBio'
                  />
                  {/* <label>Bio</label> */}
              <div className="errors">{errors?.price}</div>
                <input
                  type='text'
                  value= {price}
                  placeholder="Price"
                  onChange={(e) => setPrice(e.target.value)}
                  className="sellItemInput"/>
                  {/* <label>Price</label> */}


              <input type='submit'
                    value="Post"
                    disabled={!body}
                    className="itemSubmitButton"
                />

        </form>



    </div>
  )
}

export default CreatePost
