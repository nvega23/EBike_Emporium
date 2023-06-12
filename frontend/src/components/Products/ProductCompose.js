import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearProductErrors, composeProduct } from '../../store/products';
import ProductBox from './ProductBox';

function ProductCompose () {
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const newProduct = useSelector(state => state.products.new);
  const errors = useSelector(state => state.errors.products);

  useEffect(() => {
    return () => dispatch(clearProductErrors());
  }, [dispatch]);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(composeProduct({ text }));
    setText('');
  };

  const update = e => setText(e.currentTarget.value);

  return (
    <>
      <form className="composeProduct" onSubmit={handleSubmit}>
        <input
          type="textarea"
          value={text}
          onChange={update}
          placeholder="Write your product..."
        />
        <div className="errors">{errors && errors.text}</div>
        <input type="submit" value="Submit" />
      </form>
      <ProductBox text={newProduct?.text} />
    </>
  )
}

export default ProductCompose;
