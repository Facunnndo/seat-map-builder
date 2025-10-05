import { Download, Upload, FileText, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMapStore } from "@/store/mapStore";
import { toast } from "sonner";
import { useState, useRef } from "react";

export const Toolbar = () => {
  const { mapData, setMapName, exportMap, importMap, resetMap } = useMapStore();
  const [isEditingName, setIsEditingName] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const data = exportMap();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${data.name}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Mapa exportado exitosamente");
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        importMap(data);
        toast.success("Mapa importado exitosamente");
      } catch (error) {
        toast.error("Error al importar el archivo. Verifica el formato JSON.");
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleNewMap = () => {
    if (confirm("¿Estás seguro de crear un nuevo mapa? Se perderán los cambios no guardados.")) {
      resetMap();
      toast.success("Nuevo mapa creado");
    }
  };

  return (
    <div className="h-16 bg-card border-b border-border flex items-center justify-between px-6 shadow-card">
      <div className="flex items-center gap-4">
        <FileText className="h-6 w-6 text-primary" />
        {isEditingName ? (
          <Input
            value={mapData.name}
            onChange={(e) => setMapName(e.target.value)}
            onBlur={() => setIsEditingName(false)}
            onKeyDown={(e) => e.key === "Enter" && setIsEditingName(false)}
            className="w-64"
            autoFocus
          />
        ) : (
          <h1
            className="text-xl font-semibold text-foreground cursor-pointer hover:text-primary transition-colors"
            onClick={() => setIsEditingName(true)}
          >
            {mapData.name}
          </h1>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Button onClick={handleNewMap} variant="outline" size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Nuevo
        </Button>
        
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleImport}
          className="hidden"
        />
        <Button onClick={() => fileInputRef.current?.click()} variant="outline" size="sm">
          <Upload className="h-4 w-4 mr-2" />
          Importar
        </Button>

        <Button onClick={handleExport} variant="default" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Exportar
        </Button>
      </div>
    </div>
  );
};
