import { useDispatch, useSelector } from "react-redux";
import { Link, useN, useNavigate } from "react-router-dom";


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
        <div className="checkout23">
            <i className="fa-solid fa-xmark" onClick={emptyCart} id="xmark23"></i>

                <br /><br />
                <h1>Thank you!</h1>
                <br /><br />
                <p>
                    {"for checking out our website!".toUpperCase()}
                </p>
                    <br />
                    <button  onClick={emptyCart}>
                        HOME PAGE
                    </button>

        </div>
    );
}

export default Checkout;
