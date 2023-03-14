import { useStageEvents } from "../hooks/use-stage-events";
import Konva from "konva";
import { RefObject, useRef, useState } from "react";
import { Line } from "react-konva";
import { useStore } from "store";
import { ElementType } from "types/element";
import { uniqueId } from "utils/unique-id";

interface ILine {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

interface NewLineElementProps {
  stageRef: RefObject<Konva.Stage>;
}

export function NewLineElement({ stageRef }: NewLineElementProps) {
  const addDrawnElement = useStore((store) => store.addDrawnElement);
  const [line, setLine] = useState<ILine>();
  const isDrawing = useRef(false);
  useStageEvents({ stageRef, onMouseDown: handleMouseDown, onMouseMove: handleMouseMove, onMouseUp: handleMouseUp });

  function handleMouseDown() {
    if (!stageRef.current) return;

    isDrawing.current = true;
    const pos = stageRef.current.getPointerPosition();
    if (pos) setLine({ startX: pos.x, startY: pos.y, endX: pos.x, endY: pos.y });
  }

  function handleMouseMove() {
    if (!isDrawing.current) return;
    if (!stageRef.current) return;

    const pos = stageRef.current.getPointerPosition();

    if (!pos) return;

    setLine((line) => {
      if (!line) return undefined;

      return { ...line, endX: pos.x, endY: pos.y };
    });
  }

  function handleMouseUp() {
    isDrawing.current = false;
    setLine((line) => {
      if (!line) return undefined;
      addDrawnElement({
        id: uniqueId(),
        type: ElementType.Line,
        ...line,
      });
      return undefined;
    });
  }

  if (!line) return null;

  return <Line points={[line.startX, line.startY, line.endX, line.endY]} stroke="red" />;
}
