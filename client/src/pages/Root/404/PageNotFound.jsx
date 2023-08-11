import React from "react";
import svg from "../../../assets/images/404.svg";
import { Button, Container, makeStyles, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    maxWidth: "50vw",
    height: "70vh",
    [theme.breakpoints.down("sm")]: {
      marginBottom : "2rem",
      maxWidth: "80vw",
      height: "auto",
    },
  },
  button: {
    marginTop: theme.spacing(2),
    backgroundColor: "#00C2A8",
    borderRadius: "12px",
    color: "#fff",
    width: "150px",
    height: "3rem",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#00897B",
    },
  },
}));

const PageNotFound = () => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <img src={svg} alt="svg" className={classes.image} />
      <Button
        component={Link}
        title="Home"
        to="/"
        variant="contained"
        className={classes.button}
      >
        Go Back
      </Button>
    </Container>
  );
};

export default PageNotFound;
