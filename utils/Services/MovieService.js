const axios = require("axios").default;

import { BASE_URL, API_KEY, IMAGE_POSTER_URL, ENDPOINT, YOUTUBE_BASE_URL} from "../api-config";
import LANGUAGES from "../Languages";

const HTTP_REQUEST = axios.create({
    baseURL: BASE_URL,
    params: {
        api_key: API_KEY,
},
});

const getNowPlaying = () => HTTP_REQUEST.get(ENDPOINT.NOW_PLAYING_MOVIES);
const getUpcoming = () => HTTP_REQUEST.get(ENDPOINT.UPCOMING_MOVIES);
const getMoviesById = (movieId, append_to_response = "") =>
    HTTP_REQUEST.get(
    `${ENDPOINT.MOVIES}/${movieId}`,
    append_to_response ? { params: { append_to_response } } : null
);
const getAllGenres = () => HTTP_REQUEST.get(ENDPOINT.GENRES);
const getPoster = (path) => `${IMAGE_POSTER_URL}/original${path}`;
const getLanguage = (language_iso) =>
LANGUAGES.find((language) => language.iso_639_1 === language_iso);
const getVideo = (key) => `${YOUTUBE_BASE_URL}?v=${key}`;

export {getNowPlaying, getUpcoming, getPoster, getAllGenres, getMoviesById, getLanguage, getVideo}