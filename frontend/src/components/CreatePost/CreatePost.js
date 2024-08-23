import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { clearPostErrors, composePost } from '../../store/post';
import './CreatePost.css';

function CreatePost() {
    const [body, setBody] = useState("");
    const author = useSelector(state => state.session.user);
    const [images, setImages] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);
    const [bikeName, setBikeName] = useState('');
    const [price, setPrice] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const query = location.search;
    const errors = useSelector(state => state.errors.post);
    const [dragActive, setDragActive] = useState(false);

    const updateFiles = useCallback(async (files) => {
        const fileArray = Array.from(files);
        setImages(fileArray);
        if (fileArray.length !== 0) {
            const urls = await Promise.all(
                fileArray.map(file => {
                    return new Promise((resolve) => {
                        const reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onload = () => resolve(reader.result);
                    });
                })
            );
            setImageUrls(urls);
        } else {
            setImageUrls([]);
        }
    }, []);

    const handleFilesChange = useCallback((e) => {
        const files = e.target.files;
        updateFiles(files);
    }, [updateFiles]);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            updateFiles(e.dataTransfer.files);
            e.dataTransfer.clearData();
        }
    }, [updateFiles]);

    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(true);
    }, []);

    const handleDragLeave = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
    }, []);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        dispatch(composePost(body, images, bikeName, price, query)).then(() => {
            navigate('/posts');
        });
    }, [body, images, bikeName, price, query, dispatch, navigate]);

    const handleRemoveImage = useCallback((index) => {
        const newImages = [...images];
        const newImageUrls = [...imageUrls];
        newImages.splice(index, 1);
        newImageUrls.splice(index, 1);
        setImages(newImages);
        setImageUrls(newImageUrls);
    }, [images, imageUrls]);

    useEffect(() => {
        dispatch(clearPostErrors());
    }, [dispatch]);

    const imgUploadTxt = useMemo(() => (images.length > 0 ? images[0].name : "Choose files or drag and drop here"), [images]);

    return (
        <div id="outerItem">
            <h1 className='postTitle'>
                Spark the Future: Trade-Up Your Ride!
            </h1>
            <form onSubmit={handleSubmit} className="PostForm">
                <input
                    value={body}
                    placeholder="Bike Name"
                    onChange={(e) => setBody(e.target.value)}
                    rows="5"
                    cols="33"
                    className="sellItemInput"
                />
                <label 
                    className={`entireUpload ${dragActive ? 'drag-active' : ''}`} 
                    onDragOver={handleDragOver} 
                    onDragLeave={handleDragLeave} 
                    onDrop={handleDrop}
                >
                    {imgUploadTxt} &nbsp;
                    <input
                        type="file"
                        accept=".jpg, .jpeg, .png"
                        multiple
                        onChange={handleFilesChange}
                        className="photoUpload"
                    />
                </label>

                {imageUrls.length > 0 && (
                    <div className="imagePreviewContainer">
                        {imageUrls.map((url, index) => (
                            <div key={index} className="imagePreviewWrapper">
                                <img src={url} alt={`Preview ${index}`} className="imagePreview" />
                                <button type="button" className="removeImageButton" onClick={() => handleRemoveImage(index)}>X</button>
                            </div>
                        ))}
                    </div>
                )}

                <input
                    value={bikeName}
                    placeholder="Bike Bio"
                    onChange={(e) => setBikeName(e.target.value)}
                    className="sellItemInput"
                    id='itemBio'
                />
                <div className="errors">{errors?.price}</div>
                <input
                    type='text'
                    value={price}
                    placeholder="Price"
                    onChange={(e) => setPrice(e.target.value)}
                    className="sellItemInput"
                />

                <input type='submit'
                    value="Post"
                    disabled={!body}
                    className="itemSubmitButton"
                />
            </form>
        </div>
    );
}

export default CreatePost;
