
import React from "react";
import { useTranslation } from "react-i18next";
import { useLocation, Link } from "react-router-dom";
import { Home, Library, Heart, Search } from "lucide-react";

const MobileNav: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { name: t("navigation.home"), icon: Home, path: "/" },
    { name: t("navigation.search"), icon: Search, path: "/search" },
    { name: t("navigation.library"), icon: Library, path: "/library" },
    { name: t("navigation.favorites"), icon: Heart, path: "/favorites" },
  ];

  return (
    <nav className="fixed bottom-[70px] left-0 right-0 bg-background border-t border-border md:hidden z-10">
      <div className="grid grid-cols-4">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center py-3 ${
              isActive(item.path)
                ? "text-playpod-primary"
                : "text-muted-foreground"
            }`}
          >
            <item.icon size={20} />
            <span className="text-xs mt-1">{item.name}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default MobileNav;
