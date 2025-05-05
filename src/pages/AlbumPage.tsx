
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Play, Shuffle, Clock, MoreHorizontal } from "lucide-react";
import TrackList from "../components/TrackList";
import { Track, Album } from "../api/musicService";

const mockAlbum: Album = {
  id: "1",
  title: "After Hours",
  artist: "The Weeknd",
  releaseDate: "2020-03-20",
  coverUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
  trackCount: 14,
};

const mockTracks: Track[] = [
  {
    id: "1",
    title: "Alone Again",
    artist: "The Weeknd",
    album: "After Hours",
    duration: 253,
    coverUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop",
    audioUrl: "#",
  },
  {
    id: "2",
    title: "Too Late",
    artist: "The Weeknd",
    album: "After Hours",
    duration: 235,
    coverUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop",
    audioUrl: "#",
  },
  {
    id: "3",
    title: "Hardest To Love",
    artist: "The Weeknd",
    album: "After Hours",
    duration: 210,
    coverUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop",
    audioUrl: "#",
  },
  {
    id: "4",
    title: "Scared To Live",
    artist: "The Weeknd",
    album: "After Hours",
    duration: 182,
    coverUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop",
    audioUrl: "#",
  },
  {
    id: "5",
    title: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    duration: 194,
    coverUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop",
    audioUrl: "#",
  },
];

const AlbumPage: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const [album, setAlbum] = useState<Album | null>(null);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAlbumData = async () => {
      try {
        setIsLoading(true);
        // In a real app, this would fetch data from the API
        // Uncomment in real implementation
        // const albumData = await getAlbumById(id as string);
        // const tracksData = await getAlbumTracks(id as string);
        // setAlbum(albumData);
        // setTracks(tracksData);
        
        // Mock data for demo
        setTimeout(() => {
          setAlbum(mockAlbum);
          setTracks(mockTracks);
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error("Error fetching album data:", error);
        setIsLoading(false);
      }
    };

    if (id) {
      fetchAlbumData();
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

  if (!album) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-medium">Album not found</h2>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8 md:mb-10">
        <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
          <img
            src={album.coverUrl}
            alt={album.title}
            className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-lg shadow-md"
          />
          <div className="text-center md:text-left">
            <div className="text-sm text-muted-foreground mb-1">ALBUM</div>
            <h1 className="text-3xl md:text-5xl font-bold mb-2">{album.title}</h1>
            <div className="text-sm">
              <span className="font-medium">{album.artist}</span>
              <span className="mx-1">•</span>
              <span className="text-muted-foreground">{album.releaseDate.substring(0, 4)}</span>
              <span className="mx-1">•</span>
              <span className="text-muted-foreground">{tracks.length} songs</span>
              <span className="mx-1">•</span>
              <span className="text-muted-foreground">{formatDuration(getTotalDuration(tracks))}</span>
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
      <TrackList tracks={tracks} showAlbum={false} showCover={false} />
    </div>
  );
};

export default AlbumPage;
