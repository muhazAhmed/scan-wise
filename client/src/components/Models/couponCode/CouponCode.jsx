import React, { useState } from "react";
import {
  Modal,
  Backdrop,
  Fade,
  Typography,
  makeStyles,
  IconButton,
  Button,
  TextField,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    borderRadius: theme.spacing(2),
    outline: "none",
    maxWidth: 400,
    width: "80%",
    display : "flex",
    flexDirection: "column",
    alignItems : "center",
    justifyContent: "center",
    gap : "1.5rem",
  },
  closeIcon: {
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
  },
  btns: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "1rem",
    width: "100%",
  },
  button: {
    margin: theme.spacing(2, 0),
    borderRadius: "12px",
    width: "40%",
    height: "2.5rem",
    color: "#fff",
    fontWeight: "bold",
    border: "1px solid var(--main)",
    backgroundColor: "#00897B",
    "&:hover": {
      backgroundColor: "var(--main)",
    },
  },
}));

const CouponCode = ({ open, onClose, data }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [allow, setAllow] = useState(false);
  const [inputs, setInputs] = useState({
    couponCode : ""
  })

  const handleChange = (prop) => (event) => {
    setInputs({ ...inputs, [prop]: event.target.value });

    if (prop === "couponCode" && event.target.value.length >= 5) {
      setAllow(true);
    }
  };

  const handleApply = () => {
    navigate("/user/payment")
  }

  return (
    <Modal
      className={classes.modal}
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={classes.paper}>
          <IconButton
            className={classes.closeIcon}
            edge="end"
            color="inherit"
            onClick={onClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography
            variant="h5"
            gutterBottom
            style={{ fontFamily: "Belanosima, sans-serif" }}
          >
            Has any coupon code?
          </Typography>
          <TextField
            className={classes.textField}
            label="Coupon Code"
            variant="outlined"
            value={inputs.couponCode}
            onChange={handleChange("couponCode")}
          />
          <div className={classes.btns}>
            <Button className={classes.button} onClick={handleApply} disabled={allow === false}>Apply</Button>
            <Button
              className={classes.button}
              onClick={handleApply}
              style={{
                color: "var(--red)",
                border: "1px solid var(--red)",
                backgroundColor: "#fff",
              }}
            >
              No
            </Button>
          </div>
        </div>
      </Fade>
    </Modal>
  );
};

export default CouponCode;
