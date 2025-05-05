import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { Search as SearchIcon, X } from "lucide-react";
import { search } from "../api/musicService";

const SearchPage: React.FC = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<any>({
    tracks: [],
    artists: [],
    albums: [],
    playlists: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const isMobile = window.innerWidth < 768;

  // Perform search when query changes
  useEffect(() => {
    if (initialQuery) {
      performSearch(initialQuery);
    }
  }, [initialQuery]);

  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    
    try {
      setIsLoading(true);
      // In a real app, call the API
      // const data = await search(searchQuery);
      // setResults(data);
      
      // Mock data for demo
      setTimeout(() => {
        setResults({
          tracks: [
            {
              id: "1",
              title: "Blinding Lights",
              artist: "The Weeknd",
              album: "After Hours",
              duration: 203,
              coverUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop"
            },
            {
              id: "2",
              title: "Shape of You",
              artist: "Ed Sheeran",
              album: "÷",
              duration: 235,
              coverUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&h=200&fit=crop"
            }
          ],
          artists: [
            {
              id: "1",
              name: "The Weeknd",
              followers: 85600000,
              avatarUrl: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=200&h=200&fit=crop"
            },
            {
              id: "2",
              name: "Ed Sheeran",
              followers: 78500000,
              avatarUrl: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=200&h=200&fit=crop"
            }
          ],
          albums: [
            {
              id: "1",
              title: "After Hours",
              artist: "The Weeknd",
              releaseDate: "2020-03-20",
              coverUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop"
            },
            {
              id: "2",
              title: "÷",
              artist: "Ed Sheeran",
              releaseDate: "2017-03-03",
              coverUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&h=200&fit=crop"
            }
          ],
          playlists: [
            {
              id: "1",
              title: "Chill Vibes",
              description: "Relaxing music to unwind",
              coverUrl: "https://images.unsplash.com/photo-1518892096458-a169843d7f7f?w=200&h=200&fit=crop",
              trackCount: 25
            },
            {
              id: "2",
              title: "Workout Mix",
              description: "High energy tracks to boost your workout",
              coverUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop",
              trackCount: 18
            }
          ]
        });
        setIsLoading(false);
      }, 500);
    } catch (error) {
      console.error("Error searching:", error);
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    setSearchParams({ q: query });
    performSearch(query);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const clearSearch = () => {
    setQuery("");
    setResults({
      tracks: [],
      artists: [],
      albums: [],
      playlists: []
    });
    setSearchParams({});
  };

  return (
    <div>
      {/* Mobile search header */}
      {isMobile && (
        <div className="sticky top-0 z-30 bg-background border-b border-border px-4 py-3 mb-6">
          <div className="relative flex items-center">
            <SearchIcon 
              size={18} 
              className="absolute left-3 text-muted-foreground"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t("search.searchPlaceholder")}
              className="w-full h-10 pl-10 pr-10 rounded-full bg-muted focus:outline-none focus:ring-2 focus:ring-playpod-primary transition-all"
              autoFocus
            />
            {query && (
              <button
                onClick={clearSearch}
                className="absolute right-3 text-muted-foreground hover:text-foreground active:scale-95 transition-transform"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Search results */}
      <div>
        {!isMobile && (
          <h1 className="text-3xl font-bold mb-6">{t("search.results")}</h1>
        )}

        {isLoading ? (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-playpod-primary"></div>
          </div>
        ) : (
          <div>
            {/* Top result */}
            {Object.values(results).some(arr => arr.length > 0) ? (
              <div className="space-y-8">
                {results.tracks.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4">{t("search.tracks")}</h2>
                    <ul>
                      {results.tracks.map((track: any) => (
                        <li key={track.id} className="flex items-center py-2 border-b border-border">
                          <img src={track.coverUrl} alt={track.title} className="w-12 h-12 rounded mr-4" />
                          <div>
                            <h3 className="font-medium">{track.title}</h3>
                            <p className="text-muted-foreground text-sm">{track.artist} - {track.album}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {results.artists.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4">{t("search.artists")}</h2>
                    <ul>
                      {results.artists.map((artist: any) => (
                        <li key={artist.id} className="flex items-center py-2 border-b border-border">
                          <img src={artist.avatarUrl} alt={artist.name} className="w-12 h-12 rounded-full mr-4" />
                          <div>
                            <h3 className="font-medium">{artist.name}</h3>
                            <p className="text-muted-foreground text-sm">{artist.followers} Followers</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {results.albums.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4">{t("search.albums")}</h2>
                    <ul>
                      {results.albums.map((album: any) => (
                        <li key={album.id} className="flex items-center py-2 border-b border-border">
                          <img src={album.coverUrl} alt={album.title} className="w-12 h-12 rounded mr-4" />
                          <div>
                            <h3 className="font-medium">{album.title}</h3>
                            <p className="text-muted-foreground text-sm">{album.artist} - {album.releaseDate}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {results.playlists.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4">{t("search.playlists")}</h2>
                    <ul>
                      {results.playlists.map((playlist: any) => (
                        <li key={playlist.id} className="flex items-center py-2 border-b border-border">
                          <img src={playlist.coverUrl} alt={playlist.title} className="w-12 h-12 rounded mr-4" />
                          <div>
                            <h3 className="font-medium">{playlist.title}</h3>
                            <p className="text-muted-foreground text-sm">{playlist.description}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              query && (
                <div className="text-center py-10">
                  <p className="text-muted-foreground">{t("search.noResults")}</p>
                </div>
              )
            )}
          </div>
        )}

        {/* Initial state when no search has been performed */}
        {!query && !isLoading && Object.values(results).every(arr => arr.length === 0) && (
          <div className="text-center py-10">
            <SearchIcon size={48} className="mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-medium mb-2">{t("search.startSearching")}</h2>
            <p className="text-muted-foreground">{t("search.instructions")}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
