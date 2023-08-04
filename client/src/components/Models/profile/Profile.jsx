import React, { useState } from "react";
import {
  Modal,
  Backdrop,
  Fade,
  Typography,
  makeStyles,
  IconButton,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

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

const UserProfileModal = ({ open, onClose, userProfileData }) => {
  const classes = useStyles();

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
            User Profile
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Name: 
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Email: 
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Age: 
          </Typography>
          {/* Add other user profile details as needed */}
        </div>
      </Fade>
    </Modal>
  );
};

export default UserProfileModal;
