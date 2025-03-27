import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FullLayout from "./layout/layout";
import Dashboard from "./view/dashboard/dashboard";
import Product from "./view/product/product";
import Login from "./auth/login";
import ProtectedRoute from "./protected-route";
import { ToastContainer } from "react-toastify";
import Enquiry from "./view/enquiry/enquiry";
import Category from "./view/category/categories";
import Quotation from "./view/quotations/quotations";
import "./App.css";
import ResetPassword from "./view/ResetPassword";

function App() {
  return (
    <div className="App">
      <Router>
        <main>
          <ToastContainer />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<FullLayout />}>
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="product" element={<Product />} />
                <Route path="enquiry" element={<Enquiry />} />
                <Route path="category" element={<Category />} />
                <Route path="quotation" element={<Quotation />} />
              </Route>
            </Route>
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
