import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom';
import { clearPostErrors, composePost, fetchPosts } from '../../store/post';


function CreatePost() {


    const [body, setBody] = useState("")
    const author = useSelector(state => state.session.user)
    const [images, setImages] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);
    const [reciepeName, setReciepeName] = useState();
    const [price, setPrice] = useState();
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
        dispatch(composePost(body, images, reciepeName, price, query)); //
        // navigate.push('/posts')
    };


    useEffect(() => {
        // return () => {
        dispatch(clearPostErrors());
        //};
    }, [dispatch]);


    let imgUploadTxt = "Click here to Upload Image";
    if (images.length > 0) imgUploadTxt = images[0].name;

  return (
    <div id="outer">

        <form onSubmit={handleSubmit} className="form">
            <input
            value= {body}
            placeholder="Body"
            onChange={(e) => setBody(e.target.value)}
            rows="5"
            cols="33"
            className="review-style-inputs"/>
            <label>Body</label>

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

               <input
                  value= {reciepeName}
                  placeholder="Reciepe Name"
                  onChange={(e) => setReciepeName(e.target.value)}
                  className="review-style-inputs"
                  id='recipie-name'
                  />
                  <label>Reciepe Name</label>
              <div className="errors">{errors?.price}</div>
                <input
                  type='text'
                  value= {price}
                  placeholder="Price"
                  onChange={(e) => setPrice(e.target.value)}
                  className="review-style-inputs"/>
                  <label>Price</label>


              <input type='submit'
                    value="Post"
                    disabled={!body}
                    className="submitButton"
                />

        </form>



    </div>
  )
}

export default CreatePost
