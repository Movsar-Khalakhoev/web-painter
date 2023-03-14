import Konva from "konva";
import { RefObject, useEffect, useRef, useState } from "react";
import { Line } from "react-konva";
import { useStore } from "store";
import { ElementType } from "types/element";
import { uniqueId } from "utils/unique-id";

interface NewFreeDrawingElementProps {
  stageRef: RefObject<Konva.Stage>;
}

export function NewFreeDrawingElement({ stageRef }: NewFreeDrawingElementProps) {
  const addDrawnElement = useStore((store) => store.addDrawnElement);
  const [points, setPoints] = useState<number[]>([]);
  const isDrawing = useRef(false);

  const handleMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (!stageRef.current) return;

    isDrawing.current = true;
    const pos = stageRef.current.getPointerPosition();
    if (pos) setPoints((points) => [...points, pos.x, pos.y]);
  };

  const handleMouseMove = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (!isDrawing.current) return;
    if (!stageRef.current) return;

    const pos = stageRef.current.getPointerPosition();

    if (!pos) return;

    setPoints((points) => [...points, pos.x, pos.y]);
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
    setPoints((points) => {
      addDrawnElement({
        id: uniqueId(),
        type: ElementType.FreeDrawn,
        points,
      });
      return [];
    });
  };

  useEffect(() => {
    if (stageRef.current) {
      stageRef.current.addEventListener("mousedown", handleMouseDown as any);
      stageRef.current.addEventListener("mousemove", handleMouseMove as any);
      stageRef.current.addEventListener("mouseup", handleMouseUp as any);

      return () => {
        stageRef.current?.removeEventListener("mousedown");
        stageRef.current?.removeEventListener("mousemove");
        stageRef.current?.removeEventListener("mouseup");
      };
    }
  }, []);

  return <Line points={points} stroke="#df4b26" strokeWidth={5} tension={0.5} lineCap="round" lineJoin="round" globalCompositeOperation={"source-over"} />;
}
