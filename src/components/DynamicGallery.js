import { Button, createTheme, Grid } from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box } from "@mui/system";
import { useSpring, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import { useState } from 'react'
import { crackspy,fc2,PyroIcon,StarbucksIcon,Walmartragdoll,wraithicon } from '../resources/images/index.js'


export default function DynamicGallery(props){
    const [currentSet, changeSet] = useState('test');
    const [position, setPosition] = useState(0);
    const height = 30;
    const transition = useSpring({
        to: { transform: `translateX(-${position*4*(height/3+3)}vw)` },
    })

    const imageSet = {
        languages: [],
        education: [],
        hobbies: [],
        pets: [],
        food: [],
        test: [crackspy, fc2, PyroIcon, StarbucksIcon, Walmartragdoll, wraithicon],
    }
    const images = (
        imageSet[currentSet].map((image) => (<img style={{marginLeft: '3vw', width: `${height/3}vw`, height: '17vh', borderRadius: '20px', borderStyle: 'solid', borderWidth: '2px 5px 7px 2px', borderColor: 'black'}} src={image} draggable={false}></img>))
    )
    
    const radioButton = {
        m: 0,
        border: 1.5,
        boxShadow: "3px 5px 10px black",
        borderColor: '#2F2F2F',
        backgroundColor: '#EEE5E9',
        borderRadius: '50%',
        height: '6rem',
        width: '6rem',
        '&:hover': {
            backgroundColor: '#2F2F2F',
            borderColor: '#EEE5E9',
        }
    }

    const scrollButtonStyle = {
        width: '6vw',
        backgroundColor: 'rgb(0, 31, 138)',
        borderColor: 'black',
        borderStyle: 'solid',
        height: `${height}vh`,
        display: 'flex',        
        alignItems: 'center',
        justifyContent: 'center',
    }

    const handleScroll = (direction) => {
        console.log(`direction = ${direction}`)
        if(position+direction > -1 && 4*(position+direction) <= imageSet[currentSet].length)
            setPosition(position + direction);
        
    }

    return(
        <Box>
            <Grid container alignItems="center" justifyContent="center">
                <Grid item xs={2}><Button sx={{...radioButton}}></Button></Grid>
                <Grid item xs={2}><Button sx={{...radioButton}}></Button></Grid>
                <Grid item xs={2}><Button sx={{...radioButton}}></Button></Grid>
                <Grid item xs={2}><Button sx={{...radioButton}}></Button></Grid>
                <Grid item xs={2}><Button sx={{...radioButton}}></Button></Grid>
            </Grid>

            {/* finish this tutorial at some point: https://www.youtube.com/watch?v=FFUUhYhxh5Q */}
            <div>
                <div style={{
                    display: 'flex', 
                    flexDirection: 'row',
                    height: `${height}vh`,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderColor: 'black',
                    borderWidth: '3px',
                    borderRadius: '25px',
                    borderStyle: 'solid',
                    backgroundColor: '#172A3A',
                }}
                >
                    <Button style={{...scrollButtonStyle, borderWidth: '0px 3px 0px 0px', borderRadius: '25px 0px 0px 25px',}} onClick={() => handleScroll(-1)}>
                        <ArrowBackIosNewIcon style={{width: '3vw', height: '3vw', color:'rgba(157, 161, 162, .8)'}}/>
                    </Button>
                    <div style={{
                        height: `${height*.8}vh`,
                        overflow: 'hidden',
                    }}>
                        <animated.div style={{
                            ...transition,
                            display: 'flex', 
                            flexDirection: 'row', 
                            height: `${height*.8}vh`,
                            position: 'relative',
                            float: 'left',
                        }}
                        >
                            {images}
                        </animated.div>
                    </div>
                    <Button style={{...scrollButtonStyle, borderWidth: '0px 0px 0px 3px', borderRadius: '0px 25px 25px 0px',}}  onClick={() => handleScroll(1)}>
                        <ArrowForwardIosIcon style={{width: '3vw', height: '3vw', color:'rgba(157, 161, 162, .8)'}}/>
                    </Button>
                </div>
            </div>
        </Box>
    )
}