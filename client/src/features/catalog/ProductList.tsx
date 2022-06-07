import { Grid, List } from "@mui/material";
import { Product } from "../../app/models/product";
import ProductCard from "./ProductCard";

interface Props {
  products: Product[];
}

export default function ProductList({ products }: Props) {
  // visualizes the items as seperate components
  return (
    <Grid container spacing={4}>
      {/* // in the theme each of the {} numbers represent 8 pixels  4x8=32px */}
      {products.map((product) => (
        <Grid item xs={4} key={product.id}>
          {/* each item is 1/3 of the grid  */}
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}
