import { useMapStore } from "@/store/mapStore";
import { Trash2, Edit, ChevronRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CreateRowDialog } from "./CreateRowDialog";
import { EditSectionDialog } from "./EditSectionDialog";

export const SectionList = () => {
  const { mapData, deleteSection, setSelectedSection } = useMapStore();
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [showRowDialog, setShowRowDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const handleDelete = (sectionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("¿Eliminar esta sección?")) {
      deleteSection(sectionId);
    }
  };

  const handleEdit = (sectionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveSectionId(sectionId);
    setShowEditDialog(true);
  };

  const handleAddRow = (sectionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveSectionId(sectionId);
    setShowRowDialog(true);
  };

  if (mapData.sections.length === 0) {
    return (
      <div className="p-8 text-center text-sidebar-foreground/60">
        <p className="mb-2">No hay secciones aún</p>
        <p className="text-xs">Crea tu primera sección</p>
      </div>
    );
  }

  return (
    <>
      <div className="p-2">
        {mapData.sections.map((section) => {
          const isExpanded = expandedSections.has(section.id);
          return (
            <div key={section.id} className="mb-2">
              <div
                className="flex items-center gap-2 p-3 rounded-lg bg-sidebar-accent hover:bg-sidebar-accent/70 transition-colors cursor-pointer group"
                onClick={() => {
                  toggleSection(section.id);
                  setSelectedSection(section.id);
                }}
              >
                <ChevronRight
                  className={`h-4 w-4 text-sidebar-foreground transition-transform ${
                    isExpanded ? "rotate-90" : ""
                  }`}
                />
                <div
                  className="w-4 h-4 rounded border-2 border-sidebar-foreground/30"
                  style={{ backgroundColor: section.color }}
                />
                <span className="flex-1 text-sm font-medium text-sidebar-foreground truncate">
                  {section.label}
                </span>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-sidebar-foreground hover:text-sidebar-primary"
                    onClick={(e) => handleAddRow(section.id, e)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-sidebar-foreground hover:text-sidebar-primary"
                    onClick={(e) => handleEdit(section.id, e)}
                  >
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-sidebar-foreground hover:text-destructive"
                    onClick={(e) => handleDelete(section.id, e)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              {isExpanded && section.rows.length > 0 && (
                <div className="ml-6 mt-1 space-y-1">
                  {section.rows.map((row) => (
                    <div
                      key={row.id}
                      className="p-2 rounded bg-sidebar-accent/50 text-xs text-sidebar-foreground"
                    >
                      {row.label} ({row.seats.length} asientos)
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {activeSectionId && (
        <>
          <CreateRowDialog
            open={showRowDialog}
            onOpenChange={setShowRowDialog}
            sectionId={activeSectionId}
          />
          <EditSectionDialog
            open={showEditDialog}
            onOpenChange={setShowEditDialog}
            sectionId={activeSectionId}
          />
        </>
      )}
    </>
  );
};
