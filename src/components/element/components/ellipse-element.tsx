import { Ellipse } from "react-konva";
import { EllipseElement as EllipseElementType } from "types/element";

interface EllipselementProps {
  element: EllipseElementType;
}

export function EllipseElement({ element }: EllipselementProps) {
  return <Ellipse radiusX={element.radiusX} radiusY={element.radiusY} x={element.centerX} y={element.centerY} stroke="red" strokeWidth={3} />;
}
