import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Play, Shuffle, Clock, MoreHorizontal, Plus, RefreshCw } from "lucide-react";
import { getPlaylistById, getPlaylistTracks, createPlaylist } from "../api/musicService";
import { usePlayer } from "../contexts/PlayerContext";
import TrackList from "../components/TrackList";
import CreatePlaylistModal from "../components/CreatePlaylistModal";
import { Button } from "@/components/ui/button";
import { Track, Playlist } from "../api/musicService";
import { useToast } from "@/hooks/use-toast";

// Mock data for playlist and tracks

// ... keep existing code (mockPlaylist and mockTracks)

// Mock data for recommended tracks
const mockRecommendedTracks: Track[] = [
  {
    id: "6",
    title: "Watermelon Sugar",
    artist: "Harry Styles",
    album: "Fine Line",
    duration: 174,
    coverUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&h=200&fit=crop",
    audioUrl: "#",
  },
  {
    id: "7",
    title: "Levitating",
    artist: "Dua Lipa",
    album: "Future Nostalgia",
    duration: 203,
    coverUrl: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=200&h=200&fit=crop",
    audioUrl: "#",
  },
  {
    id: "8",
    title: "Don't Start Now",
    artist: "Dua Lipa",
    album: "Future Nostalgia",
    duration: 183,
    coverUrl: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=200&h=200&fit=crop",
    audioUrl: "#",
  },
  {
    id: "9",
    title: "Circles",
    artist: "Post Malone",
    album: "Hollywood's Bleeding",
    duration: 215,
    coverUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop",
    audioUrl: "#",
  },
  {
    id: "10",
    title: "Blueberry Eyes",
    artist: "MAX ft. SUGA",
    album: "Colour Vision",
    duration: 186,
    coverUrl: "https://images.unsplash.com/photo-1504898770365-14faca6a7320?w=200&h=200&fit=crop",
    audioUrl: "#",
  },
];

const mockPlaylist: Playlist = {
  id: "1",
  title: "Chill Vibes",
  description: "Relaxing music to unwind",
  coverUrl: "https://images.unsplash.com/photo-1518892096458-a169843d7f7f?w=400&h=400&fit=crop",
  trackCount: 25,
  owner: {
    id: "1",
    username: "PlayPod",
  },
};

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
    coverUrl: "https://images.unsplash.com/photo-1527283232607-f89f8b71a8f8?w=200&h=200&fit=crop",
    audioUrl: "#",
  },
  {
    id: "4",
    title: "Someone You Loved",
    artist: "Lewis Capaldi",
    album: "Divinely Uninspired To A Hellish Extent",
    duration: 182,
    coverUrl: "https://images.unsplash.com/photo-1504898770365-14faca6a7320?w=200&h=200&fit=crop",
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

const PlaylistPage: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { playTrack } = usePlayer();
  const { toast } = useToast();
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [recommendedTracks, setRecommendedTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    const fetchPlaylistData = async () => {
      try {
        setIsLoading(true);
        // Uncomment in real implementation
        // const playlistData = await getPlaylistById(id as string);
        // const tracksData = await getPlaylistTracks(id as string);
        // setPlaylist(playlistData);
        // setTracks(tracksData);
        
        // Mock data for demo
        setTimeout(() => {
          if (id) {
            setPlaylist(mockPlaylist);
            setTracks(mockTracks);
          }
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error("Error fetching playlist data:", error);
        setIsLoading(false);
      }
    };

    const fetchRecommendations = async () => {
      try {
        setIsLoadingRecommendations(true);
        // In a real app, this would call an API
        // const recommendationsData = await getRecommendationsByPlaylist(id);
        
        // Mock data for demo
        setTimeout(() => {
          setRecommendedTracks(mockRecommendedTracks);
          setIsLoadingRecommendations(false);
        }, 800);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
        setIsLoadingRecommendations(false);
      }
    };

    if (id) {
      fetchPlaylistData();
      fetchRecommendations();
    } else {
      // If no ID, we're on the create playlist page
      setIsLoading(false);
      setIsCreateModalOpen(true);
    }
  }, [id]);

  const handlePlayAll = () => {
    if (tracks.length > 0) {
      playTrack(tracks[0]);
    }
  };

  const handleCreatePlaylist = async (data: {
    title: string;
    description?: string;
    isPublic: boolean;
    tracks: string[];
    coverUrl?: string;
  }) => {
    try {
      // In a real app, call the API
      // await createPlaylist(data.title, data.description);
      
      // Success notification
      toast({
        title: t("playlist.created"),
        description: t("playlist.createdSuccess", { name: data.title }),
      });

      // In a real app, redirect to the new playlist
      navigate("/library");
    } catch (error) {
      console.error("Error creating playlist:", error);
      toast({
        title: t("common.error"),
        description: t("playlist.createError"),
        variant: "destructive",
      });
    }
  };

  const handleRefreshRecommendations = () => {
    setIsLoadingRecommendations(true);
    // In a real app, this would fetch new recommendations
    setTimeout(() => {
      // Shuffle the array to simulate new recommendations
      const shuffled = [...mockRecommendedTracks].sort(() => 0.5 - Math.random());
      setRecommendedTracks(shuffled);
      setIsLoadingRecommendations(false);
    }, 800);
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
      {/* Create New Playlist Button (only on library page) */}
      {!id && (
        <div className="mb-8 flex justify-center">
          <Button
            onClick={() => setIsCreateModalOpen(true)}
            size="lg"
            className="flex items-center gap-2 active:scale-95"
          >
            <Plus size={18} />
            {t("playlist.createNew")}
          </Button>
        </div>
      )}
      
      {/* Header */}
      {playlist && (
        <div className="mb-8 md:mb-10">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
            <img
              src={playlist.coverUrl}
              alt={playlist.title}
              className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-lg shadow-md"
            />
            <div className="text-center md:text-left">
              <div className="text-sm text-muted-foreground mb-1">PLAYLIST</div>
              <h1 className="text-3xl md:text-5xl font-bold mb-2">{playlist.title}</h1>
              {playlist.description && (
                <p className="text-muted-foreground mb-2">{playlist.description}</p>
              )}
              <div className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">{playlist.owner.username}</span>
                <span className="mx-1">•</span>
                <span>{tracks.length} songs</span>
                <span className="mx-1">•</span>
                <span>{formatDuration(getTotalDuration(tracks))}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Controls */}
      {playlist && (
        <div className="flex items-center gap-4 mb-8">
          <button 
            className="bg-playpod-primary text-white rounded-full p-3 hover:bg-playpod-secondary transition-colors active:scale-95"
            onClick={handlePlayAll}
          >
            <Play size={24} className="ml-0.5" />
          </button>
          <button className="bg-muted hover:bg-muted/80 rounded-full p-3 transition-colors active:scale-95">
            <Shuffle size={24} />
          </button>
          <button className="bg-muted hover:bg-muted/80 rounded-full p-2 transition-colors active:scale-95">
            <MoreHorizontal size={20} />
          </button>
        </div>
      )}

      {/* Track List */}
      {tracks.length > 0 ? (
        <TrackList tracks={tracks} />
      ) : (
        <div className="text-center py-10 text-muted-foreground">
          <p>This playlist is empty.</p>
        </div>
      )}

      {/* Recommended Tracks Section */}
      {id && (
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">{t("playlist.recommended")}</h2>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRefreshRecommendations}
              disabled={isLoadingRecommendations}
              className="flex items-center gap-1 active:scale-95"
            >
              <RefreshCw size={16} className={isLoadingRecommendations ? "animate-spin" : ""} />
              {t("common.refresh")}
            </Button>
          </div>
          
          {isLoadingRecommendations ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-playpod-primary"></div>
            </div>
          ) : (
            <TrackList tracks={recommendedTracks} showAddToPlaylist={true} />
          )}
        </div>
      )}

      {/* Create Playlist Modal */}
      <CreatePlaylistModal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          if (!id) navigate("/library");
        }}
        onCreatePlaylist={handleCreatePlaylist}
      />
    </div>
  );
};

export default PlaylistPage;
