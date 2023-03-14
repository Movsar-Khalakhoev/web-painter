import { useStageEvents } from "../hooks/use-stage-events";
import Konva from "konva";
import { RefObject, useCallback, useRef, useState } from "react";
import { Ellipse } from "react-konva";
import { useStore } from "store";
import { ElementType } from "types/element";
import { pythagorean } from "utils/pythagorean";
import { uniqueId } from "utils/unique-id";

interface IEllipse {
  startX: number;
  startY: number;
  centerX: number;
  centerY: number;
  endX: number;
  endY: number;
  radiusX: number;
  radiusY: number;
}

interface NewEllipseElementProps {
  stageRef: RefObject<Konva.Stage>;
}

export function NewEllipseElement({ stageRef }: NewEllipseElementProps) {
  const addDrawnElement = useStore((store) => store.addDrawnElement);
  const selectedStrokeColor = useStore((store) => store.selectedStrokeColor);
  const selectedStrokeWidth = useStore((store) => store.selectedStrokeWidth);
  const [ellipse, setEllipse] = useState<IEllipse>();
  const isDrawing = useRef(false);

  const handleMouseDown = useCallback(() => {
    if (!stageRef.current) return;

    isDrawing.current = true;
    const pos = stageRef.current.getPointerPosition();
    if (pos) setEllipse({ startX: pos.x, startY: pos.y, centerX: pos.x, centerY: pos.y, endX: pos.x, endY: pos.y, radiusX: 0, radiusY: 0 });
  }, []);

  const handleMouseMove = useCallback(() => {
    if (!isDrawing.current) return;
    if (!stageRef.current) return;

    const pos = stageRef.current.getPointerPosition();

    if (!pos) return;

    setEllipse((ellipse) => {
      if (!ellipse) return ellipse;
      const startX = Math.min(ellipse.startX, pos.x);
      const startY = Math.min(ellipse.startY, pos.y);
      const endX = Math.max(ellipse.startX, pos.x);
      const endY = Math.max(ellipse.startY, pos.y);
      const radiusX = (endX - startX) / 2;
      const radiusY = (endY - startY) / 2;

      return {
        startX: ellipse.startX,
        startY: ellipse.startY,
        centerX: startX + radiusX,
        centerY: startY + radiusY,
        endX,
        endY,
        radiusX,
        radiusY,
      };
    });
  }, []);

  const handleMouseUp = useCallback(() => {
    isDrawing.current = false;
    setEllipse((ellipse) => {
      if (!ellipse) return undefined;
      addDrawnElement({
        id: uniqueId(),
        type: ElementType.Ellipse,
        ...ellipse,
        strokeColor: selectedStrokeColor,
        strokeWidth: selectedStrokeWidth,
      });
      return undefined;
    });
  }, [selectedStrokeColor, selectedStrokeWidth]);

  useStageEvents({ stageRef, onMouseDown: handleMouseDown, onMouseMove: handleMouseMove, onMouseUp: handleMouseUp });

  if (!ellipse) return null;

  return <Ellipse radiusX={ellipse.radiusX} radiusY={ellipse.radiusY} x={ellipse.centerX} y={ellipse.centerY} stroke={selectedStrokeColor} strokeWidth={selectedStrokeWidth} />;
}
