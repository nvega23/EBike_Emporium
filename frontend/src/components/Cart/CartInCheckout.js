import React from "react";
import "./Cartitem.css";
import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";

const CartInCheckout = ({ p }) => {
  // const { cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const handleQuantityChange = (e) => {
    let quantity = e.target.value < 1 ? 1 : e.target.value;
    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.map((post, i) => {
        if ((post.post._id.toString()) === (p.post._id).toString()) {
            cart[i].quantity = quantity
        }
      });
      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  const handleRemove = () => {
    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.map((post, i) => {
        if ((post.post._id.toString()) === (p.post._id).toString()) {
            cart.splice(i, 1)
        }
      });
      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  return (
    <>
      <div className="cartContainerCheckout">
        <img className="cartImg" src={p.post?.imageUrls[0]} alt="Cart Image"/>
        <div className="cartDescription">
        <h1 className="cartText">
          <h1 className="boldText">
            Bike Name:
          </h1>
          {p.post?.body}</h1>
        <h1 className="cartText">
          <h1 className="boldText">
            Bike Bio:
          </h1>
            {/* {p.post?.bikeName : p.post?.bikeName ? p.post?.bikeName} */}
            {p.post?.reciepeName ? p.post?.reciepeName : p.post?.bikeName}
          </h1>
          <p className="cartQuantity">
            <h1 className="boldText">
              Quantity:
            </h1>
            <input className="cartQuantityInput"
            type="number"
            value={p.quantity}
            onChange={handleQuantityChange}
            /></p>
        <div>
          <button className="removeCartItem"  onClick={handleRemove}>
            remove
          </button>
        </div>
        </div>
        <div className="summaryContainer">
          <h1 className="cartSub">Subtotal</h1>
          <p className="cartPrice">Total: ${(p.post?.price * p.quantity).toLocaleString()}</p>
        </div>
      </div>
    </>
  );
};

export default CartInCheckout;
