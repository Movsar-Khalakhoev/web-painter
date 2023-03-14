import { Line } from "react-konva";
import { FreeDrawnElement as FreeDrawnElementType } from "types/element";

interface FreeDrawnElementProps {
  element: FreeDrawnElementType;
}

export function FreeDrawnElement({ element }: FreeDrawnElementProps) {
  return (
    <Line
      points={element.points}
      stroke={element.strokeColor}
      strokeWidth={element.strokeWidth}
      tension={0.5}
      lineCap="round"
      lineJoin="round"
      globalCompositeOperation={"source-over"}
    />
  );
}
