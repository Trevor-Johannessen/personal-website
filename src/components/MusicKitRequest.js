import { FastForward, FastRewind, PlayArrow, Menu, HighlightOff } from '@mui/icons-material';
import { Box, Divider, Grid } from '@mui/material';
import {useState, useEffect} from 'react'
import api from '../Requests'

/*
    TODO: 
        -Add search
        -Add buffer inbetween columns so long text doesnt truncate right next to the next column (See ELO)
        -Convert time to proper format
        -Convert date to American
*/


export default function MusicKitRequest(props){
    const [state, setState] = useState({
        data: [],
        songs: [],
        history: [],
        cardOpened: -1,
        totalArtists: 1,
        showPopup: true,
        showQueue: false,
    })
    const [page, setPage] = useState(0);
    let cardColor = 0;

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

        async function getHistory(){
            let musicHistory = await api.getLastSong();
            if(musicHistory.status != 200) return;
            const data = musicHistory.data.data;
            if(data != state.history)
                modifyPage({'history': data})
        }

        // set timer for updating page elements
        const interval = setInterval(() => {
            console.log("Getting history.")
            getHistory();
          }, 5000);
        
          return () => clearInterval(interval);
    }, [page])

    const currentlyPlayingStyle={
        height: {xs: '10vh', md: '50vh'},
        width: {xs: '10vh', md: '50vh'},
        zIndex: 1,
        position: 'fixed',
        borderColor:'#F0F0F0',
        borderRadius:'20px',
        borderWidth:'3px',
        borderStyle:'solid',
        backgroundColor: 'white',
        filter: 'drop-shadow(-4px 4px 5px black)',
        bottom: '1vw',
        right: '1vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }

    const exitStyle = {

    }
    console.log(`url = ${state.history[0] ? `url(${state.history[0].attributes.artwork.url.replace('{h}x{w}', `${window.innerHeight*.25}x${window.innerHeight*.25}`)})` : ''}`)
    console.log(state.history[0] ? `url(${state.history[0].attributes.artwork.url.replace('{h}x{w}', `${window.innerHeight*.25}x${window.innerHeight*.25}`)})` : '');
    const currentlyPlayingPopup = (
        <Box sx={currentlyPlayingStyle}>
            <Box sx={{display: 'flex', flexDirection: 'row'}}>
                <Menu/>
                <HighlightOff style={{marginLeft: '25vh'}}/>
            </Box>
            <span style={{fontSize: 'small'}}>Now playing:</span>
            <Divider variant="middle" sx={{borderBottomWidth: '2px', width: '15vh', }}/>
            <span style={{fontSize: 'x-large'}}>{state.history[0] ? state.history[0].attributes.name : ''}</span>
            <span style={{fontSize: 'large'}}>{state.history[0] ? state.history[0].attributes.albumName : ''}</span>
            <img style={{height: '80%', width: '80%'}} src={state.history[0] ? `${state.history[0].attributes.artwork.url.replace('{w}x{h}', `${state.history[0].attributes.artwork.width}x${state.history[0].attributes.artwork.height}`)}` : ''}/>
            <Box sx={{display: 'flex', flexDirection: 'row'}}>
                
            </Box>
        </Box>
    )



    // modified https://stackoverflow.com/questions/19700283/how-to-convert-time-in-milliseconds-to-hours-min-sec-format-in-javascript
    function msToTime(duration) {
        var milliseconds = Math.floor((duration % 1000) / 100),
          seconds = Math.floor((duration / 1000) % 60),
          minutes = Math.floor((duration / (1000 * 60)) % 60),
          hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
      
        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10 && hours != '00') ? "0" + minutes : minutes;
        seconds = (seconds < 10 && minutes != '00') ? "0" + seconds : seconds;
      
        let time = '';
        time+= hours !== '00' ? `${hours}:` : ''
        time+= minutes !== '00' ? `${minutes}:` : ''
        time+= seconds;
        return time;
      }

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
        if(Math.ceil(state.totalArtists/25)-1 > page && i > 0)
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

    function getCardBackground(){
        cardColor++;
        return cardColor%2==0 ? 'lightgray':'white';
    }

    const createArtistCard = (i) => {
        let bgColor = getCardBackground();
        let textColor = 'black';
        if(state.cardOpened == i){bgColor = 'blue'; textColor = 'white';}
        return (<Box 
            sx={{...musicStyle, backgroundColor: bgColor, color: textColor, height: {xs: 'fit-content', md: '100%'}}} 
            onDoubleClick={() => selectCard(i)}
        >
            <span style={{paddingLeft:'5px',}}>{state.cardOpened == i ? 'v' : '>'} {state.data[i].name}</span>
        </Box>)
    }

    const createSongCards = () => {
        const spanStyle = {overflow: 'hidden', whiteSpace: 'nowrap', textAlign: 'left'}
        const header = (
            <Grid container style={{backgroundColor: getCardBackground(), paddingLeft:'3%',}}>
                <Grid item xs={12} md={3} style={spanStyle}>Title</Grid>
                <Grid item xs={12} md={1} style={spanStyle}>Time</Grid>
                <Grid item xs={12} md={2} style={spanStyle}>Artist</Grid>
                <Grid item xs={12} md={3} style={spanStyle}>Album</Grid>
                <Grid item xs={12} md={1} style={spanStyle}>Genre</Grid>
                <Grid item xs={12} md={1} style={spanStyle}>Date Released</Grid>
            </Grid>
        )
        let songs = state.songs.map((song) => {
            return(
            <Grid container style={{backgroundColor: getCardBackground(), paddingLeft:'3%'}}>
                <Grid item xs={12} md={3} style={spanStyle}>{song.name}</Grid>
                <Grid item xs={12} md={1} style={spanStyle}>{msToTime(song.duration)}</Grid>
                <Grid item xs={12} md={2} style={spanStyle}>{song.artist}</Grid>
                <Grid item xs={12} md={3} style={spanStyle}>{song.album}</Grid>
                <Grid item xs={12} md={1} style={spanStyle}>{song.genres}</Grid>
                <Grid item xs={12} md={1} style={spanStyle}>{song.releaseDate}</Grid>
            </Grid>
        )
        })
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
        width:{xs: '10%', md: '5%'},
        marginLeft: {xs: '3%', md: '0%'},
    }

    const nowPlayingStyle={
        backgroundColor: '#E0E0E0', 
        borderRadius: '15px 15px 15px 15px', 
        height:'95%', 
        width: {xs: '50%', md: '30%'},
        marginLeft: {xs: '5%', md: '18%'},
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
        <Box>
            {state.showPopup ? currentlyPlayingPopup : ''}
            <Box style={{height: `${props.height}`}}>
                <Box style={{height: '8%', backgroundColor:'#F0F0F0', display:'flex', flexDirection:'row'}}>
                    <FastRewind sx={{...iconStyle, marginLeft: '2%'}} onClick={() => flipPage(-1)}/>
                    <PlayArrow sx={iconStyle}/>
                    <FastForward sx={iconStyle} onClick={() => flipPage(1)}/>
                    <Box sx={nowPlayingStyle}>
                        <span style={{height:'95%', display:'inline-flex', alignItems:'center'}}>{state.data[state.cardOpened] != undefined ? state.data[state.cardOpened].name : ''}</span>
                        <div style={barStyle}></div>
                    </Box>
                    <Menu sx={iconStyle}/>
                </Box>
                <Box style={{display: 'flex', flexDirection: 'column', height: '92%', overflowY: 'scroll', overflowX: 'hidden'}}>
                    {cards}
                </Box>
            </Box>
        </Box>
    )
}