import { Toolbar } from "@/components/MapEditor/Toolbar";
import { Sidebar } from "@/components/MapEditor/Sidebar";
import { Canvas } from "@/components/MapEditor/Canvas";

const Index = () => {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Toolbar />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <Canvas />
      </div>
    </div>
  );
};

export default Index;
