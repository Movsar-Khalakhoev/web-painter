import { Canvas } from "components/canvas";
import { Tools } from "components/tools";
import Konva from "konva";
import { useRef } from "react";

function App() {
  const stageRef = useRef<Konva.Stage>(null);

  return (
    <div className="app">
      <Tools stageRef={stageRef} />
      <Canvas stageRef={stageRef} />
    </div>
  );
}

export default App;
