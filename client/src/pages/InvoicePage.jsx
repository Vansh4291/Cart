import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000";

export default function InvoicePage() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API_URL}/cart/orders`);
      if (res.data.success) {
        setOrders(res.data.orders);
      }
    } catch (err) {
      console.error("Failed to load orders:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4 fw-bold">Cart Orders (Invoice)</h2>

      {orders.length === 0 ? (
        <div className="alert alert-warning">No orders found.</div>
      ) : (
        orders.map((order, idx) => (
          <div key={order._id} className="card shadow-sm mb-4">
            <div className="card-header bg-dark text-white d-flex justify-content-between">
              <h5 className="mb-0">Invoice #{idx + 1}</h5>
              <span>{new Date(order.createdAt).toLocaleString()}</span>
            </div>

            <div className="card-body">
              <table className="table table-bordered text-center">
                <thead className="table-light">
                  <tr>
                    <th>Item</th>
                    <th>Price (₹)</th>
                    <th>Qty</th>
                    <th>Subtotal (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((it, i) => (
                    <tr key={i}>
                      <td>{it.name}</td>
                      <td>{it.price}</td>
                      <td>{it.qty}</td>
                      <td>{it.price * it.qty}</td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan="3" className="fw-bold text-end">
                      Total
                    </td>
                    <td className="fw-bold">{order.totalAmount}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
