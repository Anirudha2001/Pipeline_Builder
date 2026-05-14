// store.js

import { create } from "zustand";
import {
    addEdge,
    applyNodeChanges,
    applyEdgeChanges,
    MarkerType,
  } from 'reactflow';

const STORAGE_KEY = 'vectorshift-pipeline-v1';

const loadInitialState = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { nodes: [], edges: [], nodeIDs: {} };
    }
    const parsed = JSON.parse(raw);
    return {
      nodes: parsed.nodes || [],
      edges: parsed.edges || [],
      nodeIDs: parsed.nodeIDs || {},
    };
  } catch (_) {
    return { nodes: [], edges: [], nodeIDs: {} };
  }
};

const persistState = (state) => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      nodes: state.nodes,
      edges: state.edges,
      nodeIDs: state.nodeIDs,
    })
  );
};

const initial = loadInitialState();

export const useStore = create((set, get) => ({
    nodes: initial.nodes,
    edges: initial.edges,
    nodeIDs: initial.nodeIDs,
    getNodeID: (type) => {
        const newIDs = {...get().nodeIDs};
        if (newIDs[type] === undefined) {
            newIDs[type] = 0;
        }
        newIDs[type] += 1;
        set({nodeIDs: newIDs});
        persistState({ ...get(), nodeIDs: newIDs });
        return `${type}-${newIDs[type]}`;
    },
    addNode: (node) => {
        const nextState = {
            ...get(),
            nodes: [...get().nodes, node]
        };
        set(nextState);
        persistState(nextState);
    },
    onNodesChange: (changes) => {
      const nextState = {
        ...get(),
        nodes: applyNodeChanges(changes, get().nodes),
      };
      set(nextState);
      persistState(nextState);
    },
    onEdgesChange: (changes) => {
      const nextState = {
        ...get(),
        edges: applyEdgeChanges(changes, get().edges),
      };
      set(nextState);
      persistState(nextState);
    },
    onConnect: (connection) => {
      const nextState = {
        ...get(),
        edges: addEdge({...connection, type: 'smoothstep', animated: true, markerEnd: {type: MarkerType.Arrow, height: '20px', width: '20px'}}, get().edges),
      };
      set(nextState);
      persistState(nextState);
    },
    updateNodeField: (nodeId, fieldName, fieldValue) => {
      const nextState = {
        ...get(),
        nodes: get().nodes.map((node) => {
          if (node.id === nodeId) {
            node.data = { ...node.data, [fieldName]: fieldValue };
          }
  
          return node;
        }),
      };
      set(nextState);
      persistState(nextState);
    },
    deleteNode: (nodeId) => {
      const nextState = {
        ...get(),
        nodes: get().nodes.filter((n) => n.id !== nodeId),
        edges: get().edges.filter((e) => e.source !== nodeId && e.target !== nodeId),
      };
      set(nextState);
      persistState(nextState);
    },
    clearPipeline: () => {
      const nextState = { ...get(), nodes: [], edges: [], nodeIDs: {} };
      set(nextState);
      persistState(nextState);
    },
  }));
