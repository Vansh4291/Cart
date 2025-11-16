import React from "react";

const Cart = ({ cart, onRemove, onUpdateQty, onCheckout }) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="mt-5">
      <h4>Cart</h4>
      {cart.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Item</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Subtotal</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item._id}>
                  <td>{item.title}</td>
                  <td>₹{item.price}</td>
                  <td>
                    <button onClick={() => onUpdateQty(item._id, item.qty - 1)}>
                      -
                    </button>
                    <span className="mx-2">{item.qty}</span>
                    <button onClick={() => onUpdateQty(item._id, item.qty + 1)}>
                      +
                    </button>
                  </td>
                  <td>₹{item.price * item.qty}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => onRemove(item._id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan="3">
                  <strong>Total</strong>
                </td>
                <td colSpan="2">
                  <strong>₹{total}</strong>
                </td>
              </tr>
            </tbody>
          </table>
          <button className="btn btn-primary mt-2" onClick={onCheckout}>
            Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
