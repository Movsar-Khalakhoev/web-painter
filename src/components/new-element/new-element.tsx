import { NewFreeDrawingElement } from "./components/new-free-drawing-element/new-free-drawing-element";
import Konva from "konva";
import { RefObject } from "react";
import { Layer, Stage } from "react-konva";
import { useStore } from "store";

interface NewElementProps {
  stageRef: RefObject<Konva.Stage>;
}

export function NewElement({ stageRef }: NewElementProps) {
  const selectedTool = useStore((store) => store.selectedTool);

  return (
    <Layer>
      <NewFreeDrawingElement stageRef={stageRef} />
    </Layer>
  );
}
