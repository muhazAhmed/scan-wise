import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Modal, Backdrop, Fade, Typography } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: "none",
    padding: theme.spacing(6),
    borderRadius: theme.spacing(3),
    outline: "none",
  },
  button: {
    backgroundColor: "#00C2A8",
    padding: "10px 40px",
    color: "#fff",
    borderRadius: theme.spacing(1),
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#00897B",
    },
  },
}));

const LoginModal = ({ open: initialOpen, onClose }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setOpen(initialOpen || false); // Set the modal to open when the component mounts if initialOpen is true
  }, [initialOpen]);

  const handleLoginAdmin = () => {
    navigate("/login/admin");
    onClose();
  };

  const handleLoginEmployee = () => {
    navigate("/login/emp");
    onClose(); // Call the onClose prop to close the modal
  };

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
          <Typography
            variant="h6"
            style={{ fontWeight: "bold", color: "#2F4858" }}
          >
            Login As:
          </Typography>
          <div
            style={{
              display: "flex",
              gap: "2rem",
              padding: "30px 20px",
              alignItems: "center",
            }}
          >
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={handleLoginAdmin}
            >
              Admin
            </Button>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={handleLoginEmployee}
            >
              Employee
            </Button>
          </div>
        </div>
      </Fade>
    </Modal>
  );
};

export default LoginModal;
