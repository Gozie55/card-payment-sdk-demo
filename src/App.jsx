import { BrowserRouter, Routes, Route } from "react-router-dom";

import CardForm from "./pages/CardForm";
import CardPage from "./pages/CardPage";
import BankPage from "./pages/BankPage";
import UssdPage from "./pages/UssdPage";
import PushpayPage from "./pages/PushpayPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Homepage */}
        <Route path="/" element={<CardForm />} />

        {/* Gateway pages */}
        <Route path="/card" element={<CardPage />} />
        <Route path="/bank" element={<BankPage />} />
        <Route path="/ussd" element={<UssdPage />} />
        <Route path="/pushpay" element={<PushpayPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
