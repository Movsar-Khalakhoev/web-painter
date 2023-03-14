import { Tool } from "./components/tool";
import { Tool as ToolEnum } from "types/tools";

export function Tools() {
  return (
    <div className="flex flex-col gap-1 fixed left-2 top-1/2 -translate-y-1/2 w-12 shadow-xl border rounded-lg p-1">
      <Tool name="курсор" tool={ToolEnum.Cursor} />
      <Tool name="круг" tool={ToolEnum.Circle} />
      <Tool name="прямоугольник" tool={ToolEnum.Rectangle} />
      <Tool name="линия" tool={ToolEnum.Line} />
      <Tool name="кисть" tool={ToolEnum.Brush} />
    </div>
  );
}
