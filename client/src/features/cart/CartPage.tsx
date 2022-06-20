import { Remove, Add, Delete } from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import agent from "../../app/api/agent";
import { useStoreContext } from "../../app/context/StoreContext";
import { FormatBGN } from "../../app/Utilities/Utilities";

export default function CartPage() {
  const { cart, setCart, removeItem } = useStoreContext();

  function handleAddItem(productId: number, name: string) {
    agent.Cart.addItem(productId).then((cart) => setCart(cart));
  }

  function handleRemoveItem(productId: number, quantity = 1, name: string) {
    agent.Cart.removeItem(productId, quantity).then(() =>
      removeItem(productId, quantity)
    );
  }

  const subtotal =
    cart?.items.reduce((sum, item) => sum + item.quantity * item.price, 0) ?? 0;
  const deliveryFee = subtotal > 3000 ? 0 : 500;

  if (!cart) return <Typography variant="h3">Your cart is empty</Typography>;

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right">Subtotal</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart.items.map((item) => (
              <TableRow
                key={item.productId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Box display="flex" alignItems="center">
                    <img
                      src={item.pictureUrl}
                      alt={item.name}
                      style={{ height: 50, marginRight: 20 }}
                    />
                    <span>{item.name}</span>
                  </Box>
                </TableCell>
                <TableCell align="right">{FormatBGN(item.price)}</TableCell>
                <TableCell align="center">
                  <Button
                    onClick={() =>
                      handleRemoveItem(
                        item.productId,
                        1,
                        "rem" + item.productId
                      )
                    }
                    color="error"
                  >
                    <Remove />
                  </Button>
                  {item.quantity}
                  <Button
                    onClick={() =>
                      handleAddItem(item.productId, "add" + item.productId)
                    }
                    color="secondary"
                  >
                    <Add />
                  </Button>
                </TableCell>
                <TableCell align="right">
                  {FormatBGN(item.price * item.quantity)}
                </TableCell>
                <TableCell align="right">
                  <Button
                    onClick={() =>
                      handleRemoveItem(
                        item.productId,
                        item.quantity,
                        "del" + item.productId
                      )
                    }
                    color="error"
                  >
                    <Delete />
                  </Button>
                </TableCell>
              </TableRow>
            ))}

            {/* Order subtotal details  */}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container>
        <Grid item xs={3} />
        <Grid item xs={12}>
          <TableContainer component={Paper} variant={"outlined"}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={2}>Subtotal</TableCell>
                  <TableCell align="right">{FormatBGN(subtotal)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2}>Delivery fee*</TableCell>
                  <TableCell align="right">{FormatBGN(deliveryFee)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2}>Total</TableCell>
                  <TableCell align="right">
                    {FormatBGN(subtotal + deliveryFee)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <span style={{ fontStyle: "italic" }}>
                      *Orders over $300 qualify for free delivery
                    </span>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Button
            component={NavLink}
            to="/checkout"
            variant="contained"
            fullWidth
          >
            Checkout
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
