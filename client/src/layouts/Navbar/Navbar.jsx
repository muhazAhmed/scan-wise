import React, { useContext, useState } from "react";
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
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import LoginModal from "../../components/Models/login/LoginModel";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { AuthContext } from "../../utils/AuthContext";
import UserProfileModal from "../../components/Models/profile/Profile";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "#00C2A8",
    width: "100%",
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
    fontFamily: "Belanosima, sans-serif",
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
    fontSize: "1.1rem",
    fontWeight: "550",
    fontFamily: "Belanosima, sans-serif",
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
    fontFamily: "Belanosima, sans-serif",
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
  const [profileModel, setProfileModel] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const toggleDrawer = (open) => () => {
    setIsOpen(open);
  };

  const handleOpenModel = () => {
    setopenModel(true);
  };

  const handleCloseModel = () => {
    setopenModel(false);
  };

  const handleProfileModel = () => {
    setProfileModel(true);
  };

  const handleCloseProfile = () => {
    setProfileModel(false);
  };

  const menuItems = [
    { text: "Home", icon: <HomeIcon />, link: "/" },
    { text: "About", icon: <InfoIcon />, link: "/about" },
    { text: "Contact Us", icon: <MailIcon />, link: "/contact-us" },
  ];

  if (!currentUser) {
    menuItems.push({
      text: "Dashboard",
      icon: <DashboardRoundedIcon />,
      link: "/user/dashboard",
    });
  }

  return (
    <div>
      {openModel && (
        <LoginModal openModel={openModel} onClose={() => setopenModel(false)} />
      )}
      {profileModel && (
        <UserProfileModal
          openModel={profileModel}
          onClose={() => setProfileModel(false)}
        />
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
          {currentUser ? (
            <Button
              className={classes.listItemIcon}
              onClick={handleProfileModel}
            >
              <AccountCircleRoundedIcon />
            </Button>
          ) : (
            <Button className={classes.listItemIcon} onClick={handleOpenModel}>
              <AccountCircleRoundedIcon style={{ fontSize: "2rem" }} />
            </Button>
          )}
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
                className={className} 
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
            {currentUser ? (
              <Button className={classes.loginButton} onClick={handleOpenModel}>
                <LogoutRoundedIcon className={classes.loginIcon} />
                Logout
              </Button>
            ) : (
              <Button className={classes.loginButton} onClick={handleOpenModel}>
                <VpnKeyRoundedIcon className={classes.loginIcon} />
                Login
              </Button>
            )}
          </List>
        </div>
      </Drawer>
      <LoginModal open={openModel} onClose={handleCloseModel} />
      <UserProfileModal open={profileModel} onClose={handleCloseProfile} />
    </div>
  );
};

export default Navbar;
