import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import HomePage from "./page/HomePage";
import "bootstrap/dist/css/bootstrap.min.css";
import GetData from "./GetData";
import LoginPage from "./page/LoginPage";
import ErrorPage from "./page/ErrorPage.JS";
import RegisterPage from "./page/RegisterPage";
import CartPage from "./page/CartPage";
import ProductDetail from "./page/ProductDetail";
import CheckoutPage from "./page/CheckOut";
import Profile from "./page/Profile";
import NewsDetail from "./page/NewsDetail";
import HeaderAdminComponent from "./AdminPage/HeaderAdminComponent";
import HomePageAdmin from "./AdminPage/HomePageAdmin";
import Usermanagement from "./AdminPage/Usermanagement";
import ProductManager from "./AdminPage/ProductManager";


function App() {
  return (
    <div>
      <BrowserRouter>
        <GetData>
          {" "}
          <Routes>
          <Route path="/HeaderAdminComponent" element={<HeaderAdminComponent />} />
          <Route path="/HomePageAdmin" element={<HomePageAdmin />} />
          <Route path="/register" element={<RegisterPage />} />

            <Route path="/LoginPage" element={<LoginPage />} />
            <Route path="/HomePage" element={<HomePage />} />
            <Route path="/ErrorPage" element={<ErrorPage />} />
            <Route path="/ProductDetail/:id" element={<ProductDetail />} />
            <Route path="/RegisterPage" element={<RegisterPage />} />
            <Route path="/CartPage" element={<CartPage />} />
            <Route path="/CheckOut" element={<CheckoutPage />} />
            <Route path="/Profile" element={<Profile />} />
            
            <Route path="/admin/Usermanagement" element={<Usermanagement />} />
            <Route path="/admin/product-management" element={<ProductManager />} />

            <Route path="/NewsPage/:id" element={< NewsDetail/>} />

          </Routes>
        </GetData>
      </BrowserRouter>
    </div>
  );
}

export default App;
