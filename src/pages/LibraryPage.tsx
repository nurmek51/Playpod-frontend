
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import MediaCard from "../components/MediaCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getUserPlaylists } from "../api/musicService";
import type { Album, Playlist } from "../api/musicService";

const mockAlbums: Album[] = [
  {
    id: "1",
    title: "After Hours",
    artist: "The Weeknd",
    releaseDate: "2020-03-20",
    coverUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop",
    trackCount: 14,
  },
  {
    id: "2",
    title: "÷",
    artist: "Ed Sheeran",
    releaseDate: "2017-03-03",
    coverUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&h=200&fit=crop",
    trackCount: 16,
  },
  {
    id: "3",
    title: "The Kids Are Coming",
    artist: "Tones and I",
    releaseDate: "2019-08-30",
    coverUrl: "https://images.unsplash.com/photo-1527283232607-f89f83e1238f?w=200&h=200&fit=crop",
    trackCount: 6,
  },
  {
    id: "4",
    title: "Divinely Uninspired To A Hellish Extent",
    artist: "Lewis Capaldi",
    releaseDate: "2019-05-17",
    coverUrl: "https://images.unsplash.com/photo-1504898770365-14faca6a7320?w=200&h=200&fit=crop",
    trackCount: 12,
  },
  {
    id: "5",
    title: "When We All Fall Asleep, Where Do We Go?",
    artist: "Billie Eilish",
    releaseDate: "2019-03-29",
    coverUrl: "https://images.unsplash.com/photo-1598387993281-cecf8b71a8f8?w=200&h=200&fit=crop",
    trackCount: 14,
  },
];

const mockPlaylists: Playlist[] = [
  {
    id: "1",
    title: "Chill Vibes",
    description: "Relaxing music to unwind",
    coverUrl: "https://images.unsplash.com/photo-1518892096458-a169843d7f7f?w=200&h=200&fit=crop",
    trackCount: 25,
    owner: {
      id: "1",
      username: "PlayPod",
    },
  },
  {
    id: "2",
    title: "Workout Mix",
    description: "High energy tracks to boost your workout",
    coverUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop",
    trackCount: 18,
    owner: {
      id: "1",
      username: "PlayPod",
    },
  },
  {
    id: "3",
    title: "Road Trip",
    description: "Perfect songs for long drives",
    coverUrl: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=200&h=200&fit=crop",
    trackCount: 30,
    owner: {
      id: "1",
      username: "PlayPod",
    },
  },
];

const mockArtists = [
  {
    id: "1",
    title: "The Weeknd",
    subtitle: "Artist",
    imageUrl: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=200&h=200&fit=crop",
    type: "artist",
  },
  {
    id: "2",
    title: "Ed Sheeran",
    subtitle: "Artist",
    imageUrl: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=200&h=200&fit=crop",
    type: "artist",
  },
  {
    id: "3",
    title: "Billie Eilish",
    subtitle: "Artist",
    imageUrl: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=200&h=200&fit=crop",
    type: "artist",
  },
];

const LibraryPage: React.FC = () => {
  const { t } = useTranslation();
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [artists, setArtists] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLibraryData = async () => {
      try {
        setIsLoading(true);
        // Uncomment in real implementation
        // const userPlaylists = await getUserPlaylists();
        // setPlaylists(userPlaylists);
        
        // Mock data for demo
        setTimeout(() => {
          setPlaylists(mockPlaylists);
          setAlbums(mockAlbums);
          setArtists(mockArtists);
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error("Error fetching library data:", error);
        setIsLoading(false);
      }
    };

    fetchLibraryData();
  }, []);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">{t("library.yourLibrary")}</h1>
      </div>

      <Tabs defaultValue="playlists" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="playlists">{t("library.playlists")}</TabsTrigger>
          <TabsTrigger value="albums">{t("library.albums")}</TabsTrigger>
          <TabsTrigger value="artists">{t("library.artists")}</TabsTrigger>
        </TabsList>

        {isLoading ? (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-playpod-primary"></div>
          </div>
        ) : (
          <>
            <TabsContent value="playlists" className="mt-0">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                <button className="flex flex-col items-center justify-center h-[200px] border-2 border-dashed border-border rounded-lg hover:border-playpod-primary hover:text-playpod-primary transition-colors">
                  <span className="text-3xl mb-2">+</span>
                  <span>{t("library.createPlaylist")}</span>
                </button>

                {playlists.map((playlist) => (
                  <div key={playlist.id} className="card-hover">
                    <MediaCard
                      id={playlist.id}
                      title={playlist.title}
                      subtitle={`${playlist.trackCount} tracks`}
                      imageUrl={playlist.coverUrl}
                      type="playlist"
                    />
                  </div>
                ))}
              </div>

              {playlists.length === 0 && (
                <div className="text-center py-10 text-muted-foreground">
                  <p>You haven't created any playlists yet.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="albums" className="mt-0">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                {albums.map((album) => (
                  <div key={album.id} className="card-hover">
                    <MediaCard
                      id={album.id}
                      title={album.title}
                      subtitle={album.artist}
                      imageUrl={album.coverUrl}
                      type="album"
                    />
                  </div>
                ))}
              </div>

              {albums.length === 0 && (
                <div className="text-center py-10 text-muted-foreground">
                  <p>No saved albums found.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="artists" className="mt-0">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                {artists.map((artist) => (
                  <div key={artist.id} className="card-hover">
                    <MediaCard
                      id={artist.id}
                      title={artist.title}
                      subtitle={artist.subtitle}
                      imageUrl={artist.imageUrl}
                      type="artist"
                    />
                  </div>
                ))}
              </div>

              {artists.length === 0 && (
                <div className="text-center py-10 text-muted-foreground">
                  <p>No followed artists found.</p>
                </div>
              )}
            </TabsContent>
          </>
        )}
      </Tabs>
    </div>
  );
};

export default LibraryPage;
