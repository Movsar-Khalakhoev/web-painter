import { Tool } from "./components/tool";
import cn from "classnames";
import Konva from "konva";
import { RefObject } from "react";
import { useStore } from "store";
import { Tool as ToolEnum } from "types/tools";
import { downloadURI } from "utils/download-uri";

interface ToolsProps {
  stageRef: RefObject<Konva.Stage>;
}

export function Tools({ stageRef }: ToolsProps) {
  const selectedStrokeWidth = useStore((store) => store.selectedStrokeWidth);
  const setSelectedStrokeWidth = useStore((store) => store.setSelectedStrokeWidth);
  const selectedColor = useStore((store) => store.selectedStrokeColor);
  const setSelectedColor = useStore((store) => store.setSelectedStrokeColor);

  function takeSnapshot() {
    if (!stageRef.current) return;

    downloadURI(stageRef.current.toDataURL(), "canvas.jpg");
  }

  return (
    <div className="flex flex-col gap-1 fixed left-3 top-1/2 -translate-y-1/2 w-12 shadow-xl border rounded-lg p-1 z-10">
      <Tool name="курсор" tool={ToolEnum.Cursor} />
      <Tool name="круг" tool={ToolEnum.Ellipse} />
      <Tool name="прямоугольник" tool={ToolEnum.Rectangle} />
      <Tool name="линия" tool={ToolEnum.Line} />
      <Tool name="кисть" tool={ToolEnum.Brush} />
      <Tool
        name="толщина"
        isPopover
        PopoverContent={() => (
          <div className="flex flex-col gap-1 p-2 bg-white shadow-xl border rounded-lg">
            {[1, 2, 3, 5, 10].map((width) => (
              <div
                key={width}
                className={cn("flex items-center justify-center border rounded-md w-6 h-6 cursor-pointer", {
                  ["bg-blue-100 border-2 border-black"]: selectedStrokeWidth === width,
                })}
                onClick={() => setSelectedStrokeWidth(width)}
              >
                {width}
              </div>
            ))}
          </div>
        )}
      />
      <input type="color" className="w-full" value={selectedColor} onChange={(event) => setSelectedColor(event.target.value)} />
      <Tool name="скачать" onClick={takeSnapshot} />
    </div>
  );
}
