import { FastForward, FastRewind, PlayArrow, Menu, HighlightOff } from '@mui/icons-material';
import { Box, Button, Divider, Fade, Grid } from '@mui/material';
import {useState, useEffect} from 'react'
import api from '../Requests'

export default function MusicKitNowPlaying(props) {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        async function getHistory(){
            let musicHistory = await api.getLastSong();
            if(musicHistory.status != 200) return;
            const data = musicHistory.data.data;
            if(data != history){
                setHistory(data);
            }
        }

        // set timer for updating page elements
        const interval = setInterval(() => {
            getHistory();
          }, 5000);
        
          return () => clearInterval(interval);
    }, [])



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
    const currentlyPlayingPopup = (
        <Fade in={props.active}>
            <Box sx={currentlyPlayingStyle}>
                <Box sx={{display: 'flex', flexDirection: 'row'}}>
                    <Menu/>
                    <Button style={{marginLeft: '25vh', color: 'black'}} onClick={() => props.closeSelf()}><HighlightOff/></Button>
                </Box>
                <span style={{fontSize: 'small'}}>Now playing:</span>
                <Divider variant="middle" sx={{borderBottomWidth: '2px', width: '15vh', }}/>
                <span style={{fontSize: 'x-large'}}>{history[0] ? history[0].attributes.name : ''}</span>
                <span style={{fontSize: 'large'}}>{history[0] ? history[0].attributes.albumName : ''}</span>
                <img style={{height: '80%', width: '80%', boxShadow: '0 0 5px 2px black', marginTop:'4px'}} src={history[0] ? `${history[0].attributes.artwork.url.replace('{w}x{h}', `${history[0].attributes.artwork.width}x${history[0].attributes.artwork.height}`)}` : ''}/>
                <Box sx={{display: 'flex', flexDirection: 'row'}}>
                    
                </Box>
            </Box>
        </Fade>
    )




    return (
        <Box sx={{display: 'flex', flexDirection:'row'}}>
            {currentlyPlayingPopup}
        </Box>
    )
}