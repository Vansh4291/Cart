import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setProducts,
  addToCart,
  removeFromCart,
  adjustQty,
  clearCart
} from "../cartSlice";
import axios from "axios";
import Cart from "../components/Cart";
import ProductList from "../components/ProductList";

const CartRedux = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.cart.products);
  const cart = useSelector(state => state.cart.cart);

  // Load products (same as useState)
  useEffect(() => {
    axios
      .get(`http://localhost:3000/products`)
      .then(res => dispatch(setProducts(res.data.products)))
      .catch(err => console.error(err));
  }, []);

  // Checkout
  const checkout = async () => {
    if (cart.length === 0) {
      alert("Cart is empty!");
      return;
    }

    try {
      const res = await axios.post(`http://localhost:3000/cart/checkout`, {
        cartItems: cart
      });

      if (res.data.success) {
        alert("Order placed successfully!");
        dispatch(clearCart());
      }
    } catch (error) {
      console.error(error);
      alert("Error during checkout");
    }
  };

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="container mt-4">
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Shopping Cart (Redux)</h2>

        <button
          className="btn btn-primary position-relative px-4 py-2 shadow-sm"
          data-bs-toggle="offcanvas"
          data-bs-target="#cartPanelRedux"
        >
          View Cart
          {totalItems > 0 && (
            <span className="badge bg-danger rounded-circle position-absolute top-0 start-100 translate-middle">
              {totalItems}
            </span>
          )}
        </button>
      </div>

      {/* PRODUCTS */}
      <div className="card shadow-sm p-3">
        <h4 className="mb-3">Products</h4>
        <ProductList products={products} onAddToCart={(p) => dispatch(addToCart(p))} />
      </div>

      {/* CART OFFCANVAS */}
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="cartPanelRedux"
      >
        <div className="offcanvas-header border-bottom">
          <h5 className="offcanvas-title fw-bold">Your Cart</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas"></button>
        </div>

        <div className="offcanvas-body">
          <Cart
            cart={cart}
            onRemove={(id) => dispatch(removeFromCart(id))}
            onUpdateQty={(id, qty) => dispatch(adjustQty({ id, newQty: qty }))}
            onCheckout={checkout}
          />
        </div>
      </div>
    </div>
  );
};

export default CartRedux;
