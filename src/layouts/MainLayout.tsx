
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
    </div>
  );
};

export default MainLayout;
