import { Section } from "@/store/mapStore";
import { useMapStore } from "@/store/mapStore";
import { useState, useRef, useEffect } from "react";
import { SeatGrid } from "./SeatGrid";

interface SectionCardProps {
  section: Section;
}

export const SectionCard = ({ section }: SectionCardProps) => {
  const { updateSection, selectedSectionId, setSelectedSection } = useMapStore();
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    setDragStart({
      x: e.clientX - section.position.x,
      y: e.clientY - section.position.y,
    });
    setSelectedSection(section.id);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        updateSection(section.id, {
          position: {
            x: e.clientX - dragStart.x,
            y: e.clientY - dragStart.y,
          },
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, dragStart, section.id, updateSection]);

  const isSelected = selectedSectionId === section.id;

  return (
    <div
      ref={cardRef}
      className={`absolute bg-card rounded-lg shadow-elegant border-2 transition-all ${
        isSelected ? "border-primary ring-4 ring-primary/20" : "border-border"
      }`}
      style={{
        left: section.position.x,
        top: section.position.y,
        cursor: isDragging ? "grabbing" : "grab",
      }}
      onMouseDown={handleMouseDown}
    >
      <div
        className="px-4 py-2 rounded-t-lg border-b border-border flex items-center justify-between"
        style={{
          backgroundColor: section.color,
          color: "#fff",
        }}
      >
        <h3 className="font-semibold text-sm">{section.label}</h3>
        <span className="text-xs opacity-90">
          {section.rows.reduce((acc, row) => acc + row.seats.length, 0)} asientos
        </span>
      </div>

      <div className="p-4">
        {section.rows.length === 0 ? (
          <div className="text-center text-muted-foreground text-sm py-8">
            No hay filas aún
          </div>
        ) : (
          <SeatGrid section={section} />
        )}
      </div>
    </div>
  );
};
