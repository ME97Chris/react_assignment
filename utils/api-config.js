const config = require("../package.json");

const API_KEY = config.projectConfig.apiKey;

const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_POSTER_URL = "https://image.tmdb.org/t/p";
const YOUTUBE_BASE_URL = "https://www.youtube.com/watch";

const APPEND_TO_RESPOND = {
    VIDEOS: "videos",
    CREDITS: "credits",
    RECOMMENDATIONS: "recommendations",
    SIMILAR: "similar",
};

const ENDPOINT = {
    NOW_PLAYING_MOVIES: "/movie/now_playing",
    UPCOMING_MOVIES: "/movie/upcoming",
    GENRES: "/genre/movie/list",
    MOVIES: "/movie",
};

export {API_KEY, BASE_URL, IMAGE_POSTER_URL, ENDPOINT, YOUTUBE_BASE_URL, APPEND_TO_RESPOND}