import { Element } from "components/element";
import { NewElement } from "components/new-element";
import Konva from "konva";
import { useRef } from "react";
import { Layer, Stage } from "react-konva";
import { useStore } from "store";

export function Canvas() {
  const drawnElements = useStore((store) => store.drawnElements);
  const stageRef = useRef<Konva.Stage>(null);

  console.log(drawnElements);

  return (
    <div className="h-full w-full">
      <Stage ref={stageRef} width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          {drawnElements.map((element) => (
            <Element key={element.id} element={element} />
          ))}
        </Layer>
        <NewElement stageRef={stageRef} />
      </Stage>
    </div>
  );
}
