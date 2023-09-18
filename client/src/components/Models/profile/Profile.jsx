import React, { useContext, useEffect, useState } from "react";
import {
  Modal,
  Backdrop,
  Fade,
  Typography,
  makeStyles,
  IconButton,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { AuthContext } from "../../../utils/AuthContext";

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
  },
  closeIcon: {
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
  },
}));

const UserProfileModal = ({ open, onClose }) => {
  const classes = useStyles();
  const { currentUser } = useContext(AuthContext);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    if (currentUser) {
      let isAdmin = currentUser.User.isAdmin;
      if (isAdmin === true) {
        setAdmin(true);
      }
    }
  }, [currentUser]);

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
          <Typography variant="h5" gutterBottom>
            {admin ? "Admin Profile" : "User Profile"}
          </Typography>
          {admin && (
            <Typography variant="subtitle1" gutterBottom>
              Name: {currentUser && currentUser.User.firstname}{" "}
              {currentUser && currentUser.User.lastname}
            </Typography>
          )}
          {admin && (
            <Typography variant="subtitle1" gutterBottom>
              Email: {currentUser && currentUser.User.email}
            </Typography>
          )}
          {admin && (
            <Typography variant="subtitle1" gutterBottom>
              Phone: {currentUser && currentUser.User.phone}
            </Typography>
          )}
          {!admin && (
            <Typography variant="subtitle1" gutterBottom>
              Username: {currentUser && currentUser.User.username}
            </Typography>
          )}
          {/* Add other user profile details as needed */}
        </div>
      </Fade>
    </Modal>
  );
};

export default UserProfileModal;
