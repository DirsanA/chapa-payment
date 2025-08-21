import axios from "axios";

export default function CheckoutButton() {
  const handleCheckout = async () => {
    try {
      const res = await axios.post("http://localhost:4400/api/pay");
      window.location.href = res.data.checkout_url; // Redirect to chapa
    } catch (err) {
      console.error("Payment init failed", err);
      alert("Payment failed");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Chapa Payment Test</h1>
      <button
        onClick={handleCheckout}
        style={{
          padding: "10px 20px",
          backgroundColor: "#0f62fe",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
        }}
      >
        Pay with Chapa
      </button>
    </div>
  );
}
