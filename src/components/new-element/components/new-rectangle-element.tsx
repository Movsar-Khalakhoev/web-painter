import { useStageEvents } from "../hooks/use-stage-events";
import Konva from "konva";
import { RefObject, useCallback, useRef, useState } from "react";
import { Rect } from "react-konva";
import { useStore } from "store";
import { ElementType } from "types/element";
import { uniqueId } from "utils/unique-id";

interface IRectangle {
  startX: number;
  startY: number;
  x: number;
  y: number;
  height: number;
  width: number;
}

interface NewRectangleElementProps {
  stageRef: RefObject<Konva.Stage>;
}

export function NewRectangleElement({ stageRef }: NewRectangleElementProps) {
  const addDrawnElement = useStore((store) => store.addDrawnElement);
  const selectedStrokeColor = useStore((store) => store.selectedStrokeColor);
  const selectedStrokeWidth = useStore((store) => store.selectedStrokeWidth);
  const [rectangle, setRectangle] = useState<IRectangle>();
  const isDrawing = useRef(false);

  const handleMouseDown = useCallback(() => {
    if (!stageRef.current) return;

    isDrawing.current = true;
    const pos = stageRef.current.getPointerPosition();
    if (pos) setRectangle({ startX: pos.x, startY: pos.y, x: pos.x, y: pos.y, height: 0, width: 0 });
  }, []);

  const handleMouseMove = useCallback(() => {
    if (!isDrawing.current) return;
    if (!stageRef.current) return;

    const pos = stageRef.current.getPointerPosition();

    if (!pos) return;

    setRectangle((rectangle) => {
      if (!rectangle) return rectangle;
      const x = Math.min(rectangle.startX, pos.x);
      const y = Math.min(rectangle.startY, pos.y);

      return {
        startX: rectangle.startX,
        startY: rectangle.startY,
        x,
        y,
        width: Math.max(rectangle.startX, pos.x) - x,
        height: Math.max(rectangle.startY, pos.y) - y,
      };
    });
  }, []);

  const handleMouseUp = useCallback(() => {
    isDrawing.current = false;
    setRectangle((rectangle) => {
      if (!rectangle) return undefined;
      addDrawnElement({
        id: uniqueId(),
        type: ElementType.Rectangle,
        ...rectangle,
        strokeColor: selectedStrokeColor,
        strokeWidth: selectedStrokeWidth,
      });
      return undefined;
    });
  }, [selectedStrokeColor, selectedStrokeWidth]);

  useStageEvents({ stageRef, onMouseDown: handleMouseDown, onMouseMove: handleMouseMove, onMouseUp: handleMouseUp });

  if (!rectangle) return null;

  return <Rect x={rectangle.x} y={rectangle.y} width={rectangle.width} height={rectangle.height} stroke={selectedStrokeColor} strokeWidth={selectedStrokeWidth} />;
}
