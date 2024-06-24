import React, { useContext, useEffect, useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Container,
  makeStyles,
  Paper,
} from "@material-ui/core";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Autocomplete, Pagination } from "@mui/material";
import DeleteSweepRoundedIcon from "@mui/icons-material/DeleteSweepRounded";
import "./cart.css";
import { AuthContext } from "../../../utils/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import CouponCode from "../../../components/Models/couponCode/CouponCode";
import { API_URL } from "../../../assets/API/API_URL";
import { ServerVariables } from "../../../utils/ServerVariables";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { getSelector, removeItem } from "../../../redux/slices/CartSlice";
import { useDispatch } from "react-redux";
import { addItem } from "../../../redux/slices/CartSlice";
import axios from "axios";
import Loading from "../../../components/Models/Loading/Loading";

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
  printBtn: {
    margin: theme.spacing(2, 0),
    backgroundColor: "black",
    borderRadius: "12px",
    color: "#fff",
    width: "100%",
    height: "3rem",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#2F4858",
    },
  },
}));

const DeleteButton = ({ handleDelete, rowId }) => {
  const dispatch = useDispatch();
  return (
    <Button
      onClick={() => dispatch(removeItem(rowId))}
      color="secondary"
      size="small"
      startIcon={<DeleteSweepRoundedIcon />}
    >
      Delete
    </Button>
  );
};

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "productName", headerName: "Product Name", width: 200 },
  { field: "code", headerName: "Code", width: 100 },
  { field: "price", headerName: "Price", width: 100 },
  { field: "minQuantity", headerName: "Min. Quantity", width: 120 },
  { field: "totalQuantity", headerName: "Total Quantity", width: 120 },
  { field: "totalPrice", headerName: "Total Price", width: 100 },
  {
    field: "delete",
    headerName: "Delete",
    width: 100,
    renderCell: (params) => (
      <DeleteButton handleDelete={params.handleDelete} rowId={params.row.id} />
    ),
  },
];

const Cart = () => {
  const dispatch = useDispatch();
  const items = useSelector(getSelector);
  const classes = useStyles();
  const { currentUser } = useContext(AuthContext);
  const [inputs, setInputs] = useState({
    customerNumber: "",
    productName: "",
    totalQuantity: "",
  });
  const [page, setPage] = useState(0);
  const [allow, setAllow] = useState(false);
  const [proceed, setProceed] = useState(false);
  const [openModel, setOpenModel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [productOptions, setProductOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]); // New state for cart items
  const totalPages = Math.ceil(cartItems.length / 10);
  const [grandTotal, setGrandTotal] = useState(0);
  const navigate = useNavigate();

  const handlePageChange = (event, newPage) => {
    // Handle page change here
    setPage(newPage - 1); // Convert back to 0-based index for DataGrid
  };

  const handleChange = (prop) => (event) => {
    setInputs({ ...inputs, [prop]: event.target.value });

    if (prop === "customerNumber" && event.target.value.length >= 10) {
      setAllow(true);
    }
  };

  useEffect(() => {
    handleSearchChange();
    const newGrandTotal = items.reduce(
      (total, item) => total + item.totalPrice,
      0
    );
    setGrandTotal(newGrandTotal);
  }, [items]);

  const handleSearchChange = async (event, value) => {
    if (value) {
      try {
        const response = await axios.get(
          `${API_URL}${ServerVariables.getProductByName}=${value}`
        );
        setProductOptions(response.data);
        const selected = productOptions.find((option) => option.name === value);
        setSelectedProduct(selected);
        setInputs({ ...inputs, productName: value });
      } catch (error) {
        console.log(error.response.data);
        toast.error("error while searching product");
      }
    }
  };

  const clearField = () => {
    setInputs({ ...inputs, productName: "", totalQuantity: "" });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      // Update this part to include the selected product details
      const orderData = {
        customerNumber: inputs.customerNumber,
        productName: inputs.productName,
        totalQuantity: inputs.totalQuantity,
      };
      await axios.post(API_URL + ServerVariables.createOrder, orderData);
      dispatch(
        addItem({
          id: selectedProduct._id,
          customerNumber: inputs.customerNumber,
          productName: inputs.productName,
          code: selectedProduct.code,
          price: selectedProduct.price,
          totalQuantity: inputs.totalQuantity,
          totalPrice: selectedProduct.price * inputs.totalQuantity,
          minQuantity: selectedProduct.minQuantity,
        })
      );
      setProceed(true);
      clearField();
      toast.success("Product added to the list");
    } catch (err) {
      console.log(err.response.data);
      toast.error(err.response.data);
    }
  };

  // const handleDelete = async (id) => {
  //   try {
  //     await axios.delete(`${API_URL}${ServerVariables.deleteCart}/${id}`);
  //     setCartItems(cartItems.filter((item) => item._id !== id));
  //     console.log("Deleted item with ID:", id);
  //   } catch (error) {
  //     console.log(error.response.data);
  //     toast.error("Error deleting item");
  //   }
  // };

  // const filteredData = items.reduce;

  const handleOpenModel = () => {
    setOpenModel(true);
  };

  const handleCloseModel = () => {
    setOpenModel(false);
  };

  return (
    <div className="cart">
      {loading && <Loading />}
      <CouponCode open={openModel} onClose={handleCloseModel} data={items} />
      <div
        className="prod-grid"
        style={{
          height: 550,
          width: "65%",
          border: "3px solid var(--main)",
          borderRadius: "6px",
        }}
      >
        <>
          <DataGrid
            rows={items}
            columns={columns}
            pageSize={10}
            pagination
            page={page}
            onPageChange={handlePageChange}
            rowCount={cartItems.length}
            pageSizeOptions={[10, 25, 50, 100]}
            slots={{ toolbar: GridToolbar }}
            checkboxSelection
            onRowSelected={(row) => {
              setSelectedProduct(row);
            }}
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
        <div>
          <Container>
            <Paper elevation={10} className={classes.paper}>
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
                label="Customer Number"
                variant="outlined"
                type="number"
                value={inputs.customerNumber}
                onChange={handleChange("customerNumber")}
              />
              <Autocomplete
                className={classes.textField}
                value={selectedProduct}
                disabled={allow === false}
                options={productOptions}
                getOptionLabel={(option) => option.name}
                onInputChange={(event, newInputValue) => {
                  setInputValue(newInputValue);
                  handleSearchChange(event, newInputValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Product Name"
                    variant="outlined"
                  />
                )}
              />
              <TextField
                className={classes.textField}
                label="Total Quantity"
                variant="outlined"
                type="number"
                disabled={allow === false}
                value={inputs.totalQuantity}
                onChange={handleChange("totalQuantity")}
              />

              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                disabled={allow === false}
                onClick={handleAddProduct}
              >
                ADD
              </Button>
            </Paper>
          </Container>
        </div>
        <div>
          <Container>
            <Paper elevation={10} className={classes.paper}>
              <Typography
                variant="h5"
                component="h1"
                style={{
                  fontWeight: "bold",
                  fontFamily: "Belanosima, sans-serif",
                  textAlign: "center",
                }}
              >
                Total Amount :{" "}
                <span style={{ color: "var(--red)" }}>₹{grandTotal}</span>
              </Typography>
              <Button
                className={classes.printBtn}
                variant="contained"
                color="primary"
                disabled={proceed === false}
                onClick={handleOpenModel}
              >
                Proceed
              </Button>
            </Paper>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default Cart;
