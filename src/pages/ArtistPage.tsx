
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Play, Shuffle, MoreHorizontal } from "lucide-react";
import { usePlayer } from "../contexts/PlayerContext";
import TrackList from "../components/TrackList";
import { Track } from "../api/musicService";

interface Album {
  id: string;
  title: string;
  coverUrl: string;
  releaseDate: string;
  trackCount: number;
}

interface Artist {
  id: string;
  name: string;
  avatarUrl: string;
  description?: string;
  followers: number;
}

// Mock data for the artist
const mockArtist: Artist = {
  id: "1",
  name: "Ed Sheeran",
  avatarUrl: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=400&h=400&fit=crop",
  description: "Edward Christopher Sheeran is an English singer-songwriter. Born in Halifax, West Yorkshire, and raised in Framlingham, Suffolk, he began writing songs around the age of eleven.",
  followers: 85600000
};

// Mock data for the artist's top tracks
const mockTracks: Track[] = [
  {
    id: "1",
    title: "Shape of You",
    artist: "Ed Sheeran",
    album: "÷",
    duration: 235,
    coverUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&h=200&fit=crop",
    audioUrl: "#",
  },
  {
    id: "2",
    title: "Perfect",
    artist: "Ed Sheeran",
    album: "÷",
    duration: 263,
    coverUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&h=200&fit=crop",
    audioUrl: "#",
  },
  {
    id: "3",
    title: "Bad Habits",
    artist: "Ed Sheeran",
    album: "=",
    duration: 230,
    coverUrl: "https://images.unsplash.com/photo-1535712376023-5772e5be890c?w=200&h=200&fit=crop",
    audioUrl: "#",
  },
  {
    id: "4",
    title: "Thinking Out Loud",
    artist: "Ed Sheeran",
    album: "x",
    duration: 281,
    coverUrl: "https://images.unsplash.com/photo-1575356300837-de8426ea7e84?w=200&h=200&fit=crop",
    audioUrl: "#",
  },
  {
    id: "5",
    title: "Castle on the Hill",
    artist: "Ed Sheeran",
    album: "÷",
    duration: 261,
    coverUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&h=200&fit=crop",
    audioUrl: "#",
  }
];

// Mock data for the artist's albums
const mockAlbums: Album[] = [
  {
    id: "1",
    title: "÷",
    coverUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&h=200&fit=crop",
    releaseDate: "2017-03-03",
    trackCount: 16
  },
  {
    id: "2",
    title: "x",
    coverUrl: "https://images.unsplash.com/photo-1575356300837-de8426ea7e84?w=200&h=200&fit=crop",
    releaseDate: "2014-06-23",
    trackCount: 12
  },
  {
    id: "3",
    title: "=",
    coverUrl: "https://images.unsplash.com/photo-1535712376023-5772e5be890c?w=200&h=200&fit=crop",
    releaseDate: "2021-10-29",
    trackCount: 14
  },
  {
    id: "4",
    title: "+",
    coverUrl: "https://images.unsplash.com/photo-1512090421650-1ba94830f7b2?w=200&h=200&fit=crop",
    releaseDate: "2011-09-09",
    trackCount: 12
  }
];

const ArtistPage: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const { playTrack } = usePlayer();
  const [artist, setArtist] = useState<Artist | null>(null);
  const [topTracks, setTopTracks] = useState<Track[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArtistData = async () => {
      try {
        setIsLoading(true);
        
        // In a real app, fetch from API
        // const artistData = await getArtistById(id);
        // const tracksData = await getArtistTopTracks(id);
        // const albumsData = await getArtistAlbums(id);
        
        // Mock data for demo
        setTimeout(() => {
          setArtist(mockArtist);
          setTopTracks(mockTracks);
          setAlbums(mockAlbums);
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error("Error fetching artist data:", error);
        setIsLoading(false);
      }
    };

    fetchArtistData();
  }, [id]);

  const handlePlayTopTracks = () => {
    if (topTracks.length > 0) {
      playTrack(topTracks[0]);
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-playpod-primary"></div>
      </div>
    );
  }

  if (!artist) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-medium">Artist not found</h2>
      </div>
    );
  }

  return (
    <div>
      {/* Artist Header */}
      <div className="mb-10">
        <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
          <img
            src={artist?.avatarUrl}
            alt={artist?.name}
            className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-full shadow-md"
          />
          <div className="text-center md:text-left">
            <div className="text-sm text-muted-foreground mb-1">ARTIST</div>
            <h1 className="text-3xl md:text-5xl font-bold mb-2">{artist?.name}</h1>
            {artist?.description && (
              <p className="text-muted-foreground mb-2 max-w-2xl">{artist.description}</p>
            )}
            <div className="text-sm text-muted-foreground">
              <span>{formatNumber(artist?.followers || 0)} {t("artist.followers")}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4 mb-8">
        <button 
          className="bg-playpod-primary text-white rounded-full p-3 hover:bg-playpod-secondary transition-colors active:scale-95"
          onClick={handlePlayTopTracks}
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

      {/* Top Tracks */}
      <section className="mb-10 overflow-x-hidden">
        <h2 className="text-2xl font-bold mb-4">{t("artist.popular")}</h2>
        {topTracks.length > 0 ? (
          <TrackList tracks={topTracks} />
        ) : (
          <div className="text-center py-10 text-muted-foreground">
            <p>{t("artist.noTracks")}</p>
          </div>
        )}
      </section>

      {/* Albums */}
      <section>
        <h2 className="text-2xl font-bold mb-4">{t("artist.albums")}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {albums.map(album => (
            <div 
              key={album.id}
              className="group relative bg-muted/30 rounded-lg overflow-hidden transition-transform cursor-pointer active:scale-98"
              onClick={() => {/* Navigate to album page */}}
            >
              <img 
                src={album.coverUrl} 
                alt={album.title}
                className="w-full aspect-square object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    /* Play album */
                  }}
                  className="bg-playpod-primary text-white rounded-full p-3 hover:bg-playpod-secondary transition-transform transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 active:scale-95"
                >
                  <Play size={24} className="ml-0.5" />
                </button>
              </div>
              <div className="p-3">
                <h3 className="font-semibold truncate">{album.title}</h3>
                <p className="text-sm text-muted-foreground">{new Date(album.releaseDate).getFullYear()}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ArtistPage;
