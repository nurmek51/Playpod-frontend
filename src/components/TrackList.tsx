
import React from "react";
import { useTranslation } from "react-i18next";
import { Play, MoreHorizontal } from "lucide-react";
import { usePlayer } from "../contexts/PlayerContext";
import FavoriteButton from "./FavoriteButton";
import { Track } from "../api/musicService";

interface TrackListProps {
  tracks: Track[];
  showAlbum?: boolean;
  showCover?: boolean;
}

const TrackList: React.FC<TrackListProps> = ({
  tracks,
  showAlbum = true,
  showCover = true,
}) => {
  const { t } = useTranslation();
  const { playTrack } = usePlayer();

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  const handlePlayTrack = (track: Track) => {
    playTrack(track);
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-max table-auto">
        <thead>
          <tr className="border-b border-border text-left">
            <th className="px-4 py-3 w-12">#</th>
            <th className="px-4 py-3">{t("playlist.title")}</th>
            {showAlbum && <th className="px-4 py-3">{t("playlist.album")}</th>}
            <th className="px-4 py-3 text-right">{t("playlist.duration")}</th>
            <th className="px-4 py-3 w-12"></th>
          </tr>
        </thead>
        <tbody>
          {tracks.map((track, index) => (
            <tr
              key={track.id}
              className="hover:bg-muted/50 transition-colors group border-b border-border"
            >
              <td className="px-4 py-3 text-muted-foreground">
                <div className="relative flex items-center justify-center w-6">
                  <span className="group-hover:hidden">{index + 1}</span>
                  <div 
                    className="hidden group-hover:flex cursor-pointer active:scale-90 transition-transform"
                    onClick={() => handlePlayTrack(track)}
                  >
                    <Play size={16} className="text-playpod-primary" />
                  </div>
                </div>
              </td>
              <td className="px-4 py-3">
                <div 
                  className="flex items-center cursor-pointer active:scale-98 transition-transform"
                  onClick={() => handlePlayTrack(track)}
                >
                  {showCover && (
                    <img
                      src={track.coverUrl}
                      alt={track.title}
                      className="h-10 w-10 object-cover rounded mr-3"
                    />
                  )}
                  <div>
                    <div className="font-medium">{track.title}</div>
                    <div className="text-sm text-muted-foreground">{track.artist}</div>
                  </div>
                </div>
              </td>
              {showAlbum && <td className="px-4 py-3 text-muted-foreground">{track.album || "-"}</td>}
              <td className="px-4 py-3 text-muted-foreground text-right">
                {formatDuration(track.duration)}
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <FavoriteButton trackId={track.id} />
                  <button className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-foreground transition-opacity active:scale-95">
                    <MoreHorizontal size={18} />
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
