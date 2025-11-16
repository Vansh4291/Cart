import React from "react";

const ProductList = ({ products, onAddToCart }) => {
  return (
    <div className="row">
      {products.map((product) => (
        <div className="col-md-4 mb-4" key={product._id}>
          <div className="card shadow-sm h-100 border-0">
            <img
              src={`http://localhost:3000/uploads/${product.image}`}
              className="card-img-top"
              alt={product.title}
              style={{ height: "220px", objectFit: "cover" }}
            />

            <div className="card-body d-flex flex-column">
              <h5 className="card-title fw-bold">{product.title}</h5>
              <p classnName="text-muted mb-2">₹{product.price}</p>

              <button
                className="btn btn-primary mt-auto w-100 shadow-sm"
                onClick={() => onAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
