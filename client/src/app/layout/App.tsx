import { CssBaseline } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AboutPage from "../../features/About/AboutPage";
import { fetchCurrentUser } from "../../features/account/AccountSlice";
import Login from "../../features/account/Login";
import Register from "../../features/account/Register";
import CartPage from "../../features/cart/CartPage";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import CheckoutPage from "../../features/Checkout/CheckoutPage";
import ContactPage from "../../features/Contact/ContactPage";
import HomePage from "../../features/Home/HomePage";
import agent from "../api/agent";
import { useStoreContext } from "../context/StoreContext";
import { useAppDispatch } from "../store/ConfigureStore";
import { getCookie } from "../Utilities/Utilities";
import Header from "./Header";
import "react-toastify/dist/ReactToastify.css";

function App() {
  // creates cart  on start of app and gets cookies
  const { setCart } = useStoreContext();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const buyerId = getCookie("buyerId");
    dispatch(fetchCurrentUser());
    if (buyerId) {
      agent.Cart.get().then((cart) => setCart(cart));
    }
  }, [dispatch]);

  return (
    <>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <CssBaseline />
      <Header />
      <Container>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="catalog" element={<Catalog />} />
          <Route path="/catalog/:id" element={<ProductDetails />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
