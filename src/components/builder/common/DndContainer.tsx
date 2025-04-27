import { FormField } from "@/types/form";
import React, { useCallback, useState } from "react";
import {
  DndContext,
  closestCenter,
  useSensors,
  useSensor,
  DragOverlay,
  DragEndEvent,
  MouseSensor,
  KeyboardSensor,
  TouchSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

const DndContainer = ({
  items,
  children,
  moveItem,
}: React.PropsWithChildren<{
  items: FormField[];
  moveItem: (from: number, to: number) => void;
}>) => {
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 300,
        tolerance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const [active, setActive] = useState<string>("");

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (active && over && active.id !== over.id) {
        const oldIndex = items.findIndex((item) => item.id === active.id),
          newIndex = items.findIndex((item) => item.id === over.id);

        moveItem(oldIndex, newIndex);
      }
    },
    [items, moveItem]
  );

  const handleDragStart = useCallback((event: DragEndEvent) => {
    const { active } = event;

    if (active && active.id) setActive(active.id as string);
  }, []);

  const getLabel = useCallback(() => {
    return items.find((item) => item.id === active)?.label;
  }, [items, active]);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
      <DragOverlay>
        <div>{getLabel()}</div>
      </DragOverlay>
    </DndContext>
  );
};

export default DndContainer;
