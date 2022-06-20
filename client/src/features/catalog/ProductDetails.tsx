import {
  Button,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import agent from "../../app/api/agent";
import { useStoreContext } from "../../app/context/StoreContext";
import { Product } from "../../app/models/product";
import { FormatBGN } from "../../app/Utilities/Utilities";

export default function ProductDetails() {
  const { cart, setCart, removeItem } = useStoreContext();
  const { id } = useParams<{ id: string }>();
  const [product, setProducts] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(0);
  const [submiting, setSubmiting] = useState(false);
  const item = cart?.items.find((i) => i.productId === product?.id);

  useEffect(() => {
    if (item) setQuantity(item.quantity);
    agent.Catalog.details(parseInt(id!)).then((response) =>
      setProducts(response)
    );
  }, [id, item]);

  function inputForQuantity(event: any) {
    if (event.target.value >= 0) setQuantity(parseInt(event.target.value));
  }

  //update quantity of cart when user uses the text field in view page. Could add items or remove form existing items in cart
  function UpdatingCart() {
    setSubmiting(true);
    if (!item || quantity > item.quantity) {
      const updatedQuantity = item ? quantity - item.quantity : quantity;
      agent.Cart.addItem(product?.id!, updatedQuantity).then((cart) =>
        setCart(cart)
      );
    } else {
      const updatedQuantity = item.quantity - quantity;
      agent.Cart.removeItem(product?.id!, updatedQuantity).then(() =>
        removeItem(product?.id!, updatedQuantity)
      );
    }
  }

  if (!product) return <h3> Could not find product </h3>;

  return (
    <Grid container spacing={6}>
      <Grid item xs={6} sx={{ mt: 5 }}>
        <img
          src={product.pictureUrl}
          alt={product.name}
          style={{ width: "100%" }}
        />
      </Grid>
      <Grid item xs={6} sx={{ mt: 5 }}>
        <Typography variant="h3"> {product.name} </Typography>
        <Divider sx={{ mb: 4, border: 1, color: "grey.300" }} />
        <Typography variant="h4" color="primary">
          {FormatBGN(product.price)}
        </Typography>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>{product.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>{product.type}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell> Brand </TableCell>
                <TableCell>{product.brand}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell> Quantity in stock </TableCell>
                <TableCell>{product.quantityInStock}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <TextField
              onChange={inputForQuantity}
              type="number"
              label="Quantity in cart"
              fullWidth
              value={quantity}
              sx={{ marginTop: 2 }}
            />
          </Grid>
          <Grid item xs={10}>
            <Button
              disabled={item?.quantity === quantity}
              onClick={UpdatingCart}
              fullWidth
              size="large"
              variant="contained"
            >
              {item ? " Update Quantity" : "Add to Cart"}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
