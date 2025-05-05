
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const enTranslation = {
  navigation: {
    home: "Home",
    library: "Library",
    favorites: "Favorites",
    playlists: "Playlists",
    profile: "Profile",
    settings: "Settings",
    logout: "Logout"
  },
  auth: {
    login: "Login",
    register: "Register",
    username: "Username",
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm Password",
    forgotPassword: "Forgot Password?",
    noAccount: "Don't have an account?",
    haveAccount: "Already have an account?",
    signUp: "Sign Up",
    required: "Authentication Required",
    loginToFavorite: "Please login to add tracks to favorites"
  },
  search: {
    searchPlaceholder: "Search for songs, artists, albums...",
    searchTracks: "Search for tracks",
    noResults: "No results found",
    tryDifferent: "Try different keywords or check your spelling",
    tracks: "Tracks",
    artists: "Artists",
    albums: "Albums",
    playlists: "Playlists",
    results: "Search Results",
    resultsFor: "Results for",
    start: "Start searching",
    enterTerms: "Enter search terms to find music",
    artist: "Artist"
  },
  playlist: {
    title: "Title",
    album: "Album",
    duration: "Duration",
    createNew: "Create New Playlist",
    titlePlaceholder: "My Awesome Playlist",
    descriptionPlaceholder: "Describe your playlist...",
    uploadCover: "Upload Cover Image",
    visibility: "Visibility",
    public: "Public playlist",
    addTracks: "Add Tracks",
    selectedTracks: "Selected Tracks",
    noTracksSelected: "No tracks selected",
    created: "Playlist Created",
    createdSuccess: "'{name}' has been created successfully",
    createError: "There was an error creating your playlist",
    description: "Description"
  },
  common: {
    loading: "Loading...",
    cancel: "Cancel",
    create: "Create",
    creating: "Creating...",
    search: "Search",
    error: "Error"
  },
  library: {
    yourLibrary: "Your Library",
    createPlaylist: "Create a playlist"
  },
  favorites: {
    title: "Liked Songs",
    description: "All your favorite tracks in one place",
    empty: "You haven't liked any songs yet",
    added: "Added to Liked Songs",
    removed: "Removed from Liked Songs",
    error: "Failed to update favorites"
  },
  artist: {
    followers: "followers",
    popular: "Popular",
    albums: "Albums",
    noTracks: "No tracks available for this artist"
  }
};

const ruTranslation = {
  navigation: {
    home: "Главная",
    library: "Библиотека",
    favorites: "Избранное",
    playlists: "Плейлисты",
    profile: "Профиль",
    settings: "Настройки",
    logout: "Выйти"
  },
  auth: {
    login: "Вход",
    register: "Регистрация",
    username: "Имя пользователя",
    email: "Email",
    password: "Пароль",
    confirmPassword: "Подтвердите пароль",
    forgotPassword: "Забыли пароль?",
    noAccount: "Нет аккаунта?",
    haveAccount: "Уже есть аккаунт?",
    signUp: "Зарегистрироваться",
    required: "Требуется авторизация",
    loginToFavorite: "Пожалуйста, войдите, чтобы добавлять треки в избранное"
  },
  search: {
    searchPlaceholder: "Поиск песен, исполнителей, альбомов...",
    searchTracks: "Поиск треков",
    noResults: "Результаты не найдены",
    tryDifferent: "Попробуйте другие ключевые слова или проверьте правописание",
    tracks: "Треки",
    artists: "Исполнители",
    albums: "Альбомы",
    playlists: "Плейлисты",
    results: "Результаты поиска",
    resultsFor: "Результаты для",
    start: "Начните поиск",
    enterTerms: "Введите поисковый запрос для поиска музыки",
    artist: "Исполнитель"
  },
  playlist: {
    title: "Название",
    album: "Альбом",
    duration: "Длительность",
    createNew: "Создать новый плейлист",
    titlePlaceholder: "Мой плейлист",
    descriptionPlaceholder: "Опишите ваш плейлист...",
    uploadCover: "Загрузить обложку",
    visibility: "Видимость",
    public: "Публичный плейлист",
    addTracks: "Добавить треки",
    selectedTracks: "Выбранные треки",
    noTracksSelected: "Треки не выбраны",
    created: "Плейлист создан",
    createdSuccess: "'{name}' был успешно создан",
    createError: "Произошла ошибка при создании плейлиста",
    description: "Описание"
  },
  common: {
    loading: "Загрузка...",
    cancel: "Отмена",
    create: "Создать",
    creating: "Создание...",
    search: "Поиск",
    error: "Ошибка"
  },
  library: {
    yourLibrary: "Ваша библиотека",
    createPlaylist: "Создать плейлист"
  },
  favorites: {
    title: "Любимые треки",
    description: "Все ваши любимые треки в одном месте",
    empty: "Вы еще не добавили треки в избранное",
    added: "Добавлено в любимые треки",
    removed: "Удалено из любимых треков",
    error: "Не удалось обновить избранное"
  },
  artist: {
    followers: "подписчиков",
    popular: "Популярное",
    albums: "Альбомы",
    noTracks: "Нет доступных треков для этого исполнителя"
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslation,
      },
      ru: {
        translation: ruTranslation,
      },
    },
    lng: localStorage.getItem("language") || "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
