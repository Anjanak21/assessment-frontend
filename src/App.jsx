import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SalesEntry from "./pages/SalesEntry";
import PrintPage from "./pages/PrintPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SalesEntry />} />
        <Route path="/print" element={<PrintPage />} />
      </Routes>
    </Router>
  );
}

export default App;