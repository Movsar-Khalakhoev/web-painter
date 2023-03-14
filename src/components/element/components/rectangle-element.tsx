import { Rect } from "react-konva";
import { RectangleElement as RectangleElementType } from "types/element";

interface RectangleElementProps {
  element: RectangleElementType;
}

export function RectangleElement({ element }: RectangleElementProps) {
  return <Rect x={element.x} y={element.y} width={element.width} height={element.height} stroke={element.strokeColor} strokeWidth={element.strokeWidth} />;
}
