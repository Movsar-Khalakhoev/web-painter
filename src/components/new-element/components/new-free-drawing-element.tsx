import { useStageEvents } from "../hooks/use-stage-events";
import Konva from "konva";
import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import { Line } from "react-konva";
import { useStore } from "store";
import { ElementType } from "types/element";
import { uniqueId } from "utils/unique-id";

interface NewFreeDrawingElementProps {
  stageRef: RefObject<Konva.Stage>;
}

export function NewFreeDrawingElement({ stageRef }: NewFreeDrawingElementProps) {
  const addDrawnElement = useStore((store) => store.addDrawnElement);
  const selectedStrokeColor = useStore((store) => store.selectedStrokeColor);
  const selectedStrokeWidth = useStore((store) => store.selectedStrokeWidth);
  const [points, setPoints] = useState<number[]>([]);
  const isDrawing = useRef(false);

  const handleMouseDown = useCallback(() => {
    if (!stageRef.current) return;

    isDrawing.current = true;
    const pos = stageRef.current.getPointerPosition();
    if (pos) setPoints((points) => [...points, pos.x, pos.y]);
  }, []);

  const handleMouseMove = useCallback(() => {
    if (!isDrawing.current) return;
    if (!stageRef.current) return;

    const pos = stageRef.current.getPointerPosition();

    if (!pos) return;

    setPoints((points) => [...points, pos.x, pos.y]);
  }, []);

  const handleMouseUp = useCallback(() => {
    isDrawing.current = false;
    setPoints((points) => {
      addDrawnElement({
        id: uniqueId(),
        type: ElementType.FreeDrawn,
        points,
        strokeColor: selectedStrokeColor,
        strokeWidth: selectedStrokeWidth,
      });
      return [];
    });
  }, [selectedStrokeColor, selectedStrokeWidth]);

  useStageEvents({ stageRef, onMouseDown: handleMouseDown, onMouseMove: handleMouseMove, onMouseUp: handleMouseUp });

  return (
    <Line points={points} stroke={selectedStrokeColor} strokeWidth={selectedStrokeWidth} tension={0.5} lineCap="round" lineJoin="round" globalCompositeOperation={"source-over"} />
  );
}
