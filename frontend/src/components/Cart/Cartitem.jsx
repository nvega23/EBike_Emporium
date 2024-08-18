import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartInCheckout from "./CartInCheckout";
import { useNavigate } from "react-router-dom";
import "./cart.css";
import "./Cartitem.css";

const Cart = () => {
  const { cart } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();

  const emptyCart = () => {
    navigate("/checkout");
  };

  const showCartitems = () => (
    <>
      <div className="divAroundCartItem">
        {cart.map((p) => (
          <div key={p.post._id} className="cartItemContainer">
            <CartInCheckout p={p} />
            <button
              className="backToItemButton"
              onClick={() => navigate(`/item/${p?.post?._id}`)}
            >
              Back to Item
            </button>
          </div>
        ))}
      </div>
    </>
  );

  return (
    <>
      <div className="cart1Container">
        <div>
          {!cart.length ? (
            <div>
              <h1 className="emptyText">Your cart is Empty</h1>
              <br />
              <button className="emptyCartLink">
                <Link to="/posts" className="emptyCartLink">
                  <h1 className="emptyCartText">Shop today's deals</h1>
                </Link>
              </button>
            </div>
          ) : (
            showCartitems()
          )}
          <button
            disabled={!cart.length}
            className="checkoutButton"
            onClick={emptyCart}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default Cart;
