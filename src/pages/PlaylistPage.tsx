
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Play, Shuffle, Clock, MoreHorizontal } from "lucide-react";
import { getPlaylistById, getPlaylistTracks } from "../api/musicService";
import TrackList from "../components/TrackList";
import { Track, Playlist } from "../api/musicService";

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
    coverUrl: "https://images.unsplash.com/photo-1527283232607-f89f83e1238f?w=200&h=200&fit=crop",
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
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
          setPlaylist(mockPlaylist);
          setTracks(mockTracks);
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error("Error fetching playlist data:", error);
        setIsLoading(false);
      }
    };

    if (id) {
      fetchPlaylistData();
    }
  }, [id]);

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

  if (!playlist) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-medium">Playlist not found</h2>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
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

      {/* Controls */}
      <div className="flex items-center gap-4 mb-8">
        <button className="bg-playpod-primary text-white rounded-full p-3 hover:bg-playpod-secondary transition-colors">
          <Play size={24} className="ml-0.5" />
        </button>
        <button className="bg-muted hover:bg-muted/80 rounded-full p-3 transition-colors">
          <Shuffle size={24} />
        </button>
        <button className="bg-muted hover:bg-muted/80 rounded-full p-2 transition-colors">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Track List */}
      {tracks.length > 0 ? (
        <TrackList tracks={tracks} />
      ) : (
        <div className="text-center py-10 text-muted-foreground">
          <p>This playlist is empty.</p>
        </div>
      )}
    </div>
  );
};

export default PlaylistPage;
