import { create } from 'zustand';

export type Seat = {
  id: string;
  label: string;
  x: number;
  y: number;
  occupied: boolean;
};

export type Row = {
  id: string;
  label: string;
  seats: Seat[];
};

export type Section = {
  id: string;
  label: string;
  color: string;
  rows: Row[];
  position: { x: number; y: number };
  rotation: number; // in degrees: 0, 90, 180, 270
};

export type MapData = {
  id: string;
  name: string;
  sections: Section[];
};

interface MapStore {
  mapData: MapData;
  selectedSectionId: string | null;
  selectedRowId: string | null;
  selectedSeatIds: string[];
  
  setMapName: (name: string) => void;
  addSection: (section: Section) => void;
  updateSection: (sectionId: string, updates: Partial<Section>) => void;
  deleteSection: (sectionId: string) => void;
  rotateSection: (sectionId: string) => void;
  
  addRow: (sectionId: string, row: Row) => void;
  updateRow: (sectionId: string, rowId: string, updates: Partial<Row>) => void;
  deleteRow: (sectionId: string, rowId: string) => void;
  
  updateSeat: (sectionId: string, rowId: string, seatId: string, updates: Partial<Seat>) => void;
  toggleSeatOccupancy: (sectionId: string, rowId: string, seatId: string) => void;
  
  setSelectedSection: (sectionId: string | null) => void;
  setSelectedRow: (rowId: string | null) => void;
  toggleSeatSelection: (seatId: string) => void;
  clearSeatSelection: () => void;
  
  exportMap: () => MapData;
  importMap: (data: MapData) => void;
  resetMap: () => void;
}

const initialMapData: MapData = {
  id: crypto.randomUUID(),
  name: 'Nuevo Mapa',
  sections: [],
};

export const useMapStore = create<MapStore>((set, get) => ({
  mapData: initialMapData,
  selectedSectionId: null,
  selectedRowId: null,
  selectedSeatIds: [],

  setMapName: (name) =>
    set((state) => ({
      mapData: { ...state.mapData, name },
    })),

  addSection: (section) =>
    set((state) => ({
      mapData: {
        ...state.mapData,
        sections: [...state.mapData.sections, section],
      },
    })),

  updateSection: (sectionId, updates) =>
    set((state) => ({
      mapData: {
        ...state.mapData,
        sections: state.mapData.sections.map((s) =>
          s.id === sectionId ? { ...s, ...updates } : s
        ),
      },
    })),

  deleteSection: (sectionId) =>
    set((state) => ({
      mapData: {
        ...state.mapData,
        sections: state.mapData.sections.filter((s) => s.id !== sectionId),
      },
      selectedSectionId: state.selectedSectionId === sectionId ? null : state.selectedSectionId,
    })),

  rotateSection: (sectionId) =>
    set((state) => ({
      mapData: {
        ...state.mapData,
        sections: state.mapData.sections.map((s) =>
          s.id === sectionId ? { ...s, rotation: (s.rotation + 90) % 360 } : s
        ),
      },
    })),

  addRow: (sectionId, row) =>
    set((state) => ({
      mapData: {
        ...state.mapData,
        sections: state.mapData.sections.map((s) =>
          s.id === sectionId ? { ...s, rows: [...s.rows, row] } : s
        ),
      },
    })),

  updateRow: (sectionId, rowId, updates) =>
    set((state) => ({
      mapData: {
        ...state.mapData,
        sections: state.mapData.sections.map((s) =>
          s.id === sectionId
            ? {
                ...s,
                rows: s.rows.map((r) => (r.id === rowId ? { ...r, ...updates } : r)),
              }
            : s
        ),
      },
    })),

  deleteRow: (sectionId, rowId) =>
    set((state) => ({
      mapData: {
        ...state.mapData,
        sections: state.mapData.sections.map((s) =>
          s.id === sectionId ? { ...s, rows: s.rows.filter((r) => r.id !== rowId) } : s
        ),
      },
      selectedRowId: state.selectedRowId === rowId ? null : state.selectedRowId,
    })),

  updateSeat: (sectionId, rowId, seatId, updates) =>
    set((state) => ({
      mapData: {
        ...state.mapData,
        sections: state.mapData.sections.map((s) =>
          s.id === sectionId
            ? {
                ...s,
                rows: s.rows.map((r) =>
                  r.id === rowId
                    ? {
                        ...r,
                        seats: r.seats.map((seat) =>
                          seat.id === seatId ? { ...seat, ...updates } : seat
                        ),
                      }
                    : r
                ),
              }
            : s
        ),
      },
    })),

  toggleSeatOccupancy: (sectionId, rowId, seatId) =>
    set((state) => ({
      mapData: {
        ...state.mapData,
        sections: state.mapData.sections.map((s) =>
          s.id === sectionId
            ? {
                ...s,
                rows: s.rows.map((r) =>
                  r.id === rowId
                    ? {
                        ...r,
                        seats: r.seats.map((seat) =>
                          seat.id === seatId ? { ...seat, occupied: !seat.occupied } : seat
                        ),
                      }
                    : r
                ),
              }
            : s
        ),
      },
    })),

  setSelectedSection: (sectionId) => set({ selectedSectionId: sectionId }),
  setSelectedRow: (rowId) => set({ selectedRowId: rowId }),
  
  toggleSeatSelection: (seatId) =>
    set((state) => ({
      selectedSeatIds: state.selectedSeatIds.includes(seatId)
        ? state.selectedSeatIds.filter((id) => id !== seatId)
        : [...state.selectedSeatIds, seatId],
    })),

  clearSeatSelection: () => set({ selectedSeatIds: [] }),

  exportMap: () => get().mapData,

  importMap: (data) =>
    set({
      mapData: data,
      selectedSectionId: null,
      selectedRowId: null,
      selectedSeatIds: [],
    }),

  resetMap: () =>
    set({
      mapData: { ...initialMapData, id: crypto.randomUUID() },
      selectedSectionId: null,
      selectedRowId: null,
      selectedSeatIds: [],
    }),
}));
