import React, { createContext, useContext, useState, useEffect } from "react";

interface Track {
  id: string;
  title: string;
  artist: string;
  album?: string;
  duration: number;
  coverUrl: string;
  audioUrl: string;
}

interface PlayerContextType {
  currentTrack: Track | null;
  queue: Track[];
  isPlaying: boolean;
  progress: number;
  volume: number;
  playTrack: (track: Track) => void;
  pauseTrack: () => void;
  resumeTrack: () => void;
  nextTrack: () => void;
  previousTrack: () => void;
  setProgress: (value: number) => void;
  setVolume: (value: number) => void;
  addToQueue: (track: Track) => void;
  clearQueue: () => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [queue, setQueue] = useState<Track[]>([]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgressState] = useState<number>(0);
  const [volume, setVolumeState] = useState<number>(() => {
    const savedVolume = localStorage.getItem("volume");
    return savedVolume ? parseFloat(savedVolume) : 0.7;
  });
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);

  // Initialize audio element
  useEffect(() => {
    const audio = new Audio();
    setAudioElement(audio);

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  // Handle volume changes
  useEffect(() => {
    if (audioElement) {
      audioElement.volume = volume;
      localStorage.setItem("volume", volume.toString());
    }
  }, [volume, audioElement]);

  // Handle track updates
  useEffect(() => {
    if (audioElement && currentTrack) {
      audioElement.src = currentTrack.audioUrl;
      
      if (isPlaying) {
        audioElement.play().catch(error => {
          console.error("Playback failed:", error);
          setIsPlaying(false);
        });
      }

      // Set up progress tracking
      const updateProgress = () => {
        if (audioElement.duration) {
          setProgressState(audioElement.currentTime / audioElement.duration);
        }
      };

      const trackEnded = () => {
        nextTrack();
      };

      audioElement.addEventListener("timeupdate", updateProgress);
      audioElement.addEventListener("ended", trackEnded);

      return () => {
        audioElement.removeEventListener("timeupdate", updateProgress);
        audioElement.removeEventListener("ended", trackEnded);
      };
    }
  }, [currentTrack, isPlaying]);

  const playTrack = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    setProgressState(0);
  };

  const pauseTrack = () => {
    if (audioElement) {
      audioElement.pause();
      setIsPlaying(false);
    }
  };

  const resumeTrack = () => {
    if (audioElement && currentTrack) {
      audioElement.play().catch(console.error);
      setIsPlaying(true);
    }
  };

  const nextTrack = () => {
    if (queue.length > 0) {
      const nextTrack = queue[0];
      const newQueue = queue.slice(1);
      setQueue(newQueue);
      playTrack(nextTrack);
    } else {
      // No more tracks in queue
      setIsPlaying(false);
    }
  };

  const previousTrack = () => {
    // This is simplified - ideally you'd maintain a history stack
    if (audioElement && audioElement.currentTime > 3) {
      // If more than 3 seconds in, restart the current track
      audioElement.currentTime = 0;
    } else {
      // Otherwise go to previous track (not implemented in this simplified version)
      // Would need a history stack
    }
  };

  const setProgress = (value: number) => {
    if (audioElement && currentTrack) {
      const newTime = value * audioElement.duration;
      audioElement.currentTime = newTime;
      setProgressState(value);
    }
  };

  const setVolume = (value: number) => {
    setVolumeState(value);
  };

  const addToQueue = (track: Track) => {
    setQueue((prevQueue) => [...prevQueue, track]);
  };

  const clearQueue = () => {
    setQueue([]);
  };

  return (
    <PlayerContext.Provider
      value={{
        currentTrack,
        queue,
        isPlaying,
        progress,
        volume,
        playTrack,
        pauseTrack,
        resumeTrack,
        nextTrack,
        previousTrack,
        setProgress,
        setVolume,
        addToQueue,
        clearQueue,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = (): PlayerContextType => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
};
