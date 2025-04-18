import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { MainListItems } from "./list";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Outlet, useNavigate } from "react-router-dom";
import { Button, Popover, Stack } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { toast } from "react-toastify";
import SyncLockRoundedIcon from "@mui/icons-material/SyncLockRounded";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const defaultTheme = createTheme();

export default function FullLayout() {
  const [open, setOpen] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const navigate = useNavigate();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const popoverOpen = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const logout = () => {
    localStorage.clear();
    toast.success("Logout successfully", {
      position: "top-center",
      autoClose: 3000, // Closes after 3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    navigate("/login");
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open} className="!bg-[#DD781E]">
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              {/* Dashboard */}
            </Typography>
            {/* <IconButton color="inherit">
                            <Badge badgeContent={4} color="secondary">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton> */}
            <IconButton color="inherit" onClick={handleClick}>
              <AccountCircleIcon />
            </IconButton>
            <Popover
              id={id}
              open={popoverOpen}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              <Stack direction={"column"} className="flex ">
                <Button
                  className="!px-6 whitespace-nowrap"
                  sx={{
                    display: "flex",
                    textAlign: "start",
                    paddingLeft: "20px",
                    paddingRight: "20px",
                    justifyContent: "start",
                  }}
                  onClick={() => navigate("/reset-password")}
                  startIcon={<SyncLockRoundedIcon />}
                >
                  Reset Password
                </Button>
                <Button
                  className="!px-6"
                  sx={{
                    display: "flex",
                    textAlign: "start",
                    paddingLeft: "20px",
                    paddingRight: "20px",
                    justifyContent: "start",
                  }}
                  onClick={logout}
                  startIcon={<LogoutIcon />}
                >
                  Logout
                </Button>
              </Stack>
            </Popover>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          open={open}
          className={`absolute ${
            open ? "block" : "hidden"
          } lg:relative lg:block h-[100vh]`}
        >
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <img
              src="/logo.png"
              style={{
                height: "40px",
                width: "100%",
                margin: "0 auto",
                objectFit: "contain",
              }}
            />
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <MainListItems />
            <Divider sx={{ my: 1 }} />
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Box className=" py-4 px-4 lg:ml-0 lg:py-10 lg:px-10">
            <Outlet />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
