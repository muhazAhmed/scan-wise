import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Button,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import InfoIcon from "@material-ui/icons/Info";
import MailIcon from "@material-ui/icons/Mail";
import VpnKeyRoundedIcon from "@mui/icons-material/VpnKeyRounded";
import LoginModal from "../../components/Models/login/LoginModel";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "#00C2A8",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: "black,",
  },
  title: {
    flexGrow: 1,
    textAlign: "center",
    fontWeight: "bold",
    marginLeft: theme.spacing(2),
  },
  drawer: {
    width: 200,
    height: "100%",
    backgroundColor: "#00C2A8",
    color: "#fff",
    padding: "10px",
  },
  listItemIcon: {
    minWidth: theme.spacing(5),
    color: "#fff",
  },
  listItemText: {
    fontSize: "1rem",
    fontWeight: "bold",
  },
  loginButton: {
    width: "100%",
    height: "6vh",
    borderRadius: "12px",
    marginTop: "0.5rem",
    backgroundColor: "#2F4858",
    color: "#fff",
    fontWeight: "bold",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "&:hover": {
      backgroundColor: "#333",
    },
  },
  loginIcon: {
    marginRight: theme.spacing(2),
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [openModel, setopenModel] = useState(false);

  const toggleDrawer = (open) => () => {
    setIsOpen(open);
  };

  const handleOpenModel = () => {
    setopenModel(true);
  };

  const handleCloseModel = () => {
    setopenModel(false);
  };

  const menuItems = [
    { text: "Home", icon: <HomeIcon />, link: "/" },
    { text: "About", icon: <InfoIcon />, link: "/about" },
    { text: "Contact Us", icon: <MailIcon />, link: "/contact-us" },
  ];

  return (
    <div>
      {openModel && (
        <LoginModal openModel={openModel} onClose={() => setopenModel(false)} />
      )}
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            className={classes.menuButton}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            SCAN-WISE (FY 2023-24)
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={isOpen} onClose={toggleDrawer(false)}>
        <div
          className={classes.drawer}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {menuItems.map(({ text, icon, link, className }, index) => (
              <ListItem
                button
                key={text}
                component={RouterLink}
                to={link}
                disableRipple
                style={{ borderRadius: "12px" }}
                className={className} // Pass the className prop here
              >
                <ListItemIcon className={classes.listItemIcon}>
                  {icon}
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  classes={{ primary: classes.listItemText }}
                />
              </ListItem>
            ))}
            <Button className={classes.loginButton} onClick={handleOpenModel}>
              <VpnKeyRoundedIcon className={classes.loginIcon} />
              Login
            </Button>
          </List>
        </div>
      </Drawer>
      <LoginModal open={openModel} onClose={handleCloseModel} />
    </div>
  );
};

export default Navbar;
