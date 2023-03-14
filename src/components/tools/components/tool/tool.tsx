import cn from "classnames";
import { useStore } from "store";
import { Tool as ToolEnum } from "types/tools";

interface ToolProps {
  name: string;
  tool: ToolEnum;
}

export function Tool({ name, tool }: ToolProps) {
  const selectedTool = useStore((store) => store.selectedTool);
  const setSelectedTool = useStore((store) => store.setSelectedTool);

  return (
    <div
      className={cn("flex items-center justify-center w-full aspect-square border rounded-md cursor-pointer", {
        ["bg-blue-100 border-2 border-black"]: selectedTool === tool,
      })}
      onClick={() => setSelectedTool(tool)}
    >
      {name}
    </div>
  );
}
