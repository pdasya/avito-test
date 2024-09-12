import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "./App.css";
import AdPage from "./views/adverticements/AdPage";
import AdDetail from "./components/AdDetail/AdDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/advertisements" replace />} />
        <Route path="/advertisements" element={<AdPage />} />
        <Route path="/advertisements/:id" element={<AdDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
