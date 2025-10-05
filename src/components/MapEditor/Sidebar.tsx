import { Plus, Layers, Grid3x3, Armchair } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SectionList } from "./SectionList";
import { CreateSectionDialog } from "./CreateSectionDialog";
import { useState } from "react";

export const Sidebar = () => {
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  return (
    <>
      <div className="w-80 bg-sidebar border-r border-sidebar-border flex flex-col h-full">
        <div className="p-4 border-b border-sidebar-border">
          <h2 className="text-lg font-semibold text-sidebar-foreground mb-4 flex items-center gap-2">
            <Layers className="h-5 w-5 text-sidebar-primary" />
            Secciones
          </h2>
          <Button
            onClick={() => setShowCreateDialog(true)}
            className="w-full bg-sidebar-primary hover:bg-sidebar-primary/90"
            size="sm"
          >
            <Plus className="h-4 w-4 mr-2" />
            Nueva Sección
          </Button>
        </div>

        <ScrollArea className="flex-1">
          <SectionList />
        </ScrollArea>

        <div className="p-4 border-t border-sidebar-border bg-sidebar-accent/50">
          <div className="grid grid-cols-3 gap-2 text-sidebar-foreground text-xs">
            <div className="text-center">
              <Layers className="h-4 w-4 mx-auto mb-1 text-sidebar-primary" />
              <div className="font-medium">Secciones</div>
            </div>
            <div className="text-center">
              <Grid3x3 className="h-4 w-4 mx-auto mb-1 text-sidebar-primary" />
              <div className="font-medium">Filas</div>
            </div>
            <div className="text-center">
              <Armchair className="h-4 w-4 mx-auto mb-1 text-sidebar-primary" />
              <div className="font-medium">Asientos</div>
            </div>
          </div>
        </div>
      </div>

      <CreateSectionDialog open={showCreateDialog} onOpenChange={setShowCreateDialog} />
    </>
  );
};
