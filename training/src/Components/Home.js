import * as React from "react";
import { styled, useTheme, alpha } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AddIcon from "@mui/icons-material/Add";
import Logout from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import RefreshIcon from "@mui/icons-material/Refresh";
import GridViewIcon from "@mui/icons-material/GridView";
import SettingsIcon from "@mui/icons-material/Settings";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import {
  TextField,
  Typography,
  Box,
  Button,
  IconButton,
  Modal,
  Container,
  Menu,
  MenuItem,
  Tooltip,
  Avatar,
  ListItemIcon,
  Divider,
  List,
  Toolbar,
  Drawer,
  CssBaseline,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Category from "./Category";
import Categories from "./Categories";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));
const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const style1 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const Home = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const opene = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [anchorEle, setAnchorEle] = React.useState(null);
  const open2 = Boolean(anchorEle);
  const handleClick1 = (event) => {
    setAnchorEle(event.currentTarget);
  };
  const handleClose1 = () => {
    setAnchorEle(null);
  };
  const [opened, setOpened] = React.useState(false);
  const handleOpened = () => setOpened(true);
  const history = useNavigate();
  function outHandle() {
    console.log("object");
    sessionStorage.clear();
    history("/");
  }

  function messageHandle() {
    history("/message");
  }
  const [openn, setOpenn] = React.useState(false);
  const handleOpenn = () => setOpenn(true);
  const handleCut = () => setOpenn(false);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [isDarkMode, setIsDarkMode] = React.useState(false);

  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
    document.body.style.backgroundColor = isDarkMode ? "#ffffff" : "#333333";
  };
  const [storedDayName, setStoredDayName] = React.useState(null);

  React.useEffect(() => {
    try {
      const pTagElement = document.querySelector("p");

      if (pTagElement) {
        const pTagContent = pTagElement.textContent;
        const dayName = pTagContent.split("_").join(" ");
        sessionStorage.getItem("email", dayName);
        setStoredDayName(dayName);
      } else {
        console.error("No <p> element found in the DOM");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }, []);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" sx={{ height: 60 }}>
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
              >
                <MenuIcon sx={{ marginLeft: "10px", fontSize: "32px" }} />
              </IconButton>
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                  mr: 3,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".2rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                <div
                  className="flex"
                  style={{ fontSize: "14px", marginTop: "15px" }}
                >
                  {storedDayName ? (
                    <p className="text-dark"> {storedDayName}</p>
                  ) : (
                    <p className="text-dark">ENDORPHIN</p>
                  )}
                </div>
              </Typography>
              <Box sx={{}}>
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    sx={{ width: "400px", marginLeft: "200px" }}
                    placeholder="Search…"
                    inputProps={{ "aria-label": "search" }}
                  />
                </Search>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  marginLeft: "40px",
                  justifyContent: "end",
                }}
              >
                <Tooltip title="Refresh">
                  <Button>
                    <RefreshIcon className="text-white" />
                  </Button>
                </Tooltip>
                <Tooltip title="Grid view">
                  <Button>
                    <GridViewIcon className="text-white" />
                  </Button>
                </Tooltip>
                <Tooltip title="Settings">
                  <Button>
                    <IconButton
                      onClick={handleClick1}
                      size="small"
                      sx={{ ml: 2 }}
                      aria-controls={open2 ? "account-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open2 ? "true" : undefined}
                    >
                      <SettingsIcon className="text-white" />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEle}
                      id="account-menu"
                      open={open2}
                      onClose={handleClose1}
                      onClick={handleClose1}
                      PaperProps={{
                        elevation: 0,
                        sx: {
                          overflow: "visible",
                          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                          mt: 1.5,
                          "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                          },
                          "&:before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                          },
                        },
                      }}
                      transformOrigin={{ horizontal: "right", vertical: "top" }}
                      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                    >
                      <MenuItem onClick={handleClose}>Setting</MenuItem>
                      <MenuItem onClick={handleToggle}>
                        Enable dark theme
                      </MenuItem>
                      <MenuItem onClick={handleClose}>Send feedback</MenuItem>
                      <MenuItem onClick={handleClose}>Help</MenuItem>
                      <MenuItem onClick={handleClose}>App download</MenuItem>
                      <MenuItem onClick={handleClose}>
                        Keyboard shortcuts
                      </MenuItem>
                    </Menu>
                  </Button>
                </Tooltip>
              </Box>

              <Box sx={{ flexGrow: 0, marginLeft: "50px" }}>
                <Tooltip title="Account settings">
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 1 }}
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                  >
                    <Avatar
                      alt="Profile Picture"
                      src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=500"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={opene}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 20,

                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  sx={{ textAlign: "center" }}
                >
                  <Divider />

                  {storedDayName ? (
                    <p className="text-dark"> {storedDayName}</p>
                  ) : (
                    <p className="text-dark">Hitler</p>
                  )}
                  <IconButton
                    size="small"
                    sx={{ ml: 2, mt: 1 }}
                    // aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    // aria-expanded={open ? 'true' : undefined}
                  >
                    <Avatar
                      alt="Profile Picture"
                      style={{
                        width: "60px",
                        height: "60px",
                        position: "absolute",
                      }}
                      src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=500"
                    />
                    <ModeEditIcon
                      sx={{
                        position: "relative",
                        left: "10px",
                        top: "20px",
                        backgroundColor: "white",
                        borderRadius: "50%",
                      }}
                    />
                  </IconButton>
                  <Typography className="mt-4"> {storedDayName} </Typography>
                  <Button variant="outlined" sx={{ margin: "10px" }}>
                    Manage your Google Account
                  </Button>
                  <Box
                    sx={{
                      display: "flex",
                      width: "310px",
                      margin: "10px",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      backgroundColor: "wheat",
                      borderRadius: "30px",
                    }}
                  >
                    <MenuItem>
                      <ListItemIcon>
                        <AddIcon fontSize="small" />
                      </ListItemIcon>
                      <Typography>Add account</Typography>
                    </MenuItem>
                    <MenuItem onClick={outHandle}>
                      <ListItemIcon>
                        <Logout fontSize="small" />
                      </ListItemIcon>
                      <Typography>Logout</Typography>
                    </MenuItem>
                  </Box>
                  <Typography>
                    <Button sx={{ color: "black" }}>Privacy Policy</Button>
                    <Button sx={{ color: "black" }}>Terms of service</Button>
                  </Typography>
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
        <Drawer
          className="mt-5 "
          sx={{
            marginTop: "30px",
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader sx={{ position: "relative" }}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List
            sx={{
              backgroundColor: isDarkMode ? "#333333" : "#ffffff",
              height: "570px",
            }}
          >
            <Tabs
              orientation="vertical"
              value={value}
              onChange={handleChange}
              aria-label="Vertical tabs example"
              sx={{ borderRight: 1, borderColor: "divider" }}
            >
              <Tab
                label="ADD"
                {...a11yProps(0)}
                style={{
                  width: "239px",
                  backgroundColor: "#F1F3F4",
                  backgroundColor: isDarkMode ? "#333333" : "#ffffff",
                  color: isDarkMode ? "#ffffff" : "#333333",
                }}
              />
              <Tab
                label="Categories"
                {...a11yProps(1)}
                style={{
                  width: "239px",
                  backgroundColor: "#F1F3F4",
                  backgroundColor: isDarkMode ? "#333333" : "#ffffff",
                  color: isDarkMode ? "#ffffff" : "#333333",
                }}
              />
              <Tab
                label="Form"
                style={{
                  width: "239px",
                  backgroundColor: "#F1F3F4",
                  backgroundColor: isDarkMode ? "#333333" : "#ffffff",
                  color: isDarkMode ? "#ffffff" : "#333333",
                }}
              />
              <Tab
                label="Noitems"
                {...a11yProps(3)}
                style={{
                  width: "239px",
                  backgroundColor: "#F1F3F4",
                  backgroundColor: isDarkMode ? "#333333" : "#ffffff",
                  color: isDarkMode ? "#ffffff" : "#333333",
                }}
              />
              <Tab
                label="Bin"
                {...a11yProps(4)}
                style={{
                  width: "239px",
                  backgroundColor: "#F1F3F4",
                  backgroundColor: isDarkMode ? "#333333" : "#ffffff",
                  color: isDarkMode ? "#ffffff" : "#333333",
                }}
              />
            </Tabs>
          </List>
          <Divider />
        </Drawer>
        <Main open={open}>
          <DrawerHeader />

          <Modal
            open={openn}
            onClose={handleCut}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style1}>
              <Typography>Edit labels</Typography>
              <Box sx={{ display: "flex" }}>
                <Tooltip title="Cancel">
                  <IconButton>
                    <CloseIcon />
                  </IconButton>
                </Tooltip>
                <TextField
                  id="standard-basic"
                  placeholder="Create new label"
                  variant="standard"
                />
                <Tooltip title="Create label">
                  <IconButton>
                    <DoneIcon />
                  </IconButton>
                </Tooltip>
              </Box>
              <Drawer />
              <Box sx={{ textAlign: "end", width: "260px", marginTop: "20px" }}>
                <Button>Done</Button>
              </Box>
            </Box>
          </Modal>
          <TabPanel value={value} index={0}>
            <Category />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Categories />
          </TabPanel>
          <TabPanel value={value} index={2}>
            form
          </TabPanel>
          <TabPanel value={value} index={3}></TabPanel>
          <TabPanel value={value} index={4}>
            Bin
          </TabPanel>
          <TabPanel value={value} index={5}></TabPanel>
          <TabPanel value={value} index={6}></TabPanel>
        </Main>
      </Box>
    </>
  );
};

export default Home;
