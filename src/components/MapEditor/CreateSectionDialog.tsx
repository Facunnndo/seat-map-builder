"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMapStore } from "@/store/mapStore";
import { toast } from "sonner";

interface CreateSectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PRESET_COLORS = [
  "#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981", "#06b6d4", "#6366f1", "#f97316",
];

export const CreateSectionDialog = ({ open, onOpenChange }: CreateSectionDialogProps) => {
  const { addSection } = useMapStore();
  const [label, setLabel] = useState("");
  const [color, setColor] = useState(PRESET_COLORS[0]);

  const handleCreate = () => {
    if (!label.trim()) {
      toast.error("El nombre de la sección es obligatorio");
      return;
    }

    addSection({
      id: crypto.randomUUID(),
      label: label.trim(),
      color,
      rows: [],
      position: { x: 100, y: 100 },
      rotation: 0,
    });

    toast.success("Sección creada");
    setLabel("");
    setColor(PRESET_COLORS[0]);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nueva Sección</DialogTitle>
          <DialogDescription>
            Crea una nueva sección para tu mapa de asientos
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="label">Nombre de la sección</Label>
            <Input
              id="label"
              placeholder="Ej: Platea A"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCreate()}
            />
          </div>

          <div className="space-y-2">
            <Label>Color</Label>
            <div className="flex gap-2 flex-wrap">
              {PRESET_COLORS.map((presetColor) => (
                <button
                  key={presetColor}
                  className={`w-10 h-10 rounded-lg border-2 transition-all hover:scale-110 ${
                    color === presetColor ? "border-primary ring-2 ring-primary/30" : "border-border"
                  }`}
                  style={{ backgroundColor: presetColor }}
                  onClick={() => setColor(presetColor)}
                />
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleCreate}>Crear Sección</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
