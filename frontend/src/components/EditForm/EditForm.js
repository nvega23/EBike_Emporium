import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { updatePost } from '../../store/post';

function EditForm() {
    const { postId } = useParams();
    const [body, setBody] = useState("")
    const author = useSelector(state => state.session.user)
    const [images, setImages] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);
    const dispatch = useDispatch();

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
        dispatch(updatePost(body, images, postId)); //
        setImages([]);
        setImageUrls([]);
        setBody('');
    };

  return (
    <div id="outer">

        <form onSubmit={handleSubmit} className="form">
            <textarea
            value= {body}
            placeholder="Body"
            onChange={(e) => setBody(e.target.value)}
            rows="5"
            cols="33"
            className="textinput"/>

              <label className="entireUpload">
                  Images to Upload &nbsp;
                  <input
                      type="file"
                      accept=".jpg, .jpeg, .png"
                      multiple
                      onChange={updateFiles}
                      className="photoUpload"
                      />
              </label>

              <input type='submit'
                    value="Post"
                    disabled={!body}
                    className="submitButton"
                />
        </form>
    </div>
  )
}

export default EditForm;
