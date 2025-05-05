
import React, { useState } from "react";
import { usePlayer } from "../contexts/PlayerContext";
import { SkipBack, Play, Pause, SkipForward, Volume2, Volume1, VolumeX } from "lucide-react";

const Player: React.FC = () => {
  const {
    currentTrack,
    isPlaying,
    progress,
    volume,
    resumeTrack,
    pauseTrack,
    nextTrack,
    previousTrack,
    setProgress,
    setVolume,
  } = usePlayer();
  
  const [isDragging, setIsDragging] = useState(false);
  
  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setProgress(value);
  };
  
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setVolume(value);
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  const currentTime = currentTrack ? progress * currentTrack.duration : 0;
  const totalTime = currentTrack?.duration || 0;
  
  // Render mocked player if no track is playing
  const mockTrack = {
    title: "Shape of You",
    artist: "Ed Sheeran",
    coverUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&h=200&fit=crop",
    duration: 235,
  };
  
  const displayTrack = currentTrack || mockTrack;
  
  const getVolumeIcon = () => {
    if (volume === 0) return <VolumeX size={18} />;
    if (volume < 0.5) return <Volume1 size={18} />;
    return <Volume2 size={18} />;
  };
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border h-[70px] px-4 flex items-center z-40">
      {/* Track Info */}
      <div className="flex items-center flex-1 max-w-[30%]">
        <img
          src={displayTrack.coverUrl}
          alt={displayTrack.title}
          className="h-12 w-12 object-cover rounded"
        />
        <div className="ml-3 truncate">
          <div className="font-medium text-sm truncate">{displayTrack.title}</div>
          <div className="text-xs text-muted-foreground truncate">{displayTrack.artist}</div>
        </div>
      </div>
      
      {/* Player Controls */}
      <div className="flex-1 flex flex-col items-center">
        <div className="flex items-center gap-4">
          <button 
            onClick={previousTrack}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <SkipBack size={20} />
          </button>
          
          <button
            onClick={isPlaying ? pauseTrack : resumeTrack}
            className="bg-playpod-primary text-white rounded-full p-2 hover:bg-playpod-secondary transition-colors"
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
          </button>
          
          <button
            onClick={nextTrack}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <SkipForward size={20} />
          </button>
        </div>
        
        <div className="w-full max-w-md flex items-center gap-2 mt-1">
          <span className="text-xs text-muted-foreground min-w-[30px]">
            {formatTime(currentTime)}
          </span>
          
          <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={progress}
              onChange={handleProgressChange}
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
              className="w-full h-1.5 appearance-none bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-playpod-primary"
            />
            <div 
              className="h-full bg-playpod-primary" 
              style={{ width: `${progress * 100}%` }}
            ></div>
          </div>
          
          <span className="text-xs text-muted-foreground min-w-[30px]">
            {formatTime(totalTime)}
          </span>
        </div>
      </div>
      
      {/* Volume Control */}
      <div className="flex items-center gap-2 flex-1 max-w-[20%] justify-end">
        <button className="text-muted-foreground">
          {getVolumeIcon()}
        </button>
        
        <div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden hidden sm:block">
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-full h-1.5 appearance-none bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-playpod-primary"
          />
          <div 
            className="h-full bg-playpod-primary" 
            style={{ width: `${volume * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Player;
