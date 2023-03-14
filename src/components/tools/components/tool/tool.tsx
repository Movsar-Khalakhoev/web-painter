import cn from "classnames";
import { DetailedHTMLProps, HTMLAttributes, MouseEvent, PropsWithChildren, useState } from "react";
import { ContentRenderer, Popover } from "react-tiny-popover";
import { useStore } from "store";
import { Tool as ToolEnum } from "types/tools";

interface ToolProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  name: string;
  tool?: ToolEnum;
  isPopover?: boolean;
  PopoverContent?: ContentRenderer;
}

export function Tool({ name, tool, isPopover, PopoverContent, ...props }: ToolProps) {
  const selectedTool = useStore((store) => store.selectedTool);
  const setSelectedTool = useStore((store) => store.setSelectedTool);
  const [isPopoverOpened, setIsPopoverOpened] = useState(false);

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    props.onClick?.(event);
    if (isPopover) setIsPopoverOpened((prev) => !prev);
    else if (tool) setSelectedTool(tool);
  };

  const button = (
    <div
      {...props}
      className={cn("flex items-center justify-center w-full aspect-square border rounded-md cursor-pointer", props.className, {
        ["bg-blue-100 border-2 border-black"]: selectedTool === tool || isPopoverOpened,
      })}
      onClick={handleClick}
    >
      {name}
    </div>
  );

  if (isPopover && PopoverContent) {
    return (
      <Popover isOpen={isPopoverOpened} positions={["right"]} content={PopoverContent} padding={10}>
        {button}
      </Popover>
    );
  }

  return button;
}
