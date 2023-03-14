import { EllipseElement } from "./components/ellipse-element";
import { FreeDrawnElement } from "./components/free-drawn-element";
import { DrawnElement, ElementType } from "types/element";

interface ElementProps {
  element: DrawnElement;
}

export function Element({ element }: ElementProps) {
  if (element.type === ElementType.FreeDrawn) return <FreeDrawnElement element={element} />;
  if (element.type === ElementType.Ellipse) return <EllipseElement element={element} />;

  return null;
}
