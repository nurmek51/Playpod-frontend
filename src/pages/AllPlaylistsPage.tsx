
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Album, Playlist } from "../api/musicService";
import MediaCard from "../components/MediaCard";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock data for playlists and albums
const mockPlaylists: Playlist[] = [
  {
    id: "1",
    title: "Chill Vibes",
    description: "Relaxing music to unwind",
    coverUrl: "https://images.unsplash.com/photo-1518892096458-a169843d7f7f?w=200&h=200&fit=crop",
    trackCount: 25,
    owner: { id: "1", username: "PlayPod" }
  },
  {
    id: "2",
    title: "Workout Mix",
    description: "High energy tracks to boost your workout",
    coverUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop",
    trackCount: 18,
    owner: { id: "1", username: "PlayPod" }
  },
  {
    id: "3",
    title: "Road Trip",
    description: "Perfect songs for long drives",
    coverUrl: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=200&h=200&fit=crop",
    trackCount: 30,
    owner: { id: "1", username: "PlayPod" }
  },
  {
    id: "4",
    title: "Coffee House",
    description: "Acoustic and indie tracks",
    coverUrl: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=200&h=200&fit=crop",
    trackCount: 22,
    owner: { id: "1", username: "PlayPod" }
  },
  {
    id: "5",
    title: "Party Anthems",
    description: "Get the party started",
    coverUrl: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=200&h=200&fit=crop",
    trackCount: 15,
    owner: { id: "1", username: "PlayPod" }
  },
  {
    id: "6",
    title: "Jazz Essentials",
    description: "Classic jazz standards",
    coverUrl: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=200&h=200&fit=crop",
    trackCount: 20,
    owner: { id: "1", username: "PlayPod" }
  }
];

const mockAlbums: Album[] = [
  {
    id: "1",
    title: "After Hours",
    artist: "The Weeknd",
    releaseDate: "2020-03-20",
    coverUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop",
    trackCount: 14
  },
  {
    id: "2",
    title: "÷",
    artist: "Ed Sheeran",
    releaseDate: "2017-03-03",
    coverUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&h=200&fit=crop",
    trackCount: 16
  },
  {
    id: "3",
    title: "The Kids Are Coming",
    artist: "Tones and I",
    releaseDate: "2019-08-30",
    coverUrl: "https://images.unsplash.com/photo-1527283232607-f89f83e1238f?w=200&h=200&fit=crop",
    trackCount: 6
  },
  {
    id: "4",
    title: "Divinely Uninspired To A Hellish Extent",
    artist: "Lewis Capaldi",
    releaseDate: "2019-05-17",
    coverUrl: "https://images.unsplash.com/photo-1504898770365-14faca6a7320?w=200&h=200&fit=crop",
    trackCount: 12
  },
  {
    id: "5",
    title: "When We All Fall Asleep, Where Do We Go?",
    artist: "Billie Eilish",
    releaseDate: "2019-03-29",
    coverUrl: "https://images.unsplash.com/photo-1598387993281-cecf8b71a8f8?w=200&h=200&fit=crop",
    trackCount: 14
  },
  {
    id: "6",
    title: "Future Nostalgia",
    artist: "Dua Lipa",
    releaseDate: "2020-03-27",
    coverUrl: "https://images.unsplash.com/photo-1496293455970-f8581aae0e3b?w=200&h=200&fit=crop",
    trackCount: 11
  }
];

const AllPlaylistsPage: React.FC = () => {
  const { t } = useTranslation();
  const { category } = useParams<{ category: string }>();
  const [items, setItems] = useState<(Playlist | Album)[]>([]);
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      
      // In a real app, fetch from API based on category
      // const data = await getItemsByCategory(category);
      
      // Mock data for demo
      let mockData: (Playlist | Album)[] = [];
      let pageTitle = "";
      
      switch(category) {
        case "new-releases":
          mockData = mockAlbums;
          pageTitle = t("home.newReleases");
          break;
        case "featured":
          mockData = mockPlaylists;
          pageTitle = t("home.featuredPlaylists");
          break;
        case "recommended":
          mockData = [...mockPlaylists.slice(0, 3), ...mockAlbums.slice(0, 3)];
          pageTitle = t("home.recommendedForYou");
          break;
        default:
          mockData = mockPlaylists;
          pageTitle = t("common.playlists");
      }
      
      setTimeout(() => {
        setItems(mockData);
        setTitle(pageTitle);
        setIsLoading(false);
      }, 500);
    };
    
    fetchData();
  }, [category, t]);
  
  const goBack = () => {
    window.history.back();
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-playpod-primary"></div>
      </div>
    );
  }
  
  return (
    <div>
      <div className="mb-8 flex items-center">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={goBack}
          className="mr-4 active:scale-95"
        >
          <ArrowLeft size={16} />
        </Button>
        <h1 className="text-3xl font-bold">{title}</h1>
      </div>
      
      {items.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {items.map(item => (
            <MediaCard
              key={item.id}
              id={item.id}
              title={item.title}
              subtitle={'artist' in item ? item.artist : `${item.trackCount} tracks`}
              imageUrl={item.coverUrl}
              type={'artist' in item ? 'album' : 'playlist'}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-muted-foreground">
          <p>{t("common.noItemsFound")}</p>
        </div>
      )}
    </div>
  );
};

export default AllPlaylistsPage;
