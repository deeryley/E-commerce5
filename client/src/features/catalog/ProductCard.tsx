import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import { Product } from "../../app/models/product";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
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
        height="300"
        image={product.pictureUrl}
        alt={product.name}
        title={product.name}
      />

      <CardContent>
        <Typography gutterBottom variant="h5">
          {product.price.toFixed(2)} BGN
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.brand} / {product.type}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Add To Cart</Button>
        <Button size="small">View</Button>
      </CardActions>
    </Card>
  );
}
