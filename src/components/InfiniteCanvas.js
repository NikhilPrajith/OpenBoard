"use client";
import React, { useState, useEffect, useCallback } from "react";
//import { useKeyPress, useKeyDown } from 'react-keyboard-input-hook';

import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  ReactFlowProvider,
  Panel,
} from "reactflow";
import styles from "./InfinitaCanvas.module.css";
import ToDoTaskNode from "./ToDoTask/ToDoTaskNode";
import "reactflow/dist/style.css";
import BasicTools from "./BasicTools/BasicTools";
import StickyNote from "./StickyNote/StickyNote";
import DraggableTimer from "./Timer/DraggableTimer";
import ParticleEffect from "./ParticleJs/ParticleEffect";
import SideBar from "./SideBar/SideBar";
import ImageNode from "./CoolStuff/ImageNode";
import Stickers from "./CoolStuff/Stickers";
import Video from "./Video/Video";
import VideoSearch from "./VideoSearch/VideoSearch";
import FlashCards from "./ZPackage/FlashCards/FlashCards";
import TextNode from "./Text/Text";
import useStore, { useBoard } from "@/context/BoardContext";
import CardComp from "./Card/Card";
import CardDataNode from "./Card/CardDataNode";
import InViewDocument from "./Card/InViewDocument";
import DocumentCardComp from "./Card/DocumentCard";
import PicNote from "./PicNote/PicNote";
import useAuth from "@/context/Authentication/AuthProvider";
import LinkPreview from "./LinkPreview/LinkPreview";
import Weather from "./ZPackage/Weather/Weather";
import CodeEditor from "./ZPackage/CodeEditor/CodeEditor";

import dynamic from "next/dynamic";

import Drawer from "@mui/material/Drawer";
import DocumentComp from "./DocumentComps/DocumentComp";
import Mermaid from "./ZPackage/Mermaid/Mermaid";
import ImageEmbed from "./ImageUpload/ImageEmbed";
import Callout from "./ZPackage/Callout/Callout";
import ShapeNode from "./Shapes/ShapeNode";
import BoardInformationPanel from "./Information/BoardInformationPanel";

const snapGrid = [10, 10];

const defaultViewport = { x: 10, y: 75, zoom: 0.77 };
const initBgColor = "white";
const snowColor = "rgb(148, 213, 255)";
const nodeTypes = {
  taskListNode: ToDoTaskNode,
  stickyNote: StickyNote,
  timer: DraggableTimer,
  stickers: ImageNode,
  video: Video,
  flashCards: FlashCards,
  textElement: TextNode,
  cardComp: CardComp,
  cardDataNode: CardDataNode,
  documentComp: DocumentCardComp,
  picNote: PicNote,
  linkPreview: LinkPreview,
  weather: Weather,
  codePresentation: CodeEditor,
  mermaidDiagram: Mermaid,
  callout: Callout,
  shapeNode: ShapeNode,
};

export default function InfiniteCanvas({ documentID, boardType = "Custom" }) {
  const [bgColor, setBgColor] = useState(initBgColor);
  const [selectedEffect, setSelectedEffect] = useState("");
  const [showEffect, setShowEffect] = useState(false);
  const [showSideBar, setShowSidebar] = useState(false);
  const [copiedNodes, setCopiedNodes] = useState([]);

  const { user, data, initialLoading } = useAuth();
  const {
    isSavedBoard,
    setIsSavedBoard,
    saveDataToLocalStorageBoard,
    nodes,
    setNodes,
    onNodesChange,
    onConnect,
    edges,
    setEdges,
    onEdgesChange,
    alignment,
    setAlignment,
    rfInstance,
    setRfInstance,
    onSave,
    onRestore,
    addNode,
    updateThemeStickers,
    restoreBoardState,
    restoreTemplateState,
    setDocumentId,
    themes,
    documentName,
    setDocumentName,
  } = useBoard();

  /*const {nodes, setNodes, onNodesChange, edges, setEdges,onEdgesChange,
     setAlignment, onRestore, setRfInstance} = useStore();*/

  const getNodeId = () => `randomnode_${+new Date()}_${+Math.random(100)}}`;

  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [showCanvas, setShowCanvas] = useState(null);
  function formatDate(date) {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    }).format(date);
  }
  function CurrentDate() {
    const now = new Date();
    const formattedDate = formatDate(now);
    return formattedDate;
  }
  const defaultNodes = [
    {
      id: getNodeId(),
      type: "timer",
      style: { padding: 4 },
      data: {},
      position: {
        x: window.innerWidth / 2 + 110,
        y: 10,
      },
    },
    {
      id: getNodeId(),
      type: "stickyNote",
      style: { padding: 4 },
      data: { color: "rgb(92, 241, 192)" },
      position: {
        x: (window.innerWidth / 5) * 4,
        y: 300,
      },
    },
    {
      id: getNodeId(),
      type: "stickyNote",
      style: { padding: 4 },
      data: { color: "rgb(92, 241, 192)" },
      position: {
        x: (window.innerWidth / 5) * 4 + 100,
        y: 400,
      },
    },
    {
      id: getNodeId(),
      type: "stickyNote",
      style: { padding: 4 },
      data: { color: "rgb(92, 241, 192)" },
      position: {
        x: (window.innerWidth / 5) * 4 + 200,
        y: 500,
      },
    },
    {
      id: getNodeId(),
      type: "taskListNode",
      dragHandle: ".dragHandle",
      data: {},
      style: { padding: 4 },
      position: {
        x: window.innerWidth / 5,
        y: 300,
      },
    },

    {
      id: getNodeId(),
      type: "video",
      style: { padding: 10 },
      data: { url: "https://www.youtube.com/watch?v=jfKfPfyJRdk" },
      position: {
        x: window.innerWidth / 2,
        y: 250,
      },
    },
  ];
  useEffect(() => {
    const fetchData = async () => {
      if (!documentID) {
        setShowCanvas(true);
        setNodes(defaultNodes);
        onRestore();
        const theme = localStorage.getItem("theme");
        const themeData = theme ? JSON.parse(theme) : "Paper";
        setAlignment(themeData);
        changeTheme(themeData, true);
      } else if (documentID && boardType == "Template") {
        const { message, info, theme } = await restoreTemplateState(documentID);
        if (message != "Failed") {
          setShowCanvas(true);
        } else {
          setShowCanvas(false);
          return;
        }

        changeTheme(theme, true);
      } else {
        console.log("custom owner template");
        setDocumentId(documentID);
        if (initialLoading) {
          return;
        }
        if (!user) {
          setShowCanvas(false);
          return;
        }
        const { message, info, theme } = await restoreBoardState(documentID);
        if (message != "Failed") {
          setShowCanvas(true);
        } else {
          setShowCanvas(false);
          return;
        }

        changeTheme(theme, true);
        await data;
        if (!documentName) {
          if (!data || !data.boards) {
            return;
          }
          const boardData = await data.boards.find(
            (board) => board.id === documentID
          );
          console.log("id", boardData?.name);
          setDocumentName(boardData?.name);
        }
      }
    };
    fetchData();
  }, [documentID, initialLoading, data.boards]);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      // reactFlowInstance.project was renamed to reactFlowInstance.screenToFlowPosition
      // and you don't need to subtract the reactFlowBounds.left/top anymore
      // details: https://reactflow.dev/whats-new/2023-11-10
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );
  /*
  //TODO: Copy paste
  const handleKeyDown = useCallback((event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === 'c') {
      const selectedNodes = nodes.filter(node => node.selected);
      if (selectedNodes.length > 0) {
        setCopiedNodes(selectedNodes);
      }
    } else if ((event.ctrlKey || event.metaKey) && event.key === 'v') {
      if (copiedNodes.length > 0) {
        const newNodes = copiedNodes.map(node => ({
          ...node,
          id: getNodeId(),
          position: {
            x: node.position.x + 20,
            y: node.position.y + 20
          }
        }));
        
        addNode(newNodes);
      }
    }
  }, [nodes, copiedNodes]);*/
  /*
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);*/

  const [openDocumentEditor, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const onAdd = (type) => {
    if (type == "draw") {
      setShowDraw(!showDraw);
      return;
    }

    let dragHandle = "";
    if (type == "taskListNode" || type == "textElement") {
      dragHandle = ".dragHandle";
    }

    const newNodeId = getNodeId();
    let data = {};
    if (type == "documentComp") {
      data = {
        id: newNodeId,
        open: handleDrawerOpen,
        close: handleDrawerClose,
      };
    }
    if (type == "stickyNote") {
      data.color = "rgb(254, 240, 113)";
    }
    const newNode = {
      id: newNodeId,
      type: type,
      dragHandle: dragHandle,
      data: data,
      style: { padding: 4 },
      position: {
        x: Math.random() * window.innerWidth + 100,
        y: Math.random() * window.innerHeight,
      },
    };
    addNode(newNode);
  };

  const addShapeToFlow = (shape) => {
    console.log("Trying to add shape:", shape);
    const newNode = {
      id: getNodeId(),
      type: "shapeNode",
      position: {
        x: Math.random() * window.innerWidth + 100,
        y: Math.random() * window.innerHeight,
      },
      selected: true,
      data: {
        label: `${shape} node`,
        shape: shape,
        style: {},
      },
    };
    addNode(newNode);
  };

  const getNodeStyle = (shape) => {
    switch (shape) {
      case "rectangle":
        return {};
      case "circle":
        return { borderRadius: "50%" };
      case "diamond":
        return {
          transform: "rotate(45deg)",
          backgroundColor: "#d4edda",
        };
      case "triangle":
        return {
          borderLeft: "50px solid transparent",
          borderRight: "50px solid transparent",
          borderBottom: "100px solid #cce5ff",
          backgroundColor: "transparent",
        };
      case "cross":
        return {
          position: "relative",
          backgroundColor: "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        };
      case "trapezoid":
        return {
          borderBottom: "50px solid #fff3cd",
          borderLeft: "25px solid transparent",
          borderRight: "25px solid transparent",
          backgroundColor: "transparent",
        };
      default:
        return {};
    }
  };

  const onAddStcikers = (url, srcType = "Image") => {
    console.log("srcType", srcType, url);
    const newNode = {
      id: getNodeId(),
      type: "stickers",
      data: { url: url, type: srcType },
      style: { padding: 4 },
      position: {
        x: Math.random() * window.innerWidth + 100,
        y: Math.random() * window.innerHeight,
      },
    };
    addNode(newNode);
  };
  const onAddVideoFunction = (url) => {
    const newNode = {
      id: getNodeId(),
      type: "video",
      data: { url: url },
      style: { padding: 4 },
      position: {
        x: (Math.random() * window.innerWidth) / 2 + window.innerWidth / 4,
        y: Math.random() * window.innerHeight,
      },
    };
    addNode(newNode);
  };

  const changeTheme = (themeName, initial) => {
    if (!themeName) {
      return;
    }
    let theme = themes[themeName];
    if (bgColor != theme.backgroundColor) {
      setBgColor(theme.backgroundColor);
    }
    if (selectedEffect != theme.effect) {
      setSelectedEffect(theme.effect);
      setShowEffect(theme.effect !== "");
    }

    if (initial) {
      return;
    }

    let themeStickerTemp = [];
    if (theme.images && theme.images.length > 1) {
      console.log("add image");
      theme.images.forEach((url, index) => {
        if (index == 0) {
          return;
        }

        const newNode = {
          id: `themeStickers_${getNodeId(theme.name)}`, // Modify this to include theme identifier
          type: "stickers",
          data: { url: url, type: "Image" },
          style: { padding: 4 },
          position: {
            x: Math.random() * window.innerWidth - 100,
            y: Math.random() * window.innerHeight,
          },
        };
        themeStickerTemp.push(newNode);
      });
    }

    updateThemeStickers(themeStickerTemp);
  };

  const [showDraw, setShowDraw] = useState(true);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      {showCanvas && (
        <ReactFlowProvider>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            style={{
              background: bgColor,
              imageRendering: "-webkit-optimize-contrast",
            }}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            attributionPosition="bottom-left"
            snapToGrid={true}
            snapGrid={[25,25]}
            defaultViewport={defaultViewport}
            onConnect={onConnect}
            multiSelectionKeyCode={16}
            onInit={setRfInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
          >
            {/*<MiniMap nodeStrokeWidth={3} nodeColor='rgb(231, 231, 231)' maskColor='rgba(231, 240, 254, 0.76)' />*/}
            {showEffect && (
              <ParticleEffect selectedEffect={selectedEffect}></ParticleEffect>
            )}
            <Background size={1.4} variant="dots"></Background>

            <Panel position="bottom-right">
              <BoardInformationPanel />
            </Panel>
          </ReactFlow>
          <BasicTools
            addShapeToFlow={addShapeToFlow}
            themes={themes}
            changeTheme={changeTheme}
            setShowSidebar={setShowSidebar}
            showSideBar={showSideBar}
            addingNode={onAdd}
            addImageFunction={onAddStcikers}
          ></BasicTools>
          <VideoSearch
            setShowSidebar={setShowSidebar}
            onAddVideoFunction={onAddVideoFunction}
          ></VideoSearch>

          {/*<SideBar themes={themes} isVisible={true} setShowSidebar={setShowSidebar} showSideBar={showSideBar} changeTheme={changeTheme} addImageFunction={onAddStcikers}></SideBar>*/}
        </ReactFlowProvider>
      )}
      <Drawer
        sx={{
          width: 600,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 600,
            boxSizing: "border-box",
          },
        }}
        anchor="right"
        variant="persistent"
        open={openDocumentEditor}
      >
        <DocumentComp close={handleDrawerClose}></DocumentComp>
      </Drawer>

      {showCanvas == false && (
        <div style={{ margin: "140px", color: "grey" }}>
          Failed permissions!
        </div>
      )}
    </div>
  );
}
