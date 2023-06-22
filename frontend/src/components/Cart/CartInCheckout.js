import React from "react";
import "./Cartitem.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {CloseOutlined} from "@ant-design/icons"

const CartInCheckout = ({ p }) => {
  const { cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const handleQuantityChange = (e) => {
    let quantity = e.target.value < 1 ? 1 : e.target.value;
    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.map((post, i) => {
        if ((post.post._id.toString()) == (p.post._id).toString()) {
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
        if ((post.post._id.toString()) == (p.post._id).toString()) {
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
      <h1 className="cartTitle">Bag</h1>
      <div className="cartContainer">
        <img className="cartImg" src={p.post.imageUrls[0]}/>
        <div className="cartDescription">
        <h1 className="cart5">Bike Name: {p.post.body.toUpperCase()}</h1>
        <h1 className="cart5">Bike Bio: {p.post.reciepeName.toUpperCase()}</h1>
          <p className="cart7">Quantity:<input className="cart9"
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
          {/* <h3 className="">Estimated Tax</h3> */}
          <p className="cartPrice">Price: ${p.post.price * p.quantity}</p>
        </div>
      </div>
    </>
  );
};

export default CartInCheckout;
