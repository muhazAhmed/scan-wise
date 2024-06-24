import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Container,
  makeStyles,
  Paper,
  IconButton,
  InputAdornment,
  Grid,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";

import AvatarBackground from "../../../../assets/images/loginAdmin.svg";
import { Link } from "react-router-dom";
import { API_URL } from "../../../../assets/API/API_URL";
import { ServerVariables } from "../../../../utils/ServerVariables";
import { toast } from "react-hot-toast";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "90vh",
  },
  paper: {
    padding: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: theme.spacing(2),
    boxShadow: theme.shadows[10],
  },
  textField: {
    margin: theme.spacing(1),
    width: "100%",
  },
  button: {
    margin: theme.spacing(2, 0),
    backgroundColor: "#00C2A8",
    width: "50%",
    height: "3.5rem",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#00897B",
    },
  },
  registerText: {
    marginTop: theme.spacing(2),
  },
}));

const AdminRegister = () => {
  const classes = useStyles();
  const [inputs, setInputs] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL + ServerVariables.registerEmp, inputs);
      toast.success("Register Successful, please login");
      navigate("/login/emp");
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  return (
    <div className="admin" style={{ display: "flex", alignItems: "center" }}>
      <div>
        <img
          style={{ height: "60vh", width: "40vw" }}
          src={AvatarBackground}
          alt="svg"
        />
      </div>
      <Container maxWidth="sm" className={classes.container}>
        <Paper elevation={3} className={classes.paper}>
          <Typography
            variant="h5"
            component="h1"
            style={{ fontWeight: "bold" }}
          >
            Admin Register
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                className={classes.textField}
                label="First Name"
                name="firstname"
                variant="outlined"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                className={classes.textField}
                label="Last Name"
                name="lastname"
                variant="outlined"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                className={classes.textField}
                label="Email"
                name="email"
                variant="outlined"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                className={classes.textField}
                label="Phone"
                name="phone"
                type="number"
                variant="outlined"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                className={classes.textField}
                label="Password"
                name="password"
                variant="outlined"
                type={showPassword ? "text" : "password"}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleTogglePassword}>
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                className={classes.textField}
                label="Confirm Password"
                name="confirmPassword"
                variant="outlined"
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={handleRegister}
          >
            Register
          </Button>
          <Typography variant="body2" className={classes.registerText}>
            Already have an account?{" "}
            <Link to="/login/admin">
              <Button variant="text" color="primary">
                Login
              </Button>
            </Link>
          </Typography>
        </Paper>
      </Container>
    </div>
  );
};

export default AdminRegister;
