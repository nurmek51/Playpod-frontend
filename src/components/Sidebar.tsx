
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, Link } from "react-router-dom";
import { Home, Library, Heart, ChevronLeft, ChevronRight } from "lucide-react";

const Sidebar: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { name: t("navigation.home"), icon: Home, path: "/" },
    { name: t("navigation.library"), icon: Library, path: "/library" },
    { name: t("navigation.favorites"), icon: Heart, path: "/favorites" }
  ];

  return (
    <aside
      className={`bg-sidebar border-r border-border h-full transition-all duration-300 ease-in-out ${
        collapsed ? "w-[72px]" : "w-[250px]"
      }`}
    >
      <div className="p-4 flex items-center justify-between">
        {!collapsed && <div className="invisible md:visible"></div>}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="rounded-full p-2 bg-muted hover:bg-muted/80 transition-colors ml-auto active:scale-95 flex items-center justify-center"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <nav className="flex-1 p-2">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center px-3 py-2 rounded-md transition-colors active:scale-95 ${
                  isActive(item.path)
                    ? "bg-playpod-primary text-white"
                    : "hover:bg-muted"
                } ${
                  collapsed ? "justify-center" : ""
                }`}
              >
                <item.icon size={20} />
                {!collapsed && <span className="ml-3">{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-border">
        {!collapsed && (
          <div className="px-3 py-2">
            <h3 className="text-xs font-semibold text-muted-foreground mb-2">{t("library.yourLibrary")}</h3>
            <p className="text-xs text-muted-foreground">
              {t("library.createPlaylist")}
            </p>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
