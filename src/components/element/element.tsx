import { FreeDrawnElement } from "./components/free-drawn-element/free-drawn-element";
import { DrawnElement, ElementType } from "types/element";

interface ElementProps {
  element: DrawnElement;
}

export function Element({ element }: ElementProps) {
  if (element.type === ElementType.FreeDrawn) return <FreeDrawnElement element={element} />;

  return null;
}
