
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Playlist } from "../api/musicService";
import MediaCard from "../components/MediaCard";
import { User as UserIcon } from "lucide-react";

interface User {
  id: string;
  username: string;
  avatar?: string;
  description?: string;
  followersCount: number;
  followingCount: number;
  playlistCount: number;
}

// Mock data for user
const mockUser: User = {
  id: "1",
  username: "MusicLover",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
  description: "Just a music enthusiast sharing my favorite tunes and playlists.",
  followersCount: 125,
  followingCount: 84,
  playlistCount: 12
};

// Mock data for playlists
const mockPlaylists: Playlist[] = [
  {
    id: "1",
    title: "My Favorites",
    description: "All my favorite tracks in one place",
    coverUrl: "https://images.unsplash.com/photo-1518892096458-a169843d7f7f?w=200&h=200&fit=crop",
    trackCount: 25,
    owner: { id: "1", username: "MusicLover" }
  },
  {
    id: "2",
    title: "Workout Mix",
    description: "High energy tracks to boost your workout",
    coverUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop",
    trackCount: 18,
    owner: { id: "1", username: "MusicLover" }
  },
  {
    id: "3",
    title: "Road Trip",
    description: "Perfect songs for long drives",
    coverUrl: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=200&h=200&fit=crop",
    trackCount: 30,
    owner: { id: "1", username: "MusicLover" }
  },
];

const UserPage: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        
        // In a real app, fetch from API
        // const userData = await getUserById(id);
        // const playlistsData = await getUserPlaylists(id);
        
        // Mock data for demo
        setTimeout(() => {
          setUser(mockUser);
          setPlaylists(mockPlaylists);
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsLoading(false);
      }
    };
    
    fetchUserData();
  }, [id]);
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-playpod-primary"></div>
      </div>
    );
  }
  
  if (!user) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-medium">User not found</h2>
      </div>
    );
  }
  
  return (
    <div>
      {/* User Header */}
      <div className="mb-10">
        <div className="flex flex-col md:flex-row items-center md:items-center gap-6">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden bg-muted">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.username}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-muted">
                <UserIcon size={64} className="text-muted-foreground" />
              </div>
            )}
          </div>
          
          <div className="text-center md:text-left">
            <div className="text-sm text-muted-foreground mb-1">PROFILE</div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{user.username}</h1>
            {user.description && (
              <p className="text-muted-foreground mb-3 max-w-2xl">{user.description}</p>
            )}
            
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm">
              <div>
                <span className="font-semibold">{user.playlistCount}</span>
                <span className="text-muted-foreground ml-1">{t("user.playlists")}</span>
              </div>
              <div>
                <span className="font-semibold">{user.followersCount}</span>
                <span className="text-muted-foreground ml-1">{t("user.followers")}</span>
              </div>
              <div>
                <span className="font-semibold">{user.followingCount}</span>
                <span className="text-muted-foreground ml-1">{t("user.following")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* User's Playlists */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-6">{t("user.playlists")}</h2>
        
        {playlists.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {playlists.map(playlist => (
              <MediaCard
                key={playlist.id}
                id={playlist.id}
                title={playlist.title}
                subtitle={`${playlist.trackCount} tracks`}
                imageUrl={playlist.coverUrl}
                type="playlist"
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-muted-foreground">
            <p>{t("user.noPlaylists")}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPage;
