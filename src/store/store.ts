import { DrawnElement } from "types/element";
import { Tool } from "types/tools";
import { create } from "zustand";

interface Store {
  selectedTool: Tool;
  setSelectedTool: (tool: Tool) => void;
  drawnElements: DrawnElement[];
  addDrawnElement: (element: DrawnElement) => void;
  selectedStrokeWidth: number;
  setSelectedStrokeWidth: (width: number) => void;
  selectedStrokeColor: string;
  setSelectedStrokeColor: (color: string) => void;
}

export const useStore = create<Store>((set, get) => ({
  selectedTool: Tool.Ellipse,
  setSelectedTool: (tool) => set({ selectedTool: tool }),
  drawnElements: [],
  addDrawnElement: (element) => set({ drawnElements: [...get().drawnElements, element] }),
  selectedStrokeWidth: 2,
  setSelectedStrokeWidth: (width) => set({ selectedStrokeWidth: width }),
  selectedStrokeColor: "#ff0000",
  setSelectedStrokeColor: (color) => set({ selectedStrokeColor: color }),
}));
