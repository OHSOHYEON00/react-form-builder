import { useSortable } from "@dnd-kit/sortable";
import React, { useMemo } from "react";
import { CSS } from "@dnd-kit/utilities";
import { AlignJustify } from "lucide-react";

const SortableItemContainer = ({
  id = "",
  children,
}: React.PropsWithChildren<{
  id?: string;
}>) => {
  const { attributes, transform, listeners, isDragging, setNodeRef } =
    useSortable({ id, disabled: id ? false : true });

  const style = useMemo(
    () => ({
      transform: CSS.Transform.toString(transform),
      opacity: isDragging ? 0.5 : 1,
      cursor: "grab",
    }),
    [isDragging, transform]
  );

  if (!id) return <>{children}</>;

  return (
    <div
      ref={setNodeRef}
      {...style}
      className="w-full flex-row flex md:items-center items-start justify-between"
    >
      <span
        className="cursor-grab mr-4 mb-[1.25rem]"
        {...attributes}
        {...listeners}
      >
        <AlignJustify className="size-3.5" />
      </span>
      {children}
    </div>
  );
};

export default SortableItemContainer;
