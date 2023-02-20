import { FastForward, FastRewind, PlayArrow } from '@mui/icons-material';
import { Box } from '@mui/material';
import {useState, useEffect} from 'react'
import api from '../Requests'

/*
    TODO: 
        Open card when double clicked
        Create waiting animation as data is retrieved
        Display data once loaded.
*/


export default function MusicKitRequest(props){
    const [state, setState] = useState({
        data: [],
        songs: [],
        cardOpened: -1,
        totalArtists: 1
    })
    const [page, setPage] = useState(0);
    const [cardOpened, setCardOpened] = useState(-1);
    // idea restructure everything and use ref to highlight cards blue and expand invisible songspaces under each artist card


    function modifyPage(dict){
        let copy = {...state};
        for(let key in dict)
            copy[key] = dict[key];
        setState(copy)
    }

    useEffect(()=>{
        async function getArtists(){
            let musicData = await api.getMusicData(page);
            let artists = [];
            if(musicData.status != 200) return; // maybe add error page here 
            const data = musicData.data.data
            for(const key in data){
                let artist = data[key]
                artists.push({name: artist.attributes.name, id: artist.id});
            }
            modifyPage({'data': artists, totalArtists: musicData.data.meta.total, cardOpened: -1});
        }
        getArtists();
    }, [page])

    async function selectCard(i){
        if(state.cardOpened == i){
            //setCardOpened(-1)
            modifyPage({songs: [], cardOpened: -1});
        }else{
            //setCardOpened(i);
            modifyPage({cardOpened: i, songs: []}) // maybe this will work, maybe it wont... lets see!
            let requestedSongs = await getSongs(state.data[i].id)
            modifyPage({songs: requestedSongs, cardOpened: i});
        }
    }

    const flipPage = (i) => {
        modifyPage({songs: []}); // this probably wont work due to async
        if(Math.ceil(state.totalArtists/25) > page && i > 0)
            setPage(page+1);
        else if(page > 0 && i < 0)
            setPage(page-1);
    }

    async function getSongs(id){
        async function asyncGetSongs(){
            const artistResponse = await api.getArtistData(id);
            if(artistResponse.status == 200)
                return artistResponse.data
            else
                return [];
        }
        let getSongsResult = await asyncGetSongs()
        console.log(getSongsResult)
        console.log("Returning")
        return getSongsResult;
    }

    const musicStyle = {
        dispaly: 'flex',
        flexDirection: 'row',
        width: '100%', 
        height: `${100/state.data.length}%`,
        textAlign:'left',
        userSelect: 'none',
    }

    const createArtistCard = (i) => {
        let bgColor = i%2 == 0 ? 'lightgray' : 'white';
        let textColor = 'black';
        if(state.cardOpened == i){bgColor = 'blue'; textColor = 'white';}
        return (<div 
            style={{...musicStyle, backgroundColor: bgColor, color: textColor}} 
            onDoubleClick={() => selectCard(i)}
        >
            <span style={{paddingLeft:'5px',}}>{state.cardOpened == i ? 'v' : '>'} {state.data[i].name}</span>
        </div>)
    }

    const createSongCards = () => {
        const header = (
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
                <span>Title</span>
                <span>Time</span>
                <span>Artist</span>
                <span>Album</span>
                <span>Genre</span>
                <span>Date Released</span>
            </div>
        )
        let songs = state.songs.map((song) => (
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
                <span>{song.name}</span>
                <span>{song.duration}</span>
                <span>{song.artist}</span>
                <span>{song.album}</span>
                <span>{song.genres}</span>
                <span>{song.dateReleased}</span>
            </div>
        ))
        return [header, ...songs];
    }

    let cards = [];
    for(let i = 0; i < state.data.length; i++){
        if(state.cardOpened == i){
            cards.push(createArtistCard(i))
            cards.push(createSongCards())
        }
        else{
            cards.push(createArtistCard(i))
        }
    }

    const iconStyle={
        height:'100%',
        width:'5%'
    }

    const nowPlayingStyle={
        backgroundColor: '#E0E0E0', 
        borderRadius: '15px 15px 15px 15px', 
        height:'95%', 
        width:'30%',
        marginLeft:'18%',
        userSelect:'none', 
        display: 'flex', 
        flexDirection: 'column',
        alignItems:'center', 
        justifyContent: 'center',
        overflow: 'hidden',
    }

    const barStyle={
        alignSelf: 'flex-start',
        backgroundColor:'blue',
        height:'5%',
        width:`${page*25*100/state.totalArtists}%`,
        borderRadius: '20px 20px 20px 20px', 
    }

    return(
        <Box style={{height: `${props.height}`}}>
            <Box style={{height: '8%', backgroundColor:'#F0F0F0', display:'flex', flexDirection:'row'}}>
                <FastRewind style={{...iconStyle, marginLeft: '2%'}} onClick={() => flipPage(-1)}/>
                <PlayArrow style={iconStyle}/>
                <FastForward style={iconStyle} onClick={() => flipPage(1)}/>
                <Box style={nowPlayingStyle}>
                    <span style={{height:'95%', display:'inline-flex', alignItems:'center'}}>{state.data[state.cardOpened] != undefined ? state.data[state.cardOpened].name : ''}</span>
                    <div style={barStyle}></div>
                </Box>
            </Box>
            <Box style={{display: 'flex', flexDirection: 'column', height: '92%', overflowY: 'scroll', overflowX: 'hidden'}}>
                {cards}
            </Box>
        </Box>
    )
}