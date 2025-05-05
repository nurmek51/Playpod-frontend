
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import { Sun, Moon, User, LogOut, Settings } from "lucide-react";

const Header: React.FC = () => {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userMenuRef]);

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate("/login");
  };

  const handleLanguageChange = () => {
    setLanguage(language === "en" ? "ru" : "en");
  };

  return (
    <header className="sticky top-0 z-40 bg-background border-b border-border px-4 h-16 flex items-center justify-between">
      <div className="hidden md:block">
        <Logo />
      </div>
      
      <div className="flex-1 md:flex-none mx-4 md:mx-8 max-w-md">
        <SearchBar />
      </div>
      
      <div className="flex items-center space-x-4">
        <button
          onClick={handleLanguageChange}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-muted hover:bg-muted/80 transition-colors"
        >
          <span className="font-medium text-sm">{language.toUpperCase()}</span>
        </button>
        
        <button
          onClick={toggleTheme}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-muted hover:bg-muted/80 transition-colors"
        >
          {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
        </button>
        
        {isAuthenticated ? (
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center justify-center rounded-full w-8 h-8 bg-playpod-primary text-white"
            >
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.username}
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <span>{user?.username?.charAt(0).toUpperCase() || "U"}</span>
              )}
            </button>
            
            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-background border border-border overflow-hidden animate-fade-in z-50">
                <div className="py-1">
                  <a
                    href="/profile"
                    className="flex items-center px-4 py-2 text-sm hover:bg-muted transition-colors"
                  >
                    <User size={16} className="mr-2" />
                    {t("navigation.profile")}
                  </a>
                  <a
                    href="/settings"
                    className="flex items-center px-4 py-2 text-sm hover:bg-muted transition-colors"
                  >
                    <Settings size={16} className="mr-2" />
                    {t("navigation.settings")}
                  </a>
                  <button
                    onClick={handleLogout}
                    className="flex items-center px-4 py-2 text-sm w-full text-left hover:bg-muted transition-colors"
                  >
                    <LogOut size={16} className="mr-2" />
                    {t("navigation.logout")}
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="text-sm font-medium bg-playpod-primary text-white px-4 py-2 rounded-full hover:bg-playpod-secondary transition-colors"
          >
            {t("auth.login")}
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
