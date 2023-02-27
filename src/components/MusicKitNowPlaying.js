import { FastForward, FastRewind, PlayArrow, Menu, HighlightOff, WindowSharp } from '@mui/icons-material';
import { Box, Button, Collapse, Divider, Fade, Grid } from '@mui/material';
import {useState, useEffect} from 'react'
import api from '../Requests'

export default function MusicKitNowPlaying(props) {
    const [history, setHistory] = useState([]);
    const [showHistory, setShowHistory] = useState([false, false])
    const imgSize = 300;

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

    function checkTransition(){
        if(window.innerWidth < 600)
            return [props.active, false];
        else
            return [false, props.active];
    }

    function toggleHistory(){
        if(window.innerWidth < 600)
            setShowHistory([false, !showHistory[1]]);
        else
            setShowHistory([!showHistory[0], false]);
    }

    const currentlyPlayingStyle={
        height: {xs: '60vh', md: '50vh'},
        width: {xs: '100vw', md: '50vh'},
        borderColor:'#F0F0F0',
        borderRadius:'20px',
        borderWidth:{xs: '0px', md: '3px'},
        borderStyle:'solid',
        backgroundColor: 'white',
        // filter: 'drop-shadow(-4px 4px 5px black)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: {xs: '50vh', md: '0px'},
    }

    const currentlyPlayingPopup = (
        <Box sx={currentlyPlayingStyle}>
            <Box sx={{display: 'flex', flexDirection: 'row'}}>
                <Button onClick={() => setShowHistory(!showHistory)} style={{color: 'black'}} disableRipple><Menu/></Button>
                <Button style={{marginLeft: '25vh', color: 'black'}} onClick={() => {console.log("Closing"); props.closeSelf()}} disableRipple><HighlightOff/></Button>
            </Box>
            <span style={{fontSize: 'small'}}>Now playing:</span>
            <Divider variant="middle" sx={{borderBottomWidth: '2px', width: '15vh', }}/>
            <span style={{fontSize: 'x-large'}}>{history[0] ? history[0].attributes.name : ''}</span>
            <span style={{fontSize: 'large'}}>{history[0] ? history[0].attributes.albumName : ''}</span>
            <img style={{minHeight: '70%', minWidth: '80%', boxShadow: '0 0 5px 2px black', margin:'4px 0px 4px 0px'}} src={history[0] ? `${history[0].attributes.artwork.url.replace('{w}x{h}', `${history[0].attributes.artwork.width}x${history[0].attributes.artwork.height}`)}` : ''}/>
            <Box sx={{display: 'flex', flexDirection: 'row'}}>
                
            </Box>
        </Box>
    )

    const mobilePopupScrollStyle = {
        height: {xs: '60vh', md: 'fit-content'},
        backgroundColor: 'transparent',
        zIndex: 1,
        position: 'fixed',
        bottom: {xs: '0px', md: '2vh'},
        right: {xs: '0px', md: '2vh'},
        overflowY:'scroll',
    }

    const historyStyle = {
        height: {xs: '0px', md: '60vh'},
        maxWidth: {xs: '0px', md: '40vh'},
        position: 'fixed',
        borderColor:'#F0F0F0',
        borderRadius:'20px',
        borderWidth:'3px',
        borderStyle:'solid',
        backgroundColor: 'white',
        filter: 'drop-shadow(-4px 4px 5px black)',
        bottom: '2vh',
        right: '55vh',
        display: 'flex',
        flexDirection: 'column',
        padding: '0px 10px 0px 10px',
        overflow:'hidden',
    }
    const songStyle = {
        display: 'flex',
        flexDirection: 'row',
        minHeight: '5vh',
        width: '100%',
        marginBottom: '5px',
        backgroundColor: '#F0F0F0',
        borderRadius: '20px',
        margin:'5px 0px 5px 0px',
        overflow:'hidden',
    }

    const historyCard = (
            <Box sx={historyStyle}>
                <span>History:</span>
                <Box sx={{display: 'flex', flexDirection: 'column', alignItems:'space-evenly', overflow:'scroll'}}>
                    {history.map((song) => {return (
                    <div style={songStyle}>
                        <img style={{height: `5vh`, width: `5vh`, boxShadow: '0 0 5px 2px black', marginLeft:'3px', overflow: 'hidden'}} src={`${song.attributes.artwork.url.replace('{w}x{h}', `${imgSize}x${imgSize}`)}`}/>
                        <span style={{maxWidth: '20vw', padding:'0px 10px 0px 10px'}}>{song.attributes.name}</span>
                    </div>
                    )})}
                </Box>
            </Box>
    )



    return (
        <Box sx={{display: 'flex', flexDirection:'row', position:'absolute'}}>
            <Box sx={mobilePopupScrollStyle}>
                {/* <div style={{height: '40vh', width: '100vw', backgroundColor:'red'}}/> */}
                {window.innerWidth < 600 ? 
                <Collapse in={checkTransition()[0]} orientation="horizontal" timeout={1000}>{currentlyPlayingPopup}</Collapse> : 
                <Fade in={checkTransition()[1]} timeout={{enter: 1000, exit: 1500}}>{currentlyPlayingPopup}</Fade>}
            </Box>
            
            <Fade in={props.active && showHistory[1]} timeout={{enter: 1000, exit: 1500}}>{historyCard}</Fade>
                       
        </Box>
    )
}