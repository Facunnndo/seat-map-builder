import { Section } from "@/store/mapStore";
import { useMapStore } from "@/store/mapStore";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

interface SeatGridProps {
  section: Section;
}

export const SeatGrid = ({ section }: SeatGridProps) => {
  const { toggleSeatOccupancy, deleteRow } = useMapStore();

  const handleDeleteRow = (rowId: string, rowLabel: string) => {
    deleteRow(section.id, rowId);
    toast.success(`Fila "${rowLabel}" eliminada`);
  };

  return (
    <div className="space-y-2">
      {section.rows.map((row) => (
        <div key={row.id} className="flex items-center gap-2">
          <div className="w-12 text-xs font-medium text-muted-foreground text-right">
            {row.label}
          </div>
          <div className="flex gap-1 flex-1">
            {row.seats.map((seat) => (
              <button
                key={seat.id}
                onClick={() => toggleSeatOccupancy(section.id, row.id, seat.id)}
                className={`w-6 h-6 rounded text-xs font-medium transition-all hover:scale-110 ${
                  seat.occupied
                    ? "bg-destructive text-destructive-foreground"
                    : "bg-success text-success-foreground"
                }`}
                title={`${seat.label} - ${seat.occupied ? "Ocupado" : "Disponible"}`}
              >
                {seat.label.slice(-1)}
              </button>
            ))}
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>¿Eliminar fila?</AlertDialogTitle>
                <AlertDialogDescription>
                  Se eliminará la fila "{row.label}" con {row.seats.length} asientos. Esta acción no se puede deshacer.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => handleDeleteRow(row.id, row.label)}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Eliminar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      ))}
    </div>
  );
};
