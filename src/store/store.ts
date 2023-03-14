import { Tool } from "types/tools";
import { create } from "zustand";

interface Store {
  selectedTool: Tool;
  setSelectedTool: (tool: Tool) => void;
}

export const useStore = create<Store>((set) => ({
  selectedTool: Tool.Cursor,
  setSelectedTool: (tool: Tool) => set({ selectedTool: tool }),
}));
