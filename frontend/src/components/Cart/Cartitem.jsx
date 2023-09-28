import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartInCheckout from "./CartInCheckout";
import { useNavigate } from "react-router-dom";
import "./cart.css"
import "./Cartitem.css";

const Cart = () => {
  const { cart } = useSelector((state) => ({ ...state }));

  const navigate = useNavigate();
  const emptyCart = () => {
    navigate("/checkout");
    return (
          <div id ="outerforcar">
        <div>
            <h1>Cart</h1>
        </div>

        <div>
           {!cart.length ? (<h1>Your Cart is Empty. <Link to="/posts" className="linkGetStarted">Add items to get started</Link></h1>) : ("show cart items")}
        </div>
            {cart.map((c, i) => (
                <div key={i}>
                    <p>{c.post.body} x {c.quantity} = $total</p>
                </div>
            ))}
            <button disabled={!cart.length}>Proceed to Checkout</button>
        </div>
    )
}

  const showCartitems = () => (
    <>
      <div className="divAroundCartItem">
        {cart.map((p) => (
          <CartInCheckout key={p._id} p={p} />
        ))}
      </div>
    </>
  );

  return (
    <>
      <div className="cart1Container">
        <div >
          {!cart.length ? (
        <div>

            <h1 className="emptyText">
              Your cart is Empty
            </h1>
            <br/>
            <button className="emptyCartLink">
            <Link to="/posts" className="emptyCartLink">
              <h1 className="emptyCartText">
                Shop today's deals
              </h1>
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
