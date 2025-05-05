
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../contexts/AuthContext";
import { fetchUserProfile } from "../api/authService";
import { Edit, Upload } from "lucide-react";
import HorizontalList from "../components/HorizontalList";
import MediaCard from "../components/MediaCard";
import TrackList from "../components/TrackList";
import { Track } from "../api/musicService";

const mockTracks: Track[] = [
  {
    id: "1",
    title: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    duration: 203,
    coverUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop",
    audioUrl: "#",
  },
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
];

const mockPlaylists = [
  {
    id: "1",
    title: "Chill Vibes",
    subtitle: "25 tracks",
    imageUrl: "https://images.unsplash.com/photo-1518892096458-a169843d7f7f?w=200&h=200&fit=crop",
    type: "playlist",
  },
  {
    id: "2",
    title: "Workout Mix",
    subtitle: "18 tracks",
    imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop",
    type: "playlist",
  },
  {
    id: "3",
    title: "Road Trip",
    subtitle: "30 tracks",
    imageUrl: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=200&h=200&fit=crop",
    type: "playlist",
  },
];

const ProfilePage: React.FC = () => {
  const { t } = useTranslation();
  const { user, isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [recentlyPlayed, setRecentlyPlayed] = useState<Track[]>([]);

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        setIsLoading(true);
        // In a real app, this would fetch history/favorites data
        // Uncomment in real implementation
        // const history = await getHistory();
        // setRecentlyPlayed(history);
        
        // Mock data for demo
        setTimeout(() => {
          setRecentlyPlayed(mockTracks);
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error("Error loading profile data:", error);
        setIsLoading(false);
      }
    };

    if (isAuthenticated && user) {
      loadProfileData();
    } else {
      setIsLoading(false);
    }
  }, [isAuthenticated, user]);

  if (!isAuthenticated) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-medium mb-4">You need to sign in to view your profile</h2>
        <a
          href="/login"
          className="bg-playpod-primary text-white px-4 py-2 rounded-full hover:bg-playpod-secondary transition-colors"
        >
          {t("auth.signIn")}
        </a>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-playpod-primary"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Profile Header */}
      <div className="mb-10">
        <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
          <div className="relative group">
            <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center overflow-hidden">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.username}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-4xl font-bold text-muted-foreground">
                  {user?.username?.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <Upload size={24} className="text-white" />
            </div>
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold mb-2">{user?.username}</h1>
            <p className="text-muted-foreground">{user?.email}</p>
            <button className="mt-2 flex items-center gap-2 px-3 py-1 rounded-full bg-muted hover:bg-muted/80 text-sm mx-auto md:mx-0">
              <Edit size={14} />
              {t("profile.editProfile")}
            </button>
          </div>
        </div>
      </div>

      {/* Recently Played */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">{t("profile.recentActivity")}</h2>
        <TrackList tracks={recentlyPlayed} />
      </div>

      {/* Your Playlists */}
      <HorizontalList title={t("library.playlists")} viewAll="/library">
        {mockPlaylists.map((playlist) => (
          <MediaCard
            key={playlist.id}
            id={playlist.id}
            title={playlist.title}
            subtitle={playlist.subtitle}
            imageUrl={playlist.imageUrl}
            type="playlist"
          />
        ))}
      </HorizontalList>
    </div>
  );
};

export default ProfilePage;
