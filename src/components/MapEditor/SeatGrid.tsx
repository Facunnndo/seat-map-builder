import { Section } from "@/store/mapStore";
import { useMapStore } from "@/store/mapStore";

interface SeatGridProps {
  section: Section;
}

export const SeatGrid = ({ section }: SeatGridProps) => {
  const { toggleSeatOccupancy } = useMapStore();

  return (
    <div className="space-y-2">
      {section.rows.map((row) => (
        <div key={row.id} className="flex items-center gap-2">
          <div className="w-12 text-xs font-medium text-muted-foreground text-right">
            {row.label}
          </div>
          <div className="flex gap-1">
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
        </div>
      ))}
    </div>
  );
};
