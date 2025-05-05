
import React from "react";
import { useTranslation } from "react-i18next";
import { Track } from "../api/musicService";
import { usePlayer } from "../contexts/PlayerContext";
import { Play, MoreVertical, Plus } from "lucide-react";
import FavoriteButton from "./FavoriteButton";

export interface TrackListProps {
  tracks: Track[];
  showAddToPlaylist?: boolean;
}

const TrackList: React.FC<TrackListProps> = ({ tracks, showAddToPlaylist = false }) => {
  const { t } = useTranslation();
  const { playTrack, currentTrack } = usePlayer();

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' + secs : secs}`;
  };

  const handlePlayTrack = (track: Track) => {
    playTrack(track);
  };

  const isActive = (trackId: string) => {
    return currentTrack?.id === trackId;
  };

  return (
    <div className="w-full">
      <table className="w-full border-collapse">
        <thead>
          <tr className="text-muted-foreground text-left text-sm border-b border-border">
            <th className="w-8 pb-2">#</th>
            <th className="pb-2">{t("track.title")}</th>
            <th className="pb-2 hidden md:table-cell">{t("track.album")}</th>
            <th className="pb-2 text-right pr-2">
              <span className="sr-only">{t("track.duration")}</span>
              <span aria-hidden="true">⏱</span>
            </th>
            <th className="w-10 pb-2">
              <span className="sr-only">{t("track.actions")}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {tracks.map((track, index) => (
            <tr
              key={track.id}
              className={`group hover:bg-muted transition-colors ${
                isActive(track.id) ? 'bg-muted/70' : ''
              }`}
            >
              <td className="py-2 px-2">
                <div className="relative flex items-center justify-center w-6 h-6">
                  <span className="group-hover:invisible">{index + 1}</span>
                  <button
                    className="absolute invisible group-hover:visible"
                    onClick={() => handlePlayTrack(track)}
                  >
                    <Play 
                      size={16} 
                      className="text-playpod-primary active:scale-90 transition-transform"
                      fill={isActive(track.id) ? "currentColor" : "none"}
                    />
                  </button>
                </div>
              </td>
              <td className="py-2">
                <div 
                  className="flex items-center cursor-pointer"
                  onClick={() => handlePlayTrack(track)}
                >
                  <img
                    src={track.coverUrl}
                    alt={track.title}
                    className="w-10 h-10 rounded mr-3 object-cover"
                  />
                  <div>
                    <div className={`font-medium ${isActive(track.id) ? 'text-playpod-primary' : ''}`}>
                      {track.title}
                    </div>
                    <div className="text-sm text-muted-foreground">{track.artist}</div>
                  </div>
                </div>
              </td>
              <td className="py-2 hidden md:table-cell">
                <span className="text-muted-foreground">{track.album}</span>
              </td>
              <td className="py-2 text-right text-muted-foreground pr-2">
                {formatDuration(track.duration)}
              </td>
              <td className="py-2 text-right pr-2">
                <div className="flex items-center justify-end space-x-1">
                  <FavoriteButton trackId={track.id} />
                  {showAddToPlaylist && (
                    <button className="p-1.5 rounded-full hover:bg-background active:scale-95 transition-transform">
                      <Plus size={16} />
                    </button>
                  )}
                  <button className="p-1.5 rounded-full hover:bg-background active:scale-95 transition-transform">
                    <MoreVertical size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TrackList;
