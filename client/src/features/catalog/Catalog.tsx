import { Label } from "@mui/icons-material";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useState, useEffect } from "react";
import agent from "../../app/api/agent";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";

const sortingOptions = [
  { value: "name", label: "Alphabetical" },
  { value: "priceDescending", label: "Price - High to low" },
  { value: "price", label: "Price - Low to high" },
];

export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    agent.Catalog.list().then((products) => setProducts(products));
  }, []);

  return (
    <Grid container spacing={4}>
      <Grid item xs={3}>
        <Paper sx={{ mb: 2, mt: 2 }}>
          <TextField label="Search Products" variant="outlined" fullWidth />
        </Paper>
        <Paper sx={{ mb: 2, p: 3 }}>
          <FormControl>
            <RadioGroup>
              {sortingOptions.map(({ value, label }) => (
                <FormControlLabel
                  value={value}
                  control={<Radio />}
                  label={label}
                  key={value}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Paper>

        <Paper sx={{ mb: 2, mt: 2, pl: 3, p: 2 }}>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox />}
              label={"Jones"}
              key={"Jones"}
            ></FormControlLabel>
            <FormControlLabel
              control={<Checkbox />}
              label={"Drake"}
              key={"Drake"}
            ></FormControlLabel>
            <FormControlLabel
              control={<Checkbox />}
              label={"Element"}
              key={"Element"}
            ></FormControlLabel>
            <FormControlLabel
              control={<Checkbox />}
              label={"Girl"}
              key={"Girl"}
            ></FormControlLabel>
            <FormControlLabel
              control={<Checkbox />}
              label={"Roxy"}
              key={"Roxy"}
            ></FormControlLabel>
            <FormControlLabel
              control={<Checkbox />}
              label={"Plan B"}
              key={"Plan B"}
            ></FormControlLabel>
          </FormGroup>
        </Paper>

        <Paper sx={{ mb: 2, mt: 2, pl: 3, p: 2 }}>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox />}
              label={"Skateboard"}
              key={"Skateboard"}
            ></FormControlLabel>
            <FormControlLabel
              control={<Checkbox />}
              label={"Snowboard"}
              key={"Snowboard"}
            ></FormControlLabel>
          </FormGroup>
        </Paper>
      </Grid>
      <Grid item xs={9}>
        <ProductList products={products} />
      </Grid>
    </Grid>
  );
}
