import { BrowserRouter, Routes, Route } from "react-router-dom";
import CheckoutButton from "./componets/CheckoutButton";
import Success from "./pages/Sucess";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CheckoutButton />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
