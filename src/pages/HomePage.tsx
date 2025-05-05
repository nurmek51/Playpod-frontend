
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import HorizontalList from "../components/HorizontalList";
import MediaCard from "../components/MediaCard";
import TrackList from "../components/TrackList";
import { getRecommendations, getNewReleases, getTopCharts } from "../api/musicService";
import { Track, Album, Playlist } from "../api/musicService";

const mockTracks: Track[] = [
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
  {
    id: "4",
    title: "Someone You Loved",
    artist: "Lewis Capaldi",
    album: "Divinely Uninspired To A Hellish Extent",
    duration: 182,
    coverUrl: "https://images.unsplash.com/photo-1504898770365-14faca6a7320?w=200&h=200&fit=crop",
    audioUrl: "#",
  },
  {
    id: "5",
    title: "Bad Guy",
    artist: "Billie Eilish",
    album: "When We All Fall Asleep, Where Do We Go?",
    duration: 194,
    coverUrl: "https://images.unsplash.com/photo-1598387993281-cecf8b71a8f8?w=200&h=200&fit=crop",
    audioUrl: "#",
  },
];

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
  {
    id: "4",
    title: "Coffee House",
    description: "Acoustic and indie tracks",
    coverUrl: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=200&h=200&fit=crop",
    trackCount: 22,
    owner: {
      id: "1",
      username: "PlayPod",
    },
  },
  {
    id: "5",
    title: "Party Anthems",
    description: "Get the party started",
    coverUrl: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=200&h=200&fit=crop",
    trackCount: 15,
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
  {
    id: "4",
    title: "Drake",
    subtitle: "Artist",
    imageUrl: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=200&h=200&fit=crop",
    type: "artist",
  },
  {
    id: "5",
    title: "Ariana Grande",
    subtitle: "Artist",
    imageUrl: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=200&h=200&fit=crop",
    type: "artist",
  },
];

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const [recommendations, setRecommendations] = useState<Track[]>(mockTracks);
  const [newReleases, setNewReleases] = useState<Album[]>(mockAlbums);
  const [featuredPlaylists, setFeaturedPlaylists] = useState<Playlist[]>(mockPlaylists);
  const [topTracks, setTopTracks] = useState<Track[]>(mockTracks);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would fetch data from the API
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Uncomment in real implementation
        // const recommendationsData = await getRecommendations();
        // const newReleasesData = await getNewReleases();
        // const topChartsData = await getTopCharts();
        
        // setRecommendations(recommendationsData.tracks);
        // setNewReleases(newReleasesData.albums);
        // setFeaturedPlaylists(recommendationsData.playlists);
        // setTopTracks(topChartsData.tracks);
        
        // Mock data for demo
        setTimeout(() => {
          setRecommendations(mockTracks);
          setNewReleases(mockAlbums);
          setFeaturedPlaylists(mockPlaylists);
          setTopTracks(mockTracks);
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error("Error fetching home page data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {/* Hero Banner */}
      <div className="bg-gradient-to-tr from-playpod-primary to-playpod-tertiary mb-10 py-16 px-6 rounded-2xl text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">{t("home.welcome")}</h1>
          <p className="text-lg md:text-xl opacity-90">
            Discover, share and enjoy millions of tracks
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-playpod-primary"></div>
        </div>
      ) : (
        <>
          {/* Recommended Section */}
          <HorizontalList title={t("home.recommendedForYou")}>
            {recommendations.map((track) => (
              <MediaCard
                key={track.id}
                id={track.id}
                title={track.title}
                subtitle={track.artist}
                imageUrl={track.coverUrl}
                type="album"
              />
            ))}
          </HorizontalList>

          {/* New Releases */}
          <HorizontalList title={t("home.newReleases")} viewAll="/new-releases">
            {newReleases.map((album) => (
              <MediaCard
                key={album.id}
                id={album.id}
                title={album.title}
                subtitle={album.artist}
                imageUrl={album.coverUrl}
                type="album"
              />
            ))}
          </HorizontalList>

          {/* Featured Playlists */}
          <HorizontalList title={t("home.featuredPlaylists")} viewAll="/playlists">
            {featuredPlaylists.map((playlist) => (
              <MediaCard
                key={playlist.id}
                id={playlist.id}
                title={playlist.title}
                subtitle={`${playlist.trackCount} tracks`}
                imageUrl={playlist.coverUrl}
                type="playlist"
              />
            ))}
          </HorizontalList>

          {/* Top Artists */}
          <HorizontalList title="Top Artists" viewAll="/artists">
            {mockArtists.map((artist) => (
              <MediaCard
                key={artist.id}
                id={artist.id}
                title={artist.title}
                subtitle={artist.subtitle}
                imageUrl={artist.imageUrl}
                type="artist"
              />
            ))}
          </HorizontalList>

          {/* Top Charts */}
          <div className="mb-10">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">{t("home.topCharts")}</h2>
              <a href="/charts" className="text-sm text-playpod-primary hover:underline">
                View all
              </a>
            </div>
            <TrackList tracks={topTracks} />
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
