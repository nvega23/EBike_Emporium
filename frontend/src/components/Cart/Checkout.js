import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import './Checkout.css'

const Checkout = ({ setShowModal }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
const emptyCart = () => {
    navigate("/posts");
    if (typeof window !== "undefined"){
        localStorage.removeItem("cart")
    }
    dispatch({
        type: "ADD_TO_CART",
        payload: [],
    })
}
    return (
        <div className="purchaseContainer">
            <br /><br />
            <h1>
                Your new bike will arrive shortly!
            </h1>
            <br />
            <button className="checkoutButton"  onClick={emptyCart}>
                Continue Shopping
            </button>
        </div>
    );
}

export default Checkout;
