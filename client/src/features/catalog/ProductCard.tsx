import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import agent from "../../app/api/agent";
import { useStoreContext } from "../../app/context/StoreContext";
import { Product } from "../../app/models/product";
import { FormatBGN } from "../../app/Utilities/Utilities";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { setCart } = useStoreContext();

  function AddItemToCart(productId: number) {
    agent.Cart.addItem(productId).then((cart) => setCart(cart));
  }
  return (
    <Card>
      <CardHeader
        title={product.name}
        titleTypographyProps={{
          sx: {
            fontWeight: "bold",
            color: "primary.main",
            paddingBottom: "30px",
            textAlign: "center",
          },
        }}
      />

      <CardMedia
        sx={{ objectFit: "contain" }}
        component="img"
        height="200"
        image={product.pictureUrl}
        alt={product.name}
        title={product.name}
      />

      <CardContent>
        <Typography gutterBottom variant="h5">
          {FormatBGN(product.price)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.brand} / {product.type}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => AddItemToCart(product.id)}>
          Add To Cart
        </Button>
        <Button component={Link} to={`/catalog/${product.id}`} size="small">
          View
        </Button>
      </CardActions>
    </Card>
  );
}
