import { FastForward, FastRewind, PlayArrow } from '@mui/icons-material';
import { Box } from '@mui/material';
import {useState, useEffect} from 'react'
import api from '../Requests'

export default function MusicKitRequest(props){
    const [state, setState] = useState({
        data: [],
        cardOpened: -1,
        totalArtists: 1
    })
    const [page, setPage] = useState(0);

    async function modifyPage(dict){
        console.log("Modifying page");
        let copy = {...state};
        for(let key in dict)
            copy[key] = dict[key];
        setState(copy)
    }

    useEffect(()=>{
        async function getArtists(){
            console.log(`page = ${page}`)
            let musicData = await api.getMusicData(page);
            let artists = [];
            if(musicData.status != 200) return; // maybe add error page here 
            const data = musicData.data.data
            for(const key in data){
                let artist = data[key]
                artists.push({name: artist.attributes.name, id: artist.id});
            }
            console.log(artists);
            modifyPage({'data': artists, totalArtists: musicData.data.meta.total});
        }
        getArtists();
    }, [page])

    const selectCard = (i) => {
        if(state.cardOpened == i)
            modifyPage({cardOpened: -1})
        else 
        modifyPage({cardOpened: i})
    }

    const flipPage = (i) => {
        if(Math.ceil(state.totalArtists/25) > page && i > 0)
            setPage(page+1);
        else if(page > 0 && i < 0)
            setPage(page-1);
    }

    const musicStyle = {
        dispaly: 'flex',
        flexDirection: 'row',
        width: '100%', 
        height: `${100/state.data.length}%`,
        textAlign:'left',
        paddingLeft:'5px',
        userSelect: 'none',
    }

    let artistCards = [];
    for(let i = 0; i < state.data.length; i++){
        let bgColor = i%2 == 0 ? 'lightgray' : 'white';
        let textColor = 'black';
        if(state.cardOpened == i){bgColor = 'blue'; textColor = 'white';}
        artistCards.push((
            <div 
                style={{...musicStyle, backgroundColor: bgColor, color: textColor}} 
                onDoubleClick={() => selectCard(i)}
            >
                <span>{'>'} {state.data[i].name}</span>
            </div>
        ))
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
                    <span style={{height:'95%', display:'inline-flex', alignItems:'center'}}>{state.data[page.cardOpened] != undefined ? state.data[state.cardOpened].name : ''}</span>
                    <div style={barStyle}></div>
                </Box>
            </Box>
            <Box style={{display: 'flex', flexDirection: 'column', height: '92%', overflow: 'scroll',}}>
                {artistCards}
            </Box>
        </Box>
    )
}