import Konva from "konva";
import { RefObject, useEffect } from "react";

interface UseStageEventsOptions {
  stageRef: RefObject<Konva.Stage>;
  onMouseDown: (event: Konva.KonvaEventObject<MouseEvent>) => void;
  onMouseMove: (event: Konva.KonvaEventObject<MouseEvent>) => void;
  onMouseUp: (event: Konva.KonvaEventObject<MouseEvent>) => void;
}

export function useStageEvents({ stageRef, onMouseDown, onMouseMove, onMouseUp }: UseStageEventsOptions) {
  useEffect(() => {
    if (stageRef.current) {
      stageRef.current.addEventListener("mousedown", onMouseDown as any);
      stageRef.current.addEventListener("mousemove", onMouseMove as any);
      stageRef.current.addEventListener("mouseup", onMouseUp as any);

      return () => {
        stageRef.current?.removeEventListener("mousedown");
        stageRef.current?.removeEventListener("mousemove");
        stageRef.current?.removeEventListener("mouseup");
      };
    }
  }, [onMouseDown, onMouseMove]);
}
