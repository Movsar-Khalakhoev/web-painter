import { DrawnElement } from "types/element";
import { Tool } from "types/tools";
import { create } from "zustand";

interface Store {
  selectedTool: Tool;
  setSelectedTool: (tool: Tool) => void;
  drawnElements: DrawnElement[];
  addDrawnElement: (element: DrawnElement) => void;
}

export const useStore = create<Store>((set, get) => ({
  selectedTool: Tool.Ellipse,
  setSelectedTool: (tool: Tool) => set({ selectedTool: tool }),
  drawnElements: [],
  addDrawnElement: (element: DrawnElement) => set({ drawnElements: [...get().drawnElements, element] }),
}));
