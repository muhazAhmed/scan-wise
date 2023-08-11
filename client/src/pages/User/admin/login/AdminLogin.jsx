import React, { useContext, useState } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../utils/AuthContext";
import { toast } from "react-hot-toast";
import { ServerVariables } from "../../../../utils/ServerVariables";

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

const AdminLogin = () => {
  const classes = useStyles();
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const {login} = useContext(AuthContext)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleLogin = async(e) => {
    e.preventDefault();

    try {
      let loginAdm = ServerVariables.loginAdmin;
      await login(inputs, loginAdm);
      toast.success("login successful");
      navigate("/user/dashboard");
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
      <Container maxWidth="xs" className={classes.container}>
        <Paper elevation={3} className={classes.paper}>
          <Typography
            variant="h5"
            component="h1"
            style={{ fontWeight: "bold" }}
          >
            Admin Login
          </Typography>
          <TextField
            className={classes.textField}
            label="Email"
            name="email"
            variant="outlined"
            autoComplete="off"
            onChange={handleChange}
          />
          <TextField
            className={classes.textField}
            label="Password"
            variant="outlined"
            name="password"
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
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={handleLogin}
          >
            Login
          </Button>
          <Typography variant="body2" className={classes.registerText}>
            Don't have an account?{" "}
            <Link to="/register/admin">
              <Button variant="text" color="primary">
                Register
              </Button>
            </Link>
          </Typography>
        </Paper>
      </Container>
    </div>
  );
};

export default AdminLogin;
