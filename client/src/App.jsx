import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import CartUseState from "./pages/CartUseState";
import CartRedux from "./pages/CartRedux";
import InvoicePage from "./pages/InvoicePage";

function App() {
  return (
    <BrowserRouter>
      <nav className="p-3 bg-light border mb-3">
        <Link to="/" className="me-3">Cart (useState)</Link>
        <hr />
        <Link to="/redux">Cart (Redux)</Link>
        <hr />
        <Link to="/invoice">Invoice</Link>
      </nav>
      <Routes>
        <Route path="/" element={<CartUseState />} />
        <Route path="/redux" element={<CartRedux />} />
        <Route path="/invoice" element={<InvoicePage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
