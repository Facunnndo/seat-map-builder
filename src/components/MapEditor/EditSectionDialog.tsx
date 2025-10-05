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
  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(200);
  const [rotation, setRotation] = useState(0);
  const [curve, setCurve] = useState(0);

  useEffect(() => {
    if (section) {
      setLabel(section.label);
      setColor(section.color);
      setWidth(section.width || 300);
      setHeight(section.height || 200);
      setRotation(section.rotation || 0);
      setCurve(section.curve || 0);
    }
  }, [section]);

  const handleSave = () => {
    if (!label.trim()) {
      toast.error("El nombre de la sección es obligatorio");
      return;
    }

    updateSection(sectionId, { 
      label: label.trim(), 
      color,
      width,
      height,
      rotation,
      curve
    });
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

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="width">Ancho</Label>
              <Input
                id="width"
                type="number"
                min="100"
                max="800"
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="height">Alto</Label>
              <Input
                id="height"
                type="number"
                min="100"
                max="600"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="rotation">Rotación: {rotation}°</Label>
            <Input
              id="rotation"
              type="range"
              min="0"
              max="360"
              value={rotation}
              onChange={(e) => setRotation(Number(e.target.value))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="curve">Curvatura: {curve}%</Label>
            <Input
              id="curve"
              type="range"
              min="0"
              max="100"
              value={curve}
              onChange={(e) => setCurve(Number(e.target.value))}
            />
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
