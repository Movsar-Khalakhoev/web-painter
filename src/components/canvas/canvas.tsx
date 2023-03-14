import { Element } from "components/element";
import { NewElement } from "components/new-element";
import Konva from "konva";
import { useRef } from "react";
import { Ellipse, Layer, Stage } from "react-konva";
import { useStore } from "store";
import { Tool } from "types/tools";

export function Canvas() {
  const drawnElements = useStore((store) => store.drawnElements);
  const selectedTool = useStore((store) => store.selectedTool);
  const stageRef = useRef<Konva.Stage>(null);

  console.log(drawnElements);

  return (
    <div className="h-full w-full">
      <Stage ref={stageRef} width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          {drawnElements.map((element) => (
            <Element key={element.id} element={element} />
          ))}
          <Ellipse x={0} y={0} offsetX={-50} offsetY={-50} radiusX={50} radiusY={50} stroke="red" />
        </Layer>
        {selectedTool !== Tool.Cursor && <NewElement stageRef={stageRef} />}
      </Stage>
    </div>
  );
}
