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

interface CreateRowDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sectionId: string;
}

export const CreateRowDialog = ({ open, onOpenChange, sectionId }: CreateRowDialogProps) => {
  const { addRow } = useMapStore();
  const [rowLabel, setRowLabel] = useState("");
  const [seatCount, setSeatCount] = useState(10);
  const [seatPrefix, setSeatPrefix] = useState("");

  const handleCreate = () => {
    if (!rowLabel.trim()) {
      toast.error("El nombre de la fila es obligatorio");
      return;
    }

    if (seatCount < 1 || seatCount > 100) {
      toast.error("El número de asientos debe estar entre 1 y 100");
      return;
    }

    const seats = Array.from({ length: seatCount }, (_, i) => ({
      id: crypto.randomUUID(),
      label: seatPrefix ? `${seatPrefix}${i + 1}` : `${rowLabel}${i + 1}`,
      x: i * 30,
      y: 0,
      occupied: false,
    }));

    addRow(sectionId, {
      id: crypto.randomUUID(),
      label: rowLabel.trim(),
      seats,
    });

    toast.success(`Fila creada con ${seatCount} asientos`);
    setRowLabel("");
    setSeatCount(10);
    setSeatPrefix("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nueva Fila</DialogTitle>
          <DialogDescription>
            Crea una nueva fila con asientos para esta sección
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="rowLabel">Nombre de la fila</Label>
            <Input
              id="rowLabel"
              placeholder="Ej: Fila A"
              value={rowLabel}
              onChange={(e) => setRowLabel(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="seatCount">Cantidad de asientos</Label>
            <Input
              id="seatCount"
              type="number"
              min="1"
              max="100"
              value={seatCount}
              onChange={(e) => setSeatCount(parseInt(e.target.value) || 0)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="seatPrefix">Prefijo para asientos (opcional)</Label>
            <Input
              id="seatPrefix"
              placeholder="Ej: A (generará A1, A2, ...)"
              value={seatPrefix}
              onChange={(e) => setSeatPrefix(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Si no se especifica, se usará el nombre de la fila como prefijo
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleCreate}>Crear Fila</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
