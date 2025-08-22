import { useState, useEffect } from "react";
import axios from "axios";

export default function CheckoutForm() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    amount: "",
    bank: "",
  });

  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch banks from backend
  useEffect(() => {
    axios
      .get("http://localhost:4400/api/banks")
      .then((res) => setBanks(res.data.data))
      .catch((err) => console.error("Failed to fetch banks:", err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:4400/api/pay", formData);
      window.location.href = res.data.checkout_url; // Redirect to Chapa
    } catch (err) {
      console.error("Payment init failed", err);
      alert("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-100 p-6 min-h-screen">
      <div className="bg-white shadow-lg p-6 rounded-2xl w-full max-w-md">
        <h2 className="mb-4 font-bold text-2xl text-center">
          💳 Chapa Payment
        </h2>
        <form onSubmit={handleCheckout} className="flex flex-col gap-4">
          <input
            type="text"
            name="first_name"
            placeholder="First Name"
            value={formData.first_name}
            onChange={handleChange}
            className="p-3 border rounded-lg focus:ring focus:ring-blue-300"
            required
          />
          <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            value={formData.last_name}
            onChange={handleChange}
            className="p-3 border rounded-lg focus:ring focus:ring-blue-300"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="p-3 border rounded-lg focus:ring focus:ring-blue-300"
            required
          />
          <input
            type="number"
            name="amount"
            placeholder="Amount (ETB)"
            value={formData.amount}
            onChange={handleChange}
            className="p-3 border rounded-lg focus:ring focus:ring-blue-300"
            required
          />

          {/* Bank Selection */}
          <select
            name="bank"
            value={formData.bank}
            onChange={handleChange}
            className="p-3 border rounded-lg focus:ring focus:ring-green-300"
            required
          >
            <option value="">-- Select Bank --</option>
            {banks.map((bank) => (
              <option key={bank.id} value={bank.id}>
                {bank.name}
              </option>
            ))}
          </select>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 shadow p-3 rounded-lg font-semibold text-white transition"
          >
            {loading ? "Processing..." : "Pay with Chapa"}
          </button>
        </form>
      </div>
    </div>
  );
}
