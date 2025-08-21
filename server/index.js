const express = require("express");
const cors = require("cors");
const axios = require("axios").default;
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4400;

app.use(cors()); // allow frontend to call API
app.use(express.json());

const CHAPA_URL = "https://api.chapa.co/v1/transaction/initialize";
const CHAPA_AUTH = process.env.CHAPA_AUTH; // from .env

// Headers with chapa secret key
const config = {
  headers: {
    Authorization: `Bearer ${CHAPA_AUTH}`,
    "Content-Type": "application/json",
  },
};

// Payment initialization
app.post("/api/pay", async (req, res) => {
  const RETURN_URL = "http://localhost:5173/success"; // React success page
  const CALLBACK_URL = "http://localhost:4400/api/verify-payment/";

  // Unique reference
  const TEXT_REF = "tx-" + Date.now();

  const data = {
    amount: "100",
    currency: "ETB",
    email: "ato@ekele.com",
    first_name: "Ato",
    last_name: "Ekele",
    tx_ref: TEXT_REF,
    callback_url: CALLBACK_URL + TEXT_REF,
    return_url: RETURN_URL,
  };

  try {
    const response = await axios.post(CHAPA_URL, data, config);
    res.json({ checkout_url: response.data.data.checkout_url });
  } catch (err) {
    console.log("Payment init error:", err.response?.data || err.message);
    res.status(500).json({ error: "Payment initialization failed" });
  }
});

// Verify payment
app.get("/api/verify-payment/:id", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.chapa.co/v1/transaction/verify/" + req.params.id,
      config
    );
    res.json(response.data);
  } catch (err) {
    console.log("Verification error:", err.response?.data || err.message);
    res.status(500).json({ error: "Verification failed" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
