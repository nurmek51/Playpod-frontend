
import React from "react";
import { Link } from "react-router-dom";
import { Play } from "lucide-react";
import { usePlayer } from "../contexts/PlayerContext";

interface MediaCardProps {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  type: "album" | "playlist" | "artist";
}

const MediaCard: React.FC<MediaCardProps> = ({ id, title, subtitle, imageUrl, type }) => {
  const { playTrack } = usePlayer();
  
  const getHref = () => {
    switch (type) {
      case "album":
        return `/album/${id}`;
      case "playlist":
        return `/playlist/${id}`;
      case "artist":
        return `/artist/${id}`;
      default:
        return "#";
    }
  };
  
  const handlePlay = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // In a real app, fetch track data and play
    console.log(`Play ${type}: ${id}`);
    
    // Mock for demo - would normally fetch first track of album/playlist
    // playTrack({ 
    //   id: "mock", 
    //   title, 
    //   artist: subtitle, 
    //   coverUrl: imageUrl,
    //   album: title,
    //   duration: 180
    // });
  };
  
  return (
    <Link 
      to={getHref()} 
      className="group relative block bg-card rounded-md overflow-hidden transition-transform hover:-translate-y-1 active:translate-y-0"
    >
      {/* Image container with consistent aspect ratio */}
      <div className="relative pb-[100%] w-full">
        <img 
          src={imageUrl} 
          alt={title} 
          className={`absolute inset-0 w-full h-full object-cover ${type === 'artist' ? 'rounded-full' : ''}`}
        />
        
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button 
            onClick={handlePlay}
            className="bg-playpod-primary text-white rounded-full p-3 shadow-lg transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-200 hover:bg-playpod-secondary active:scale-95"
          >
            <Play size={20} className="ml-0.5" />
          </button>
        </div>
      </div>
      
      <div className="p-3">
        <h3 className="font-medium text-sm truncate">{title}</h3>
        <p className="text-xs text-muted-foreground truncate">{subtitle}</p>
      </div>
    </Link>
  );
};

export default MediaCard;
