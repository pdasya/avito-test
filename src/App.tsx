import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "./App.css";
import AdPage from "./views/adverticements/AdPage";
import AdDetail from "./components/AdDetail/AdDetail";
import NavigationBar from "./components/Navigation/Navigation";
import OrdersPage from "./views/orders/OrdersPage";

function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Navigate to="/advertisements" replace />} />
        <Route path="/advertisements" element={<AdPage />} />
        <Route path="/advertisements/:id" element={<AdDetail />} />
        <Route path="/orders" element={<OrdersPage />} />
      </Routes>
    </Router>
  );
}

export default App;
