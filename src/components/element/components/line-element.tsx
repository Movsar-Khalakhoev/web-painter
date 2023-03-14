import { Line } from "react-konva";
import { LineElement as LineElementType } from "types/element";

interface LineElementProps {
  element: LineElementType;
}

export function LineElement({ element }: LineElementProps) {
  return <Line points={[element.startX, element.startY, element.endX, element.endY]} stroke="red" />;
}
