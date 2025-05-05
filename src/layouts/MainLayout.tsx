
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import MobileNav from "../components/MobileNav";
import Player from "../components/Player";

const MainLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <div className="flex flex-1">
        <div className="hidden md:block">
          <Sidebar />
        </div>
        
        <main className="flex-1 p-6 overflow-y-auto pb-[140px] md:pb-[70px]">
          <Outlet />
        </main>
      </div>
      
      <MobileNav />
      <Player />

      {/* Global styles */}
      <style jsx global>{`
        @keyframes heart-beat {
          0% { transform: scale(1); }
          25% { transform: scale(1.2); }
          50% { transform: scale(0.95); }
          75% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        .animate-heart-beat {
          animation: heart-beat 0.3s ease-in-out;
        }
        .active\:scale-95:active {
          transform: scale(0.95);
        }
        .active\:scale-98:active {
          transform: scale(0.98);
        }
        .active\:scale-90:active {
          transform: scale(0.9);
        }
      `}</style>
    </div>
  );
};

export default MainLayout;
