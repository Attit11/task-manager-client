import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LogoutIcon from "@mui/icons-material/Logout";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { ButtonGroup, Modal, Paper } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../asset/config";
import "./homePage.css";
import CheckIcon from "@mui/icons-material/Check";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import Task from "../components/task";
import Profile from "../components/profile";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
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
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

function HomePage() {
  const [logoutUserLoading, setLogoutUserLoading] = React.useState(false);
  const [createTaskModalOpen, setCreateTaskModalOpen] = React.useState(false);
  const [profileModalOpen, setProfileModalOpen] = React.useState(false);
  const [tasks, setTasks] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const getAllTask = async () => {
    const tasks = await axios.get(`${apiUrl}/task`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    setTasks(tasks.data);
  };
  React.useEffect(() => {
    getAllTask();
  }, []);

  const navigate = useNavigate();
  const theme = useTheme();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const logoutUser = async () => {
    setLogoutUserLoading(true);
    await axios.post(
      `${apiUrl}/user/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }
    );
    localStorage.removeItem("authToken");
    setLogoutUserLoading(false);
    navigate("/login");
  };

  const logoutAllUser = async () => {
    setLogoutUserLoading(true);

    await axios.post(
      `${apiUrl}/user/logoutAll`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }
    );
    localStorage.removeItem("authToken");
    setLogoutUserLoading(false);

    navigate("/login");
  };

  const deleteTask = async (id) => {
    await axios.delete(`${apiUrl}/task/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    getAllTask();
  };
  const completeTask = async (id, data) => {
    await axios.patch(
      `${apiUrl}/task/${id}`,
      {
        completed: true,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }
    );
    getAllTask();
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }} component="div">
            Task Manager App
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            sx={{ ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Main open={open}>
        <DrawerHeader />
        <Typography>To Do task</Typography>
        <Divider />
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            "& > :not(style)": {
              m: 1,
              width: 400,
              height: 70,
            },
          }}
        >
          {tasks.map(
            (task) =>
              !task.completed && (
                <Paper
                  key={task._id}
                  id="not-completed"
                  className="paper"
                  elevation={3}
                >
                  <Typography>{task.description}</Typography>
                  <ButtonGroup
                    // variant="contained"
                    aria-label="outlined primary button group"
                  >
                    <IconButton
                      onClick={() => completeTask(task._id)}
                      color="primary"
                      aria-label="upload picture"
                      component="label"
                    >
                      <CheckIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => deleteTask(task._id)}
                      color="primary"
                      aria-label="upload picture"
                      component="label"
                    >
                      <DeleteOutlineIcon color="warning" />
                    </IconButton>
                  </ButtonGroup>
                </Paper>
              )
          )}

          {/* create a new task */}
          <Paper
            id="not-completed"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            elevation={3}
          >
            <IconButton
              color="primary"
              onClick={() => setCreateTaskModalOpen((prev) => !prev)}
              aria-label="create new task"
              component="label"
            >
              <AddIcon />
            </IconButton>
          </Paper>
        </Box>
        <Typography>Completed Task</Typography>
        <Divider />
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            "& > :not(style)": {
              m: 1,
              width: 400,
              height: 70,
            },
          }}
        >
          {tasks.map(
            (task) =>
              task.completed && (
                <Paper
                  key={task._id}
                  id="completed"
                  className="paper"
                  elevation={3}
                >
                  <Typography>{task.description}</Typography>
                  <ButtonGroup
                    // variant="contained"
                    aria-label="outlined primary button group"
                  >
                    {/* <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="label"
                    >
                      <CheckIcon />
                    </IconButton> */}
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      onClick={() => deleteTask(task._id)}
                      component="label"
                    >
                      <DeleteOutlineIcon color="warning" />
                    </IconButton>
                  </ButtonGroup>
                </Paper>
              )
          )}
        </Box>
      </Main>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {/* {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))} */}
          <ListItem
            onClick={() => {
              console.log("Clicked")
              setProfileModalOpen((prev) => !prev)}}
            key="Profile"
            disablePadding
          >
            <ListItemButton>
              <ListItemIcon>
                <AccountBoxIcon />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemButton>
          </ListItem>
          <ListItem onClick={logoutUser} key="Logout" disablePadding>
            <ListItemButton disabled={logoutUserLoading}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
          <ListItem
            onClick={logoutAllUser}
            key="Logout All Users"
            disablePadding
          >
            <ListItemButton disabled={logoutUserLoading}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Logout All Users" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      {/*create a new task modal */}
      <Modal
        open={createTaskModalOpen}
        onClose={() => setCreateTaskModalOpen((prev) => !prev)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Task
            getAllTask={getAllTask}
            name="Create a new Task"
            setCreateTaskModalOpen={setCreateTaskModalOpen}
          />
        </Box>
      </Modal>
      <Modal
        open={profileModalOpen}
        onClose={() => setProfileModalOpen((prev) => !prev)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Profile
          />
        </Box>
      </Modal>
    </Box>
  );
}

export default HomePage;
