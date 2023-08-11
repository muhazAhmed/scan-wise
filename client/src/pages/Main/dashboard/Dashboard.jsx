import React, { useContext, useEffect, useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Container,
  makeStyles,
  Paper,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Pagination } from "@mui/material";
import "./dashboard.css";
import { AuthContext } from "../../../utils/AuthContext";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import DeleteSweepRoundedIcon from "@mui/icons-material/DeleteSweepRounded";
import { Link } from "react-router-dom";
import { API_URL } from "../../../assets/API/API_URL";
import { ServerVariables } from "../../../utils/ServerVariables";
import axios from "axios";
import { toast } from "react-hot-toast";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  textField: {
    margin: theme.spacing(1),
    width: "90%",
    fontFamily: "Belanosima, sans-serif",
  },
  button: {
    margin: theme.spacing(2, 0),
    backgroundColor: "#00C2A8",
    borderRadius: "12px",
    color: "#fff",
    width: "100%",
    height: "3.5rem",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#00897B",
    },
  },
  loginIcon: {
    color: "#fff",
  },
}));

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Product Name", width: 180 },
  { field: "code", headerName: "Code", width: 100 },
  { field: "price", headerName: "Price", width: 100 },
  { field: "minQuantity", headerName: "Min. Quantity", width: 130 },
  { field: "weight", headerName: "Weight", width: 100 },
  { field: "catogory", headerName: "Category", width: 150 },
];

const AddProduct = () => {
  const classes = useStyles();
  const [inputs, setInputs] = useState({
    name: "",
    price: "",
    minQuantity: "",
    weight: "",
    catogory: "",
  });
  const { currentUser } = useContext(AuthContext);
  const [admin, setAdmin] = useState(false);
  const [allow, setAllow] = useState(false);
  const [page, setPage] = useState(0); // Current page number (0-based index)
  const [totalPages, setTotalPages] = useState(1); // Initialize totalPages
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    if (currentUser) {
      let isAdmin = currentUser.User.isAdmin;
      if (isAdmin === true) {
        setAdmin(true);
      }
    }
    fetchProduct();
  }, [currentUser]);

  const fetchProduct = () => {
    axios
      .get(API_URL + ServerVariables.getProduct)
      .then((response) => {
        const productDataWithId = response.data.map((product, index) => ({
          ...product,
          id: index + 1,
        }));

        setProductData(productDataWithId);
        setTotalPages(Math.ceil(productDataWithId.length / 10));
      })
      .catch((error) => {
        toast.error("Error fetching product data:", error);
      });
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage - 1);
  };

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL + ServerVariables.addProduct, inputs);
      toast.success("Product added successfully");
      fetchProduct();
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  useEffect(() => {
    if (
      inputs.catogory === "fruit" ||
      inputs.catogory === "vegetable" ||
      inputs.catogory === "drinkable"
    ) {
      setAllow(true);
    }
  }, [inputs]);

  return (
    <div className="dashboard">
      <div className="prod-admin">
        <Container maxWidth="xs" className={classes.container}>
          <Paper elevation={3} className={classes.paper}>
            <Typography
              variant="h5"
              component="h1"
              style={{
                fontWeight: "bold",
                fontFamily: "Belanosima, sans-serif",
              }}
            >
              Add Product
            </Typography>
            <TextField
              className={classes.textField}
              label="Product Name"
              variant="outlined"
              name="name"
              onChange={handleChange}
            />
            <TextField
              className={classes.textField}
              label="Price"
              variant="outlined"
              type="number"
              name="price"
              onChange={handleChange}
            />
            <FormControl
              fullWidth
              variant="outlined"
              className={classes.textField}
            >
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                name="catogory"
                value={inputs.catogory}
                onChange={handleChange}
                label="Category"
              >
                <MenuItem value="fruit">Fruit</MenuItem>
                <MenuItem value="vegetable">Vegetable</MenuItem>
                <MenuItem value="drinkable">Drinkable</MenuItem>
                <MenuItem value="electronics">Electronics</MenuItem>
                <MenuItem value="accessories">Accessories</MenuItem>
                <MenuItem value="clothing">Clothing</MenuItem>
                <MenuItem value="beauty">Beauty</MenuItem>
                <MenuItem value="stationery">Stationery</MenuItem>
                <MenuItem value="furniture">Furniture</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
            <TextField
              className={classes.textField}
              label="Min. Quantity"
              variant="outlined"
              type="number"
              name="minQuantity"
              disabled={allow === false}
              onChange={handleChange}
            />

            <FormControl
              fullWidth
              variant="outlined"
              className={classes.textField}
            >
              <InputLabel id="weight-label">Weight</InputLabel>
              <Select
                labelId="weight-label"
                name="weight"
                value={inputs.weight}
                disabled={allow === false}
                onChange={handleChange}
                label="Weight"
              >
                <MenuItem value="ml">Milliliter (ml)</MenuItem>
                <MenuItem value="l">Liter (l)</MenuItem>
                <MenuItem value="g">Gram (g)</MenuItem>
                <MenuItem value="kg">Kilogram (kg)</MenuItem>
              </Select>
            </FormControl>

            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              disabled={admin === false}
              onClick={handleAddProduct}
            >
              ADD
            </Button>
          </Paper>
        </Container>
      </div>
      <div
        className="prod-grid"
        style={{
          height: 540,
          width: "55%",
          border: "3px solid var(--main)",
          borderRadius: "6px",
        }}
      >
        <>
          <DataGrid
            rows={productData}
            columns={columns}
            pageSize={10}
            pagination
            page={page}
            onPageChange={handlePageChange}
            rowCount={productData.length}
            pageSizeOptions={[10, 25, 50, 100]}
            slots={{ toolbar: GridToolbar }}
            checkboxSelection
          />
          <Pagination
            count={totalPages}
            page={page + 1}
            onChange={handlePageChange}
            showFirstButton
            showLastButton
            siblingCount={5}
          />
        </>
      </div>
      <div className="sidebar">
        <Paper className={classes.paper}>
          {admin && (
            <Link to="/admin/dashboard">
              <Button variant="contained">Admin Dashboard</Button>
            </Link>
          )}
          <Button
            variant="contained"
            className={classes.button}
            title="Out Of Stock"
            style={{ backgroundColor: "#845EC2" }}
          >
            Mark as OOS
          </Button>
          <Button
            variant="contained"
            className={classes.button}
            title="Edit Product"
            disabled={admin === false}
            style={{ backgroundColor: "#845EC2" }}
          >
            <EditNoteRoundedIcon className={classes.loginIcon} />
          </Button>
          <Button
            variant="contained"
            className={classes.button}
            title="Delete Product"
            disabled={admin === false}
            style={{
              backgroundColor: "var(--red)",
              color: "#fff",
              padding: "12px",
            }}
          >
            <DeleteSweepRoundedIcon className={classes.loginIcon} />
          </Button>
          <Link to="/user/cart">
            <Button
              variant="contained"
              className={classes.button}
              style={{ height: "20vh", width: "10vw" }}
            >
              Create Bill
            </Button>
          </Link>
        </Paper>
      </div>
    </div>
  );
};

export default AddProduct;
