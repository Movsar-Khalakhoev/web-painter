import { useStageEvents } from "../hooks/use-stage-events";
import Konva from "konva";
import { RefObject, useCallback, useRef, useState } from "react";
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
  const selectedStrokeColor = useStore((store) => store.selectedStrokeColor);
  const selectedStrokeWidth = useStore((store) => store.selectedStrokeWidth);
  const [line, setLine] = useState<ILine>();
  const isDrawing = useRef(false);

  const handleMouseDown = useCallback(() => {
    if (!stageRef.current) return;

    isDrawing.current = true;
    const pos = stageRef.current.getPointerPosition();
    if (pos) setLine({ startX: pos.x, startY: pos.y, endX: pos.x, endY: pos.y });
  }, []);

  const handleMouseMove = useCallback(() => {
    if (!isDrawing.current) return;
    if (!stageRef.current) return;

    const pos = stageRef.current.getPointerPosition();

    if (!pos) return;

    setLine((line) => {
      if (!line) return undefined;

      return { ...line, endX: pos.x, endY: pos.y };
    });
  }, []);

  const handleMouseUp = useCallback(() => {
    isDrawing.current = false;
    setLine((line) => {
      if (!line) return undefined;
      addDrawnElement({
        id: uniqueId(),
        type: ElementType.Line,
        ...line,
        strokeColor: selectedStrokeColor,
        strokeWidth: selectedStrokeWidth,
      });
      return undefined;
    });
  }, [selectedStrokeColor, selectedStrokeWidth]);

  useStageEvents({ stageRef, onMouseDown: handleMouseDown, onMouseMove: handleMouseMove, onMouseUp: handleMouseUp });

  if (!line) return null;

  return <Line points={[line.startX, line.startY, line.endX, line.endY]} stroke={selectedStrokeColor} strokeWidth={selectedStrokeWidth} />;
}
