"use client";

import { useState, useEffect } from "react";
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

interface EditSectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sectionId: string;
}

const PRESET_COLORS = [
  "#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981", "#06b6d4", "#6366f1", "#f97316",
];

export const EditSectionDialog = ({ open, onOpenChange, sectionId }: EditSectionDialogProps) => {
  const { mapData, updateSection } = useMapStore();
  const section = mapData.sections.find((s) => s.id === sectionId);
  
  const [label, setLabel] = useState("");
  const [color, setColor] = useState(PRESET_COLORS[0]);

  useEffect(() => {
    if (section) {
      setLabel(section.label);
      setColor(section.color);
    }
  }, [section]);

  const handleSave = () => {
    if (!label.trim()) {
      toast.error("El nombre de la sección es obligatorio");
      return;
    }

    updateSection(sectionId, { label: label.trim(), color });
    toast.success("Sección actualizada");
    onOpenChange(false);
  };

  if (!section) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Sección</DialogTitle>
          <DialogDescription>
            Modifica los datos de la sección
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
              onKeyDown={(e) => e.key === "Enter" && handleSave()}
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
          <Button onClick={handleSave}>Guardar Cambios</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
