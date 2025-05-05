
import axiosInstance from "./axiosConfig";

// Types
export interface Track {
  id: string;
  title: string;
  artist: string;
  album?: string;
  duration: number;
  coverUrl: string;
  audioUrl: string;
}

export interface Playlist {
  id: string;
  title: string;
  description?: string;
  coverUrl: string;
  trackCount: number;
  owner: {
    id: string;
    username: string;
  };
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  releaseDate: string;
  coverUrl: string;
  trackCount: number;
}

// Playlists APIs
export const getUserPlaylists = async () => {
  try {
    const response = await axiosInstance.get("/api/playlists/playlists/?me=true");
    return response.data;
  } catch (error) {
    console.error("Get user playlists error:", error);
    throw error;
  }
};

export const createPlaylist = async (title: string, description?: string) => {
  try {
    const response = await axiosInstance.post("/api/playlists/playlists/", {
      title,
      description,
    });
    return response.data;
  } catch (error) {
    console.error("Create playlist error:", error);
    throw error;
  }
};

export const getPlaylistById = async (playlistId: string) => {
  try {
    const response = await axiosInstance.get(`/api/playlists/playlists/${playlistId}/`);
    return response.data;
  } catch (error) {
    console.error(`Get playlist ${playlistId} error:`, error);
    throw error;
  }
};

export const updatePlaylist = async (playlistId: string, data: Partial<Playlist>) => {
  try {
    const response = await axiosInstance.put(`/api/playlists/playlists/${playlistId}/`, data);
    return response.data;
  } catch (error) {
    console.error(`Update playlist ${playlistId} error:`, error);
    throw error;
  }
};

export const deletePlaylist = async (playlistId: string) => {
  try {
    await axiosInstance.delete(`/api/playlists/playlists/${playlistId}/`);
  } catch (error) {
    console.error(`Delete playlist ${playlistId} error:`, error);
    throw error;
  }
};

export const getPlaylistTracks = async (playlistId: string) => {
  try {
    const response = await axiosInstance.get(`/api/playlists/playlists/${playlistId}/tracks/`);
    return response.data;
  } catch (error) {
    console.error(`Get playlist ${playlistId} tracks error:`, error);
    throw error;
  }
};

export const addTrackToPlaylist = async (playlistId: string, trackId: string) => {
  try {
    const response = await axiosInstance.post(`/api/playlists/playlists/${playlistId}/add_track/`, {
      track_id: trackId,
    });
    return response.data;
  } catch (error) {
    console.error(`Add track to playlist ${playlistId} error:`, error);
    throw error;
  }
};

export const removeTrackFromPlaylist = async (playlistId: string, trackId: string) => {
  try {
    await axiosInstance.delete(`/api/playlists/playlists/${playlistId}/remove_track/`, {
      data: { track_id: trackId },
    });
  } catch (error) {
    console.error(`Remove track from playlist ${playlistId} error:`, error);
    throw error;
  }
};

// Charts and Recommendations
export const getTopCharts = async (limit = 50) => {
  try {
    const response = await axiosInstance.get(`/api/charts/top-charts/?limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error("Get top charts error:", error);
    throw error;
  }
};

export const getTopAlbums = async (limit = 25) => {
  try {
    const response = await axiosInstance.get(`/api/charts/top-albums/?limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error("Get top albums error:", error);
    throw error;
  }
};

export const getNewReleases = async (limit = 50) => {
  try {
    const response = await axiosInstance.get(`/api/charts/new-releases/?limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error("Get new releases error:", error);
    throw error;
  }
};

export const getRecommendations = async () => {
  try {
    const response = await axiosInstance.get("/api/playlists/recommendations/");
    return response.data;
  } catch (error) {
    console.error("Get recommendations error:", error);
    throw error;
  }
};

// Favorites APIs
export const getFavorites = async () => {
  try {
    const response = await axiosInstance.get("/api/accounts/favorites/");
    return response.data;
  } catch (error) {
    console.error("Get favorites error:", error);
    throw error;
  }
};

export const addToFavorites = async (trackId: string) => {
  try {
    const response = await axiosInstance.post("/api/accounts/favorites/add/", {
      track_id: trackId,
    });
    return response.data;
  } catch (error) {
    console.error("Add to favorites error:", error);
    throw error;
  }
};

export const removeFromFavorites = async (trackId: string) => {
  try {
    const response = await axiosInstance.post("/api/accounts/favorites/remove/", {
      track_id: trackId,
    });
    return response.data;
  } catch (error) {
    console.error("Remove from favorites error:", error);
    throw error;
  }
};

// Search API
export const search = async (query: string, limit = 10) => {
  try {
    const response = await axiosInstance.get(`/api/charts/top-charts/?q=${query}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error("Search error:", error);
    throw error;
  }
};
