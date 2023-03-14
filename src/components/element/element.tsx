import { EllipseElement } from "./components/ellipse-element";
import { FreeDrawnElement } from "./components/free-drawn-element";
import { LineElement } from "./components/line-element";
import { RectangleElement } from "./components/rectangle-element";
import { DrawnElement, ElementType } from "types/element";

interface ElementProps {
  element: DrawnElement;
}

export function Element({ element }: ElementProps) {
  if (element.type === ElementType.FreeDrawn) return <FreeDrawnElement element={element} />;
  if (element.type === ElementType.Ellipse) return <EllipseElement element={element} />;
  if (element.type === ElementType.Rectangle) return <RectangleElement element={element} />;
  if (element.type === ElementType.Line) return <LineElement element={element} />;

  return null;
}
