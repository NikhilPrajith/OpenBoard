import create from "zustand";
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
} from "reactflow";
import { createClient } from "@liveblocks/client";
import { liveblocks } from "@liveblocks/zustand";
import type { WithLiveblocks } from "@liveblocks/zustand";
import nodes from "./nodes";
import edges from "./edges";

const PUBLIC_API_KEY = process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY as string;
const client = createClient({
  publicApiKey: PUBLIC_API_KEY,
  throttle: 16,
});

type FlowState = {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  enableSharing: () => Promise<void>;
  disableSharing: () => void;
  addNode: (node: Node) => void;
  updateThemeStickers: (stickers: Node[]) => void;
  removeAllThemeStickers: () => void;
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
};
/*
const useStore = create<WithLiveblocks<FlowState, {}, { nodes: Node[]; edges: Edge[] }>>(liveblocks(
  (set, get) => ({
    nodes,
    edges,

    // Methods to enable and disable sharing
    enableSharing: async () => {
      if (!get().roomId) {
        const roomId = 'dynamic-room-id';
        set({ roomId, sharingEnabled: true });
        client.enterRoom(roomId);
      } else {
        set({ sharingEnabled: true });
      }
    },

    disableSharing: () => {
      if (get().roomId) {
        client.leaveRoom(get().roomId);
        set({ roomId: null, sharingEnabled: false });
      }
    },

    // Directly setting nodes and edges
    setNodes: (nodes) => set({ nodes }),
    setEdges: (edges) => set({ edges }),

    // Handling node and edge changes
    onNodesChange: (changes) => set({ nodes: applyNodeChanges(changes, get().nodes) }),
    onEdgesChange: (changes) => set({ edges: applyEdgeChanges(changes, get().edges) }),
    onConnect: (connection) => set({ edges: addEdge(connection, get().edges) }),

    // Custom functions for node management
    addNode: (newNode) => set(state => ({ nodes: state.nodes.concat(newNode) })),
    updateThemeStickers: (newStickers) => {
      const filteredNodes = get().nodes.filter(node => !node.id.startsWith('themeStickers'));
      set({ nodes: [...filteredNodes, ...newStickers] });
    },
    removeAllThemeStickers: () => {
      const filteredNodes = get().nodes.filter(node => !node.id.startsWith('themeStickers'));
      set({ nodes: filteredNodes });
    },
  }),
  {
    client,
    storageMapping: {
      nodes:false,
      edges:false
    },
  }
));*/

const useStore = create<FlowState>((set, get) => ({
  nodes,
  edges,

  setNodes: (nodes: Node[]) => set({ nodes }),
  setEdges: (edges: Edge[]) => set({ edges }),

  onNodesChange: (changes: NodeChange[]) =>
    set({ nodes: applyNodeChanges(changes, get().nodes) }),
  onEdgesChange: (changes: EdgeChange[]) =>
    set({ edges: applyEdgeChanges(changes, get().edges) }),
  onConnect: (connection: Connection) =>
    set({ edges: addEdge(connection, get().edges) }),

  addNode: (newNode: Node) =>
    set((state) => ({ nodes: [...state.nodes, newNode] })),
  updateThemeStickers: (newStickers: Node[]) => {
    const filteredNodes = get().nodes.filter(node => !node.id.startsWith('themeStickers'));
    set({ nodes: [...filteredNodes, ...newStickers] });
  },
  removeAllThemeStickers: () =>
    set(() => ({
      nodes: get().nodes.filter(node => !node.id.startsWith('themeStickers'))
    })),
}));

export default useStore;
