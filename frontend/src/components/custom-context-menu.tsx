import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "./ui/context-menu";
import { Button } from "./ui/button";

export type CustomContextMenuProps = {
  items: { label: string; onClick: () => void }[];
  trigger: React.ReactNode;
};

export const CustomContextMenu = ({
  items,
  trigger,
}: CustomContextMenuProps) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            const event = new MouseEvent("contextmenu", {
              bubbles: true,
              cancelable: true,
              clientX: e.clientX,
              clientY: e.clientY,
            });
            e.currentTarget.dispatchEvent(event);
          }}
        >
          {trigger}
        </Button>
      </ContextMenuTrigger>
      <ContextMenuContent>
        {items.map((item, index) => (
          <ContextMenuItem key={index} onClick={item.onClick}>
            {item.label}
          </ContextMenuItem>
        ))}
      </ContextMenuContent>
    </ContextMenu>
  );
};
