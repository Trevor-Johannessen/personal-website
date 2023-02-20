import axios from 'axios'

const api = axios.create({
    //baseURL: 'https://powerofthegem.com:5000',
    baseURL: 'http://localhost:5000'
})

export const checkIP = () => {
    return api.get('/whoami/');
}
export const getMusicData = (page) => {
return api.get(`/music-data/?page=${page}`);
}
export const getArtistData = (id) => {
    return api.get(`/artist-data/?artist=${id}`);
}
export const getAlbumData = (id) => {
    return api.get(`/album-data/?album=${id}`)
}
export const getSongData = (id) => {
    return api.get(`/song-data/?song=${id}`)
}

const apis = {
    checkIP,
    getMusicData,
    getArtistData,
    getAlbumData,
    getSongData,
}
export default apis