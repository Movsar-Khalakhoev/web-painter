import { Element } from "components/element";
import { NewElement } from "components/new-element";
import Konva from "konva";
import { RefObject, useRef } from "react";
import { Ellipse, Layer, Rect, Stage } from "react-konva";
import { useStore } from "store";
import { Tool } from "types/tools";

interface CanvasProps {
  stageRef: RefObject<Konva.Stage>;
}

export function Canvas({ stageRef }: CanvasProps) {
  const drawnElements = useStore((store) => store.drawnElements);
  const selectedTool = useStore((store) => store.selectedTool);

  return (
    <div className="h-full w-full">
      <Stage ref={stageRef} width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Rect x={0} y={0} width={window.innerWidth} height={window.innerHeight} fill="white" />
          {drawnElements.map((element) => (
            <Element key={element.id} element={element} />
          ))}
        </Layer>
        {selectedTool !== Tool.Cursor && <NewElement stageRef={stageRef} />}
      </Stage>
    </div>
  );
}
