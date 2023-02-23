import axios from 'axios'

const api = axios.create({
    //baseURL: 'https://powerofthegem.com:5000',
    baseURL: 'http://localhost:5000'
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

export const setBoard = (board) => {
    return api.put('/chess/set-board')
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
    setBoard,
}
export default apis