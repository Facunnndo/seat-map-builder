"use client";

import { useMapStore } from "@/store/mapStore";
import { SectionCard } from "./SectionCard";
import { useRef, useState, useEffect } from "react";

export const Canvas = () => {
  const { mapData } = useMapStore();
  const canvasRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [startPan, setStartPan] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const delta = e.deltaY * -0.001;
        setScale((s) => Math.min(Math.max(0.5, s + delta), 2));
      }
    };

    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener("wheel", handleWheel, { passive: false });
      return () => canvas.removeEventListener("wheel", handleWheel);
    }
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 1 || (e.button === 0 && e.shiftKey)) {
      setIsPanning(true);
      setStartPan({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isPanning) {
      setPan({
        x: e.clientX - startPan.x,
        y: e.clientY - startPan.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  return (
    <div
      ref={canvasRef}
      className="flex-1 bg-muted overflow-hidden relative"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{ cursor: isPanning ? "grabbing" : "default" }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--border)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
          backgroundPosition: `${pan.x}px ${pan.y}px`,
        }}
      />

      <div
        className="relative"
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
          transformOrigin: "0 0",
        }}
      >
        {mapData.sections.map((section) => (
          <SectionCard key={section.id} section={section} />
        ))}
      </div>

      <div className="absolute bottom-4 right-4 bg-card border border-border rounded-lg p-2 shadow-card text-xs text-muted-foreground">
        Zoom: {Math.round(scale * 100)}% | Ctrl + Scroll para zoom | Shift + Click para pan
      </div>
    </div>
  );
};
