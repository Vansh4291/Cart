import React, { useEffect, useState } from "react";
import axios from "axios";
import Cart from "../components/Cart";
import ProductList from "../components/ProductList";

const CartUseState = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  // Load products
  useEffect(() => {
    axios
      .get(`http://localhost:3000/products`)
      .then((res) => setProducts(res.data.products))
      .catch((err) => console.error(err));
  }, []);

  // Add to cart
  const addToCart = (product) => {
    const existing = cart.find((item) => item._id === product._id);
    if (existing) {
      setCart(
        cart.map((item) =>
          item._id === product._id ? { ...item, qty: item.qty + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  // Update qty
  const updateQty = (id, newQty) => {
    if (newQty <= 0) {
      removeFromCart(id);
      return;
    }

    setCart(
      cart.map((item) =>
        item._id === id ? { ...item, qty: newQty } : item
      )
    );
  };

  // Remove
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item._id !== id));
  };

  // Checkout
  const checkout = async () => {
    if (cart.length === 0) {
      alert("Cart is empty!");
      return;
    }

    try {
      const res = await axios.post(`http://localhost:3000/cart/checkout`, {
        cartItems: cart,
      });

      if (res.data.success) {
        alert("Order placed successfully!");
        setCart([]);
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
        <h2 className="fw-bold">Shopping Cart</h2>

        <button
          className="btn btn-primary position-relative px-4 py-2 shadow-sm"
          data-bs-toggle="offcanvas"
          data-bs-target="#cartPanel"
        >
          View Cart
          {totalItems > 0 && (
            <span className="badge bg-danger rounded-circle position-absolute top-0 start-100 translate-middle">
              {totalItems}
            </span>
          )}
        </button>
      </div>

      {/* PRODUCT LIST */}
      <div className="card shadow-sm p-3">
        <h4 className="mb-3">Products</h4>
        <ProductList products={products} onAddToCart={addToCart} />
      </div>

      {/* CART OFFCANVAS */}
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="cartPanel"
      >
        <div className="offcanvas-header border-bottom">
          <h5 className="offcanvas-title fw-bold">Your Cart</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas"></button>
        </div>

        <div className="offcanvas-body">
          <Cart
            cart={cart}
            onRemove={removeFromCart}
            onUpdateQty={updateQty}
            onCheckout={checkout}
          />
        </div>
      </div>
    </div>
  );
};

export default CartUseState;
