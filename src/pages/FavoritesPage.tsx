
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Play, Shuffle, MoreHorizontal, Heart } from "lucide-react";
import { getFavorites } from "../api/musicService";
import { usePlayer } from "../contexts/PlayerContext";
import { useAuth } from "../contexts/AuthContext";
import TrackList from "../components/TrackList";
import { Track } from "../api/musicService";

// Mock data for favorites
const mockFavorites: Track[] = [
  {
    id: "2",
    title: "Shape of You",
    artist: "Ed Sheeran",
    album: "÷",
    duration: 235,
    coverUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&h=200&fit=crop",
    audioUrl: "#",
  },
  {
    id: "3",
    title: "Dance Monkey",
    artist: "Tones and I",
    album: "The Kids Are Coming",
    duration: 210,
    coverUrl: "https://images.unsplash.com/photo-1527283232607-f89f83e1238f?w=200&h=200&fit=crop",
    audioUrl: "#",
  },
  {
    id: "5",
    title: "Bad Guy",
    artist: "Billie Eilish",
    album: "When We All Fall Asleep, Where Do We Go?",
    duration: 194,
    coverUrl: "https://images.unsplash.com/photo-1598387993281-cecf8b71a8f8?w=200&h=200&fit=crop",
    audioUrl: "#",
  },
];

const FavoritesPage: React.FC = () => {
  const { t } = useTranslation();
  const { playTrack } = usePlayer();
  const { isAuthenticated } = useAuth();
  const [favorites, setFavorites] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setIsLoading(true);
        // In a real app, fetch from API
        // const data = await getFavorites();
        // setFavorites(data);
        
        // Mock data for demo
        setTimeout(() => {
          // Check local storage for favorites
          const favoritesString = localStorage.getItem("favorites");
          const favoriteIds = favoritesString ? JSON.parse(favoritesString) : [];
          
          // Filter mock tracks based on favorites in localStorage
          const filteredFavorites = favoriteIds.length > 0 
            ? mockFavorites.filter(track => favoriteIds.includes(track.id))
            : mockFavorites;
            
          setFavorites(filteredFavorites);
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error("Error fetching favorites:", error);
        setIsLoading(false);
      }
    };

    fetchFavorites();
  }, [isAuthenticated]);

  const handlePlayAll = () => {
    if (favorites.length > 0) {
      playTrack(favorites[0]);
    }
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours} hr ${mins} min`;
    }
    
    return `${mins} min`;
  };

  const getTotalDuration = (tracks: Track[]) => {
    return tracks.reduce((acc, track) => acc + track.duration, 0);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-playpod-primary"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8 md:mb-10">
        <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
          <div className="w-48 h-48 md:w-64 md:h-64 bg-gradient-to-br from-playpod-primary to-playpod-secondary rounded-lg shadow-md flex items-center justify-center">
            <Heart 
              size={64} 
              className="text-white fill-white"
            />
          </div>
          <div className="text-center md:text-left">
            <div className="text-sm text-muted-foreground mb-1">PLAYLIST</div>
            <h1 className="text-3xl md:text-5xl font-bold mb-2">{t("favorites.title")}</h1>
            <p className="text-muted-foreground mb-2">{t("favorites.description")}</p>
            <div className="text-sm text-muted-foreground">
              <span>{favorites.length} songs</span>
              <span className="mx-1">•</span>
              <span>{formatDuration(getTotalDuration(favorites))}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4 mb-8">
        <button 
          className="bg-playpod-primary text-white rounded-full p-3 hover:bg-playpod-secondary transition-colors active:scale-95"
          onClick={handlePlayAll}
          disabled={favorites.length === 0}
        >
          <Play size={24} className="ml-0.5" />
        </button>
        <button 
          className="bg-muted hover:bg-muted/80 rounded-full p-3 transition-colors active:scale-95"
          disabled={favorites.length === 0}
        >
          <Shuffle size={24} />
        </button>
      </div>

      {/* Track List */}
      {favorites.length > 0 ? (
        <TrackList tracks={favorites} />
      ) : (
        <div className="text-center py-10 text-muted-foreground">
          <p>{t("favorites.empty")}</p>
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
