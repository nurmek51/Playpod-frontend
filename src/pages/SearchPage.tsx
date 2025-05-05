
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import { search } from "../api/musicService";
import TrackList from "../components/TrackList";
import { Track } from "../api/musicService";

interface Artist {
  id: string;
  name: string;
  avatarUrl: string;
}

interface Album {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
}

interface SearchResults {
  tracks: Track[];
  artists: Artist[];
  albums: Album[];
}

// Mock search results
const mockResults: SearchResults = {
  tracks: [
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
    }
  ],
  artists: [
    {
      id: "1",
      name: "Ed Sheeran",
      avatarUrl: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=200&h=200&fit=crop",
    }
  ],
  albums: [
    {
      id: "1",
      title: "÷",
      artist: "Ed Sheeran",
      coverUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&h=200&fit=crop",
    }
  ]
};

const SearchPage: React.FC = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState<SearchResults>({ tracks: [], artists: [], albums: [] });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const performSearch = async () => {
      if (!query) return;
      
      setIsLoading(true);
      try {
        // In a real app, call the search API
        // const data = await search(query);
        // setResults(data);
        
        // Mock data for demo
        setTimeout(() => {
          setResults(mockResults);
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error("Error performing search:", error);
        setIsLoading(false);
      }
    };
    
    performSearch();
  }, [query]);

  if (!query) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Search size={64} className="text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold mb-2">{t("search.start")}</h2>
        <p className="text-muted-foreground">{t("search.enterTerms")}</p>
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

  const hasResults = results.tracks.length > 0 || results.artists.length > 0 || results.albums.length > 0;

  if (!hasResults) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h2 className="text-2xl font-bold mb-2">{t("search.noResults")}</h2>
        <p className="text-muted-foreground">{t("search.tryDifferent")}</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        {t("search.resultsFor")} "{query}"
      </h1>

      {/* Artists */}
      {results.artists.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">{t("search.artists")}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {results.artists.map(artist => (
              <div 
                key={artist.id}
                className="flex flex-col items-center p-4 bg-muted/30 rounded-lg cursor-pointer transition-transform hover:bg-muted active:scale-98"
                onClick={() => window.location.href = `/artist/${artist.id}`}
              >
                <img 
                  src={artist.avatarUrl} 
                  alt={artist.name}
                  className="w-32 h-32 object-cover rounded-full mb-3" 
                />
                <h3 className="font-semibold text-center">{artist.name}</h3>
                <p className="text-sm text-muted-foreground">{t("search.artist")}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Albums */}
      {results.albums.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">{t("search.albums")}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {results.albums.map(album => (
              <div 
                key={album.id}
                className="bg-muted/30 rounded-lg overflow-hidden cursor-pointer transition-transform hover:bg-muted active:scale-98"
                onClick={() => window.location.href = `/album/${album.id}`}
              >
                <img 
                  src={album.coverUrl} 
                  alt={album.title}
                  className="w-full aspect-square object-cover" 
                />
                <div className="p-3">
                  <h3 className="font-semibold truncate">{album.title}</h3>
                  <p className="text-sm text-muted-foreground truncate">{album.artist}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Tracks */}
      {results.tracks.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-4">{t("search.tracks")}</h2>
          <TrackList tracks={results.tracks} />
        </section>
      )}
    </div>
  );
};

export default SearchPage;
