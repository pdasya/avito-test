import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "./App.scss";
import NavigationBar from "@components/Navigation/Navigation";
import AdPage from "@views/adverticements/AdPage";
import AdDetail from "@components/AdDetail/AdDetail";
import OrdersPage from "@views/orders/OrdersPage";
import Footer from "@components/Footer/Footer";
import NotFoundPage from "@views/notFound/NotFoundPage";
import ErrorBoundary from "@components/ErrorBoundary/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Navigate to="/advertisements" replace />} />
          <Route path="/advertisements" element={<AdPage />} />
          <Route path="/advertisements/:id" element={<AdDetail />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </Router>
    </ErrorBoundary>
  );
}

export default App;
