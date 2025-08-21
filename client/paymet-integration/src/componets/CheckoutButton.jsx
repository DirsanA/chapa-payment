import { useState } from "react";
import axios from "axios";

export default function CheckoutForm() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    amount: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4400/api/pay", formData);
      window.location.href = res.data.checkout_url; // Redirect to Chapa
    } catch (err) {
      console.error("Payment init failed", err);
      alert("Payment failed");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>💳 Chapa Payment</h2>
      <form
        onSubmit={handleCheckout}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: "300px",
          margin: "auto",
        }}
      >
        <input
          type="text"
          name="first_name"
          placeholder="First Name"
          value={formData.first_name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="last_name"
          placeholder="Last Name"
          value={formData.last_name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount (ETB)"
          value={formData.amount}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          style={{
            padding: "10px",
            backgroundColor: "#0f62fe",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Pay with Chapa
        </button>
      </form>
    </div>
  );
}
