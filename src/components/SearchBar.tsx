
import React, { useState, useRef, useEffect, KeyboardEvent } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import { useDebouncedCallback } from "../hooks/useDebounce";
import { search } from "../api/musicService";

interface SearchResult {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  type: "track" | "artist" | "album" | "playlist";
}

const SearchBar: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchBarRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const debouncedSearch = useDebouncedCallback(async (searchQuery: string) => {
    if (searchQuery.length < 2) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      // In a real app, this would call the search API
      // const data = await search(searchQuery);
      
      // Mock data for demo
      const mockResults: SearchResult[] = [
        {
          id: "1",
          title: "Shape of You",
          artist: "Ed Sheeran",
          coverUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&h=200&fit=crop",
          type: "track"
        },
        {
          id: "2",
          title: "Blinding Lights",
          artist: "The Weeknd",
          coverUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop",
          type: "track"
        },
        {
          id: "3",
          title: "Ed Sheeran",
          artist: "",
          coverUrl: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=200&h=200&fit=crop",
          type: "artist"
        },
        {
          id: "4",
          title: "Divide",
          artist: "Ed Sheeran",
          coverUrl: "https://images.unsplash.com/photo-1496293455970-f8581aae0e3b?w=200&h=200&fit=crop",
          type: "album"
        }
      ];
      
      setResults(mockResults);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsLoading(false);
    }
  }, 300);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.length >= 2) {
      debouncedSearch(value);
      setShowDropdown(true);
    } else {
      setResults([]);
      setShowDropdown(false);
    }
  };

  const handleClearSearch = () => {
    setQuery("");
    setResults([]);
    setShowDropdown(false);
  };

  const handleResultClick = (result: SearchResult) => {
    setShowDropdown(false);
    
    // Navigate based on result type
    switch (result.type) {
      case "track":
        // In a real app, this might play the track or show its details
        break;
      case "artist":
        navigate(`/artist/${result.id}`);
        break;
      case "album":
        navigate(`/album/${result.id}`);
        break;
      case "playlist":
        navigate(`/playlist/${result.id}`);
        break;
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && query.trim().length > 0) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setShowDropdown(false);
    }
  };

  const focusInput = () => {
    setIsExpanded(true);
  };

  const blurInput = () => {
    if (!query) {
      setIsExpanded(false);
    }
  };

  // Group results by type
  const trackResults = results.filter(result => result.type === "track");
  const artistResults = results.filter(result => result.type === "artist");
  const albumResults = results.filter(result => result.type === "album");
  const playlistResults = results.filter(result => result.type === "playlist");

  return (
    <div 
      ref={searchBarRef}
      className="relative w-full max-w-xl mx-auto transition-all duration-200 ease-in-out"
    >
      <div className="relative flex items-center">
        <Search 
          size={18} 
          className="absolute left-3 text-muted-foreground"
        />
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={focusInput}
          onBlur={blurInput}
          placeholder={t("search.searchPlaceholder")}
          className="w-full h-10 pl-10 pr-10 rounded-full bg-muted focus:outline-none focus:ring-2 focus:ring-playpod-primary transition-all"
        />
        {query && (
          <button
            onClick={handleClearSearch}
            className="absolute right-3 text-muted-foreground hover:text-foreground active:scale-95 transition-transform"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-1 p-2 bg-background border border-border rounded-lg shadow-lg max-h-[80vh] overflow-y-auto z-50 animate-fade-in">
          {isLoading ? (
            <div className="p-4 text-center text-muted-foreground">
              {t("common.loading")}
            </div>
          ) : results.length === 0 ? (
            query.length >= 2 && (
              <div className="p-4 text-center text-muted-foreground">
                {t("search.noResults")}
              </div>
            )
          ) : (
            <div>
              {trackResults.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-xs font-medium text-muted-foreground mb-2 px-2">
                    {t("search.tracks")}
                  </h3>
                  <div className="space-y-1">
                    {trackResults.map((result) => (
                      <div
                        key={result.id}
                        className="flex items-center p-2 hover:bg-muted rounded-md cursor-pointer active:scale-98 transition-transform"
                        onClick={() => handleResultClick(result)}
                      >
                        <img
                          src={result.coverUrl}
                          alt={result.title}
                          className="w-10 h-10 object-cover rounded"
                        />
                        <div className="ml-3">
                          <div className="font-medium text-sm">{result.title}</div>
                          <div className="text-xs text-muted-foreground">{result.artist}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {artistResults.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-xs font-medium text-muted-foreground mb-2 px-2">
                    {t("search.artists")}
                  </h3>
                  <div className="space-y-1">
                    {artistResults.map((result) => (
                      <div
                        key={result.id}
                        className="flex items-center p-2 hover:bg-muted rounded-md cursor-pointer active:scale-98 transition-transform"
                        onClick={() => handleResultClick(result)}
                      >
                        <img
                          src={result.coverUrl}
                          alt={result.title}
                          className="w-10 h-10 object-cover rounded-full"
                        />
                        <div className="ml-3">
                          <div className="font-medium text-sm">{result.title}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {albumResults.length > 0 && (
                <div>
                  <h3 className="text-xs font-medium text-muted-foreground mb-2 px-2">
                    {t("search.albums")}
                  </h3>
                  <div className="space-y-1">
                    {albumResults.map((result) => (
                      <div
                        key={result.id}
                        className="flex items-center p-2 hover:bg-muted rounded-md cursor-pointer active:scale-98 transition-transform"
                        onClick={() => handleResultClick(result)}
                      >
                        <img
                          src={result.coverUrl}
                          alt={result.title}
                          className="w-10 h-10 object-cover rounded"
                        />
                        <div className="ml-3">
                          <div className="font-medium text-sm">{result.title}</div>
                          <div className="text-xs text-muted-foreground">{result.artist}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
