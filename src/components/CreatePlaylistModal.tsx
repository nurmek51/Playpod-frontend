
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { X, Upload, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Track } from "../api/musicService";
import { usePlayer } from "../contexts/PlayerContext";

interface CreatePlaylistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreatePlaylist: (data: {
    title: string;
    description?: string;
    isPublic: boolean;
    tracks: string[];
    coverUrl?: string;
  }) => Promise<void>;
}

const CreatePlaylistModal: React.FC<CreatePlaylistModalProps> = ({
  isOpen,
  onClose,
  onCreatePlaylist,
}) => {
  const { t } = useTranslation();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [coverUrl, setCoverUrl] = useState("");
  const [selectedTracks, setSelectedTracks] = useState<Track[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<Track[]>([]);
  
  // Mock search results
  const mockSearchResults: Track[] = [
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

  const handleSearch = () => {
    setIsLoading(true);
    // Mock API call
    setTimeout(() => {
      setSearchResults(mockSearchResults);
      setIsLoading(false);
    }, 500);
  };

  const handleAddTrack = (track: Track) => {
    if (!selectedTracks.some(t => t.id === track.id)) {
      setSelectedTracks([...selectedTracks, track]);
    }
  };

  const handleRemoveTrack = (trackId: string) => {
    setSelectedTracks(selectedTracks.filter(t => t.id !== trackId));
  };

  const handleSubmit = async () => {
    if (!title.trim()) return;
    
    setIsLoading(true);
    try {
      await onCreatePlaylist({
        title,
        description: description.trim() || undefined,
        isPublic,
        tracks: selectedTracks.map(t => t.id),
        coverUrl: coverUrl || undefined,
      });
      
      onClose();
    } catch (error) {
      console.error("Failed to create playlist:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCoverUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, upload to server
      // Here we just create an object URL as a placeholder
      const imageUrl = URL.createObjectURL(file);
      setCoverUrl(imageUrl);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-background rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-xl font-semibold">{t("playlist.createNew")}</h2>
          <button 
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground active:scale-95 transition-transform"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Cover Image & Basic Info */}
            <div className="md:col-span-1">
              <div 
                className="aspect-square bg-muted rounded-md mb-4 flex flex-col items-center justify-center cursor-pointer overflow-hidden relative"
                onClick={() => document.getElementById("cover-upload")?.click()}
              >
                {coverUrl ? (
                  <img 
                    src={coverUrl} 
                    alt="Playlist Cover" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <>
                    <Upload size={32} className="text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">{t("playlist.uploadCover")}</p>
                  </>
                )}
                <input 
                  type="file" 
                  id="cover-upload" 
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleCoverUpload}
                />
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">{t("playlist.title")}</label>
                  <input 
                    type="text" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder={t("playlist.titlePlaceholder")}
                    className="w-full p-2 rounded-md border border-border bg-muted"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">{t("playlist.description")}</label>
                  <textarea 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder={t("playlist.descriptionPlaceholder")}
                    rows={3}
                    className="w-full p-2 rounded-md border border-border bg-muted"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">{t("playlist.visibility")}</label>
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="isPublic"
                      checked={isPublic}
                      onChange={(e) => setIsPublic(e.target.checked)}
                      className="mr-2"
                    />
                    <label htmlFor="isPublic">{t("playlist.public")}</label>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Track Search & Selection */}
            <div className="md:col-span-2">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">{t("playlist.addTracks")}</label>
                <div className="flex gap-2">
                  <input 
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t("search.searchTracks")}
                    className="flex-1 p-2 rounded-md border border-border bg-muted"
                  />
                  <Button 
                    onClick={handleSearch}
                    disabled={isLoading}
                    className="active:scale-95"
                  >
                    {t("common.search")}
                  </Button>
                </div>
              </div>
              
              {/* Search Results */}
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-2">{t("search.results")}</h3>
                {isLoading ? (
                  <div className="p-4 text-center text-muted-foreground">
                    {t("common.loading")}
                  </div>
                ) : searchResults.length > 0 ? (
                  <ul className="space-y-2 max-h-[200px] overflow-y-auto">
                    {searchResults.map((track) => (
                      <li 
                        key={track.id}
                        className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-md"
                      >
                        <div className="flex items-center">
                          <img 
                            src={track.coverUrl} 
                            alt={track.title}
                            className="w-10 h-10 rounded object-cover mr-3" 
                          />
                          <div>
                            <p className="font-medium text-sm">{track.title}</p>
                            <p className="text-xs text-muted-foreground">{track.artist}</p>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleAddTrack(track)}
                          className="active:scale-95"
                        >
                          <Plus size={16} />
                        </Button>
                      </li>
                    ))}
                  </ul>
                ) : searchQuery ? (
                  <div className="p-4 text-center text-muted-foreground">
                    {t("search.noResults")}
                  </div>
                ) : null}
              </div>
              
              {/* Selected Tracks */}
              <div>
                <h3 className="text-sm font-medium mb-2">{t("playlist.selectedTracks")} ({selectedTracks.length})</h3>
                {selectedTracks.length > 0 ? (
                  <ul className="space-y-2 max-h-[200px] overflow-y-auto">
                    {selectedTracks.map((track, index) => (
                      <li 
                        key={track.id}
                        className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-md"
                      >
                        <div className="flex items-center">
                          <span className="w-6 text-center text-muted-foreground">{index + 1}</span>
                          <img 
                            src={track.coverUrl} 
                            alt={track.title}
                            className="w-10 h-10 rounded object-cover mx-3" 
                          />
                          <div>
                            <p className="font-medium text-sm">{track.title}</p>
                            <p className="text-xs text-muted-foreground">{track.artist}</p>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleRemoveTrack(track.id)}
                          className="text-red-500 active:scale-95"
                        >
                          <X size={16} />
                        </Button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="p-4 text-center text-muted-foreground border border-dashed border-border rounded-md">
                    {t("playlist.noTracksSelected")}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-4 border-t border-border flex justify-end gap-2">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="active:scale-95"
          >
            {t("common.cancel")}
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!title.trim() || isLoading}
            className="active:scale-95"
          >
            {isLoading ? t("common.creating") : t("common.create")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreatePlaylistModal;
