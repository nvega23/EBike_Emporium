import React from "react";
// import "./Cartitem.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {CloseOutlined} from "@ant-design/icons"

const CartInCheckout = ({ p }) => {
  const { cart } = useSelector((state) => ({ ...state }));
//   console.log(p.post.price);
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
    // console.log(p.post._id)
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
    <div className="cart3">
      <img className="image1" src={p.post.imageUrls[0]}></img>
      <div className="cart4">

      <h1 className="cart5">Recipe Name: {p.post.reciepeName.toUpperCase()}</h1>
      <p className="cart6">Price: ${p.post.price * p.quantity}</p>
      {/* <p>
        {p.post.price} x {p.quantity} = {p.post.price * p.quantity}
        </p> */}
        <p className="cart7">Quantity:<input className="cart9"
          type="number"
          value={p.quantity}
          onChange={handleQuantityChange}
        /></p>
      </div>


      <p className="cart8"><CloseOutlined onClick={handleRemove}/></p>
    </div>
  );
};

export default CartInCheckout;
