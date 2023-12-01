import { useContext } from 'react'
import { Box } from '@mui/material'
import { keyframes } from 'styled-components'
import HomepageCard from './HomepageCard'
import './homepage.css'

export default function Homepage() {
    const cardCount = 5;
    const cards = [];
    const background = {
        backgroundColor: 'black',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height:'100%',
        justifyContent:'center',
        
    }
    for(let i=0;i<cardCount;i++){
        const welcome_text = ["Welcome", "to", "my", "website!", "👋"];
        const nav_text = ["About Me", "Experience", "Showcase", "Fun Stuff", "Tools"];
        const timer = .5+0.5*(cardCount-i);
        
        cards.push(
            <Box style={{display: 'grid'}}>
                <HomepageCard route={true} style={{opacity: 0, animation: `1.5s homepage-slidein-animation-fade 4s forwards`}} text={nav_text[i]}/>
                <HomepageCard text={welcome_text[i]} style={{animation: `${timer}s homepage-slidein-animation-welcome`}}/>

            </Box>
        )
    }
        
    return(
        <Box sx={background}>
            {cards}
        </Box>
    )
}