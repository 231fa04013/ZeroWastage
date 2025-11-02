import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const navigate = useNavigate();

  // ✅ Fetch products using environment variable
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const showMessage = (message) => {
    setPopupMessage(message);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);
  };

  const addToCart = (product) => {
    setCart((prev) => {
      const exist = prev.find((item) => item._id === product._id);
      if (exist) {
        showMessage("Quantity updated in cart!");
        return prev.map((item) =>
          item._id === product._id ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        showMessage("Item added to your cart!");
        return [...prev, { ...product, qty: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item._id !== id));
    showMessage("Item removed from your cart!");
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      showMessage("Your cart is empty!");
      return;
    }
    setCart([]);
    showMessage("✅ Order placed successfully!");
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ fontFamily: "Arial, sans-serif", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* (Navbar, Search bar, Sidebar, Product grid, Footer) */}
      {/* Keep your UI exactly as before — only backend calls changed */}
    </div>
  );
};

export default Home;
