// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { clearProductErrors, fetchProducts } from '../../store/products';
// import ProductBox from './ProductBox';

// function Products () {
//   const dispatch = useDispatch();
//   const products = useSelector(state => Object.values(state.products.all));

//   useEffect(() => {
//     dispatch(fetchProducts());
//     return () => dispatch(clearProductErrors());
//   }, [dispatch])

//   if (products.length === 0) return <div>There are no Products</div>;

//   return (
//     <>
//       <h2>All Products</h2>
//       {products.map(product => (
//         <ProductBox key={product._id} text={product.text} username={product.author.username} />
//       ))}
//     </>
//   );
// }

// export default Products;
