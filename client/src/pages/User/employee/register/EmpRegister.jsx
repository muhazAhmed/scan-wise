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
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";

import AvatarBackground from "../../../../assets/images/loginAdmin.svg";
import { Link } from "react-router-dom";

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
    width: "100%",
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

const EmpRegister = () => {
  const classes = useStyles();
  const [inputs, setInputs] = useState({
    username: "",
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

  const handleLogin = () => {
    // Add your login logic here
    console.log("Logged in as employee");
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
      <Container maxWidth="xs" className={classes.container}>
        <Paper elevation={3} className={classes.paper}>
          <Typography
            variant="h5"
            component="h1"
            style={{ fontWeight: "bold" }}
          >
            Employee Register
          </Typography>
          <TextField
            className={classes.textField}
            label="User Name"
            name="username"
            variant="outlined"
            value={inputs.username}
            onChange={handleChange}
          />
          <TextField
            className={classes.textField}
            label="Password"
            name="password"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            value={inputs.password}
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
          <TextField
            className={classes.textField}
            label="Confirm Password"
            name="confirmPassword"
            variant="outlined"
            value={inputs.confirmPassword}
            onChange={handleChange}
          />
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={handleLogin}
          >
            Register
          </Button>
          <Typography variant="body2" className={classes.registerText}>
            Already have account?{" "}
            <Link to="/login/emp">
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

export default EmpRegister;
