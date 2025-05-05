
import React, { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { addToFavorites, removeFromFavorites } from "../api/musicService";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";

interface FavoriteButtonProps {
  trackId: string;
  initialFavorite?: boolean;
  size?: "sm" | "md" | "lg";
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  trackId,
  initialFavorite = false,
  size = "md",
}) => {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [isFavorite, setIsFavorite] = useState(initialFavorite);
  const [isAnimating, setIsAnimating] = useState(false);

  // Check localStorage on mount
  useEffect(() => {
    const favoritesString = localStorage.getItem("favorites");
    if (favoritesString) {
      const favorites = JSON.parse(favoritesString);
      setIsFavorite(favorites.includes(trackId));
    }
  }, [trackId]);

  const handleToggleFavorite = async () => {
    if (!isAuthenticated) {
      // Handle unauthenticated state
      toast({
        title: t("auth.required"),
        description: t("auth.loginToFavorite"),
        variant: "destructive",
      });
      return;
    }

    const newFavoriteStatus = !isFavorite;
    setIsFavorite(newFavoriteStatus);
    setIsAnimating(true);

    // Update localStorage
    const favoritesString = localStorage.getItem("favorites");
    const favorites = favoritesString ? JSON.parse(favoritesString) : [];
    
    if (newFavoriteStatus) {
      localStorage.setItem("favorites", JSON.stringify([...favorites, trackId]));
      toast({
        description: t("favorites.added"),
      });
    } else {
      localStorage.setItem(
        "favorites",
        JSON.stringify(favorites.filter((id: string) => id !== trackId))
      );
      toast({
        description: t("favorites.removed"),
      });
    }

    // Call API
    try {
      if (newFavoriteStatus) {
        await addToFavorites(trackId);
      } else {
        await removeFromFavorites(trackId);
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
      // Revert UI state if API call fails
      setIsFavorite(!newFavoriteStatus);
      toast({
        title: t("common.error"),
        description: t("favorites.error"),
        variant: "destructive",
      });
    }

    // Reset animation state
    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };

  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        handleToggleFavorite();
      }}
      className={`focus:outline-none active:scale-90 transition-transform ${
        isAnimating ? "animate-heart-beat" : ""
      }`}
    >
      <Heart
        className={`${sizeClasses[size]} ${
          isFavorite ? "fill-playpod-primary text-playpod-primary" : "text-muted-foreground"
        } transition-colors`}
      />
    </button>
  );
};

export default FavoriteButton;
