import React, { useContext, useState } from "react";
import SVG from "../../../assets/images/home.svg";
import "./home.css";
import { Button, Typography, makeStyles } from "@material-ui/core";
import { AuthContext } from "../../../utils/AuthContext";
import { Link } from "react-router-dom";
import LoginModal from "../../../components/Models/login/LoginModel";
const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(2, 0),
    backgroundColor: "#00C2A8",
    width: "40%",
    height: "3rem",
    fontWeight: "bold",
    borderRadius: "12px",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#00897B",
    },
  },
  registerText: {
    marginTop: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textAlign: "center",
    fontWeight: "bold",
    marginLeft: theme.spacing(2),
    fontFamily: "Belanosima, sans-serif",
  },
}));

const Home = () => {
  const classes = useStyles();
  const { currentUser } = useContext(AuthContext);
  const [openModel, setopenModel] = useState(false);

  const handleOpenModel = () => {
    setopenModel(true);
  };

  const handleCloseModel = () => {
    setopenModel(false);
  };
  return (
    <div className="home">
      <LoginModal open={openModel} onClose={handleCloseModel} />
      <div className="img">
        <img style={{ height: "70vh", width: "50vw" }} src={SVG} alt="svg" />
      </div>
      <div
        style={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <Typography variant="h3" className={classes.title}>
          Welcome to <span style={{ color: "#00C2A8" }}>SCAN-WISE</span>
        </Typography>
        <Typography
          variant="subtitle1"
          style={{ fontWeight: "550", fontFamily: "Belanosima, sans-serif" }}
        >
          One place to manage all your bills and accountings.
        </Typography>
        <br />
        {currentUser ? (
          <Link to="/user/dashboard">
            <Button
              variant="text"
              className={classes.button}
              style={{ width: "100%" }}
            >
              Dashboard
            </Button>
          </Link>
        ) : (
          <Button
            variant="text"
            className={classes.button}
            onClick={handleOpenModel}
          >
            Login
          </Button>
        )}
      </div>
    </div>
  );
};

export default Home;
