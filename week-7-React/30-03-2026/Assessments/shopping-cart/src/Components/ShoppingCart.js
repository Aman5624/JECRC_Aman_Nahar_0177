import React, { useState } from "react";

function ShoppingCart() {
  const products = [
    { id: 1, name: "React T-Shirt", price: 25 },
    { id: 2, name: "JavaScript Mug", price: 15 },
    { id: 3, name: "NodeJS Cap", price: 20 }
  ];

  const [cart, setCart] = useState([]);

  // Add to Cart
  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);

    if (existing) {
      const updatedCart = cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Increase Quantity
  const increaseQty = (id) => {
    setCart(cart.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  // Decrease Quantity
  const decreaseQty = (id) => {
    setCart(cart.map(item =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    ));
  };

  // Remove Item
  const removeItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  // Total Price
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div style={styles.container}>
      <h2>🛒 Shopping Cart</h2>

      {/* Product List */}
      <h3>Products</h3>
      {products.map(product => (
        <div key={product.id} style={styles.product}>
          {product.name} - ${product.price}
          <button onClick={() => addToCart(product)}>Add</button>
        </div>
      ))}

      {/* Cart Section */}
      <h3>Cart</h3>
      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        cart.map(item => (
          <div key={item.id} style={styles.cartItem}>
            {item.name} - ${item.price} × {item.quantity}

            <div>
              <button onClick={() => increaseQty(item.id)}>+</button>
              <button onClick={() => decreaseQty(item.id)}>-</button>
              <button onClick={() => removeItem(item.id)}>❌</button>
            </div>
          </div>
        ))
      )}

      <h3>Total: ${total}</h3>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    textAlign: "center"
  },
  product: {
    margin: "10px",
    padding: "10px",
    border: "1px solid #ccc"
  },
  cartItem: {
    margin: "10px",
    padding: "10px",
    border: "1px solid #aaa",
    display: "flex",
    justifyContent: "space-between"
  }
};

export default ShoppingCart;