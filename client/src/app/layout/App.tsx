import { CssBaseline } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import AboutPage from "../../features/About/AboutPage";
import CartPage from "../../features/cart/CartPage";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import CheckoutPage from "../../features/Checkout/CheckoutPage";
import ContactPage from "../../features/Contact/ContactPage";
import HometPage from "../../features/Home/HomePage";
import agent from "../api/agent";
import { useStoreContext } from "../context/StoreContext";
import { getCookie } from "../Utilities/Utilities";
import Header from "./Header";

function App() {
  // creates cart  on start of app and gets cookies
  const { setCart } = useStoreContext();

  useEffect(() => {
    const buyerId = getCookie("buyerId");
    if (buyerId) {
      agent.Cart.get().then((cart) => setCart(cart));
    }
  }, [setCart]);

  return (
    <>
      <CssBaseline />
      <Header />
      <Container>
        <Routes>
          <Route path="/" element={<HometPage />} />
          <Route path="catalog" element={<Catalog />} />
          <Route path="/catalog/:id" element={<ProductDetails />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
function cart(cart: any): any {
  throw new Error("Function not implemented.");
}
