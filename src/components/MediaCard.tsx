
import React from "react";
import { Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface MediaCardProps {
  id: string;
  title: string;
  subtitle?: string;
  imageUrl: string;
  type: "album" | "playlist" | "artist";
}

const MediaCard: React.FC<MediaCardProps> = ({
  id,
  title,
  subtitle,
  imageUrl,
  type,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/${type}/${id}`);
  };

  return (
    <div
      className="snap-start w-[160px] md:w-[180px] group cursor-pointer card-hover"
      onClick={handleClick}
    >
      <div className="relative rounded-lg overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="h-[160px] md:h-[180px] w-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button className="bg-playpod-primary text-white rounded-full p-2.5 transform translate-y-4 group-hover:translate-y-0 transition-transform">
            <Play size={20} className="ml-0.5" />
          </button>
        </div>
      </div>
      <div className="mt-2">
        <h3 className="font-medium text-sm truncate">{title}</h3>
        {subtitle && (
          <p className="text-xs text-muted-foreground truncate">{subtitle}</p>
        )}
      </div>
    </div>
  );
};

export default MediaCard;
