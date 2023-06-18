import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import CartInCheckout from "./CartInCheckout";
import { useNavigate } from "react-router-dom";

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
           {!cart.length ? (<h1>Your Cart is Empty. <Link to="/posts">Add items to get started</Link></h1>) : ("show cart items")}
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
      {cart.map((p) => (
        <CartInCheckout key={p._id} p={p} />
      ))}
    </>
  );

  return (
    <>
      <div className="cart1">
        {/* <h1>Cart</h1> */}

        <div >
          {!cart.length ? (
        <div>

            <h1>
              Your Cart is Empty.
            </h1>
            <button className="cart2">
            <Link to="/posts" className="link">ADD ITEMS</Link>
            </button>
        </div>

          ) : (

            showCartitems()
          )}
          <button
            disabled={!cart.length}
            className="button"
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
