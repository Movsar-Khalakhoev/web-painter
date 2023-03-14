import { Line } from "react-konva";
import { FreeDrawnElement as FreeDrawnElementType } from "types/element";

interface FreeDrawnElementProps {
  element: FreeDrawnElementType;
}

export function FreeDrawnElement({ element }: FreeDrawnElementProps) {
  return <Line points={element.points} stroke="#df4b26" strokeWidth={5} tension={0.5} lineCap="round" lineJoin="round" globalCompositeOperation={"source-over"} />;
}
