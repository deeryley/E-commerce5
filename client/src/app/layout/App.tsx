import { CssBaseline } from "@mui/material";
import { Container } from "@mui/system";
import { Route, Routes } from "react-router-dom";
import AboutPage from "../../features/About/AboutPage";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import ContactPage from "../../features/Contact/ContactPage";
import HometPage from "../../features/Home/HomePage";
import Header from "./Header";

function App() {
  return (
    <>
      <CssBaseline />
      <Header />
      <Container>
        <Routes>
          <Route path="/" element={<HometPage />} />
          <Route path="catalog" element={<Catalog />} />
          <Route path="/catalog:id" element={<ProductDetails />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
