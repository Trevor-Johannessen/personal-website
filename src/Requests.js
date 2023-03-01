import axios from 'axios'

const api = axios.create({
    baseURL: 'https://powerofthegem.com:5000',
    //baseURL: 'http://127.0.0.1:5000'
})

// Photo calls
export const checkIP = () => {
    return api.get('/whoami/');
}

// Music Calls
export const getMusicData = (page) => {
return api.get(`/music/music-data/?page=${page}`);
}
export const getArtistData = (id) => {
    return api.get(`/music/artist-data/?artist=${id}`);
}
export const getAlbumData = (id) => {
    return api.get(`/music/album-data/?album=${id}`)
}
export const getSongData = (id) => {
    return api.get(`/music/song-data/?song=${id}`)
}
export const getLastSong = () => {
    return api.get('/music/get-last-song/');
}

// Chess calls
export const getChessProgress = () => {
    return api.get('/chess/game-in-progress/')
}
export const startNewGame = () => {
    return api.get('/chess/new-game/')
}
export const joinGame = (id) => {
    return api.get(`/chess/join-game/?id=${id}`)
}
export const getBoard = (id) => {
    return api.get(`/chess/get-board/?id=${id}`)
}
export const getSize = (id) => {
    return api.get(`/chess/get-size/?id=${id}`)
}
export const movePiece = (id, instruction) => {
    return api.post(`/chess/move-piece/?id=${id}`, {move: instruction})
}


const apis = {
    checkIP,
    getMusicData,
    getArtistData,
    getAlbumData,
    getSongData,
    getLastSong,
    getChessProgress,
    startNewGame,
    joinGame,
    getBoard,
    getSize,
    movePiece,
}
export default apis