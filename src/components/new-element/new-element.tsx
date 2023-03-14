import { NewEllipseElement } from "./components/new-ellipse-element";
import { NewFreeDrawingElement } from "./components/new-free-drawing-element";
import { NewRectangleElement } from "./components/new-rectangle-element";
import Konva from "konva";
import { RefObject } from "react";
import { Layer, Stage } from "react-konva";
import { useStore } from "store";
import { Tool } from "types/tools";

interface NewElementProps {
  stageRef: RefObject<Konva.Stage>;
}

export function NewElement({ stageRef }: NewElementProps) {
  const selectedTool = useStore((store) => store.selectedTool);

  return (
    <Layer>
      {selectedTool === Tool.Brush && <NewFreeDrawingElement stageRef={stageRef} />}
      {selectedTool === Tool.Ellipse && <NewEllipseElement stageRef={stageRef} />}
      {selectedTool === Tool.Rectangle && <NewRectangleElement stageRef={stageRef} />}
    </Layer>
  );
}
