"use client";
import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Collapse from "@mui/material/Collapse";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import ListSubheader from "@mui/material/ListSubheader";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { MdOutlineDashboard } from "react-icons/md";
import { MdPlaylistAddCircle } from "react-icons/md";
import { RiDashboardFill } from "react-icons/ri";
import { IoDocumentText } from "react-icons/io5";
import { FaThList } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MdSpaceDashboard } from "react-icons/md";
import { FcTodoList } from "react-icons/fc";
import styles from "./Features.module.css";

import { FcCloth } from "react-icons/fc";
import useAuth from "@/context/Authentication/AuthProvider";
import { MdDesignServices } from "react-icons/md";
import { useBoard } from "@/context/BoardContext";

import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import { IoMdHelpBuoy } from "react-icons/io";

const drawerWidth = 210;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  borderRight: "0.1px rgb(212, 210, 210) solid", // Apply border style

  backgroundColor: "color(srgb 0.9931 0.975 1)",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  borderRight: "0.1px rgb(212, 210, 210) solid", // Apply border style

  backgroundColor: "color(srgb 0.9931 0.975 1)",
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Features({ setType, setOpenParent }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const handleChange = () => {
    setOpen(!open);
    setOpenParent(!open);
  };
  const { user, data } = useAuth();
  const [showDashboard, setShowDashboard] = React.useState(false);

  React.useEffect(() => {
    if (user) {
      setShowDashboard(true);
    } else {
      setShowDashboard(false);
    }
  }, [user]);
  const iconSize = 17;
  const pageIcons = {
    0: { icon: <FcCloth size={iconSize} />, page: "/" },
    1: { icon: <MdDesignServices size={iconSize} />, page: "/templates" },
    2: { icon: <FcTodoList size={iconSize} />, page: "/tasks" },
    3: { icon: <FaThList size={iconSize}></FaThList>, page: "/board" },

    4: { icon: <MdSpaceDashboard size={iconSize} />, page: "/dashboard" },
    //3:{icon:<IoDocumentText size={iconSize}/>, page: "/docs"},
  };
  const router = useRouter();
  const handleNavigation = (page) => {
    router.push(page);
  };
  const {
    setNodes,
    setEdges,
    setAlignment,
    documentId,
    setDocumentName,
    deleteBoard,
    pubishAsTemplate,
    copyFlowElementsForComponents,
  } = useBoard();
  const edit = (id, name) => {
    console.log("edit clicked");
    if (id != documentId) {
      setNodes([]);
      setEdges([]);
      setAlignment("Plain");
      setDocumentName(name);
    }

    router.push(`/canvas?documentId=${id}`);
  };

  const formatDate = (dateInput) => {
    const date = dateInput.toDate();
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const selectableColorsMap = {
    "rgb(254, 240, 113)": "🤓",
    "rgb(92, 241, 192)": "🤩",
    "rgb(255, 205, 205)": "🤯",
    "rgb(229, 187, 247)": "😑",
    "rgb(163, 211, 249)": "😴",
  };

  return (
    <Box
      sx={{
        display: "flex",
        borderRight: "0.1px rgb(212, 210, 210) solid",
        backgroundColor: "color(srgb 0.9931 0.975 1)",
        position: "relative",
      }}
    >
      {" "}
      {/* Ensure the Box uses Arial */}
      <CssBaseline />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader
          sx={{
            minHeight: "55px !important",
            borderBottom: "0.1px rgb(212, 210, 210) solid",
          }}
        >
          <IconButton
            sx={{
              color: "black",
              fontSize: "12px",
              margin: !open ? "auto" : "initial",
            }}
            onClick={handleChange}
          >
            {!open ? <IoIosArrowForward /> : <IoIosArrowBack />}
          </IconButton>
        </DrawerHeader>
        <div
          className="flex flex-col justify-between"
          style={{ height: "100%" }}
        >
          <div>
            <List
              sx={{
                "& .MuiListItemText-root span": {
                  fontSize: "11px",
                  color: "rgb(110, 110, 110)",
                  fontFamily: "inherit",
                  fontWeight: "400",
                }, // Use 'inherit' for the font
                "& .MuiListItemIcon-root": {
                  color: "rgb(110, 110, 110)",
                  fontSize: "11px",
                  fontWeight: "400",
                }, // Adjusted font size for text
                "& .MuiSvgIcon-root": { fontSize: "11px", fontWeight: "400" }, // Adjusted font size for icons
              }}
            >
              {["Local Playground", "Templates", "Tasker"].map(
                (text, index) => (
                  <ListItem
                    onClick={() => {
                      if (!showDashboard && text === "Tasker") {
                        return; // Exit early if disabled
                      }
                      handleNavigation(pageIcons[index].page);
                    }}
                    key={text}
                    disablePadding
                    sx={{ display: "block" }}

                  disabled={!showDashboard && text === "Tasker"}
                  >
                    <ListItemButton
                      sx={{
                        minHeight: 35,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        {" "}
                        {/* Explicitly target icons within ListItemIcon */}
                        {pageIcons[index].icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={text}
                        sx={{ opacity: open ? 1 : 0 }}
                      />
                    </ListItemButton>
                  </ListItem>
                )
              )}
              <Divider></Divider>
                <ListItem
                  onClick={() => {
                    if (!showDashboard) {
                      return; // Exit early if disabled
                    }
                    handleNavigation(pageIcons[4].page);
                  }}
                  key={"Dashboard"}
                  disablePadding
                  sx={{ display: "block" }}
                  disabled={!showDashboard}
                >
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      {" "}
                      {/* Explicitly target icons within ListItemIcon */}
                      {pageIcons[4].icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={"Dashboard"}
                      sx={{ opacity: open ? 1 : 0, fontWeight: "900" }}
                    />
                    {/*{open && <ExpandLess />}*/}
                  </ListItemButton>
                </ListItem>
              <Collapse in={open} timeout="auto" unmountOnExit>
                {user && data.boards && (
                  <List component="div" disablePadding>
                    {data?.boards.map((board) => (
                      <ListItemButton
                        key={board.name}
                        onClick={() => {
                          edit(board.id, board.name);
                        }}
                        sx={{
                          minHeight: 48,
                          justifyContent: open ? "initial" : "center",
                          px: 2.5,
                          pl: 4,
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: open ? 3 : "auto",
                            justifyContent: "center",
                          }}
                        >
                          {selectableColorsMap[board.color]}
                        </ListItemIcon>
                        <ListItemText primary={board.name} />
                      </ListItemButton>
                    ))}
                  </List>
                )}
              </Collapse>
            </List>
            <Divider />
          </div>
          <div>
            <div className={styles.versionText}>Version 0.9</div>
            <div>
              <List
                sx={{
                  "& .MuiListItemText-root span": {
                    fontSize: "11px",
                    color: "rgb(110, 110, 110)",
                    fontFamily: "inherit",
                    fontWeight: "400",
                  }, // Use 'inherit' for the font
                  "& .MuiListItemIcon-root": {
                    color: "rgb(110, 110, 110)",
                    fontSize: "11px",
                    fontWeight: "400",
                  }, // Adjusted font size for text
                  "& .MuiSvgIcon-root": { fontSize: "11px", fontWeight: "400" }, // Adjusted font size for icons
                }}
              >
                <ListItem disablePadding sx={{ display: "block" }}>
                <a href="https://forms.gle/YKWZ8iL1w6fHmp1RA" target="_blank" rel="noopener noreferrer">
                  <ListItemButton
                    sx={{
                      minHeight: 35,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      {" "}
                      {/* Explicitly target icons within ListItemIcon */}
                      <IoMdHelpBuoy size={17} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Feedback"
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                  </a>
                </ListItem>
              </List>
            </div>
          </div>
        </div>
      </Drawer>
    </Box>
  );
}
