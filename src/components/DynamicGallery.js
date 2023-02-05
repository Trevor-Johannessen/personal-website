import { Button, createTheme, Grid } from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box } from "@mui/system";
import { useSpring, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import { useState } from 'react'
import { crackspy,fc2,PyroIcon,StarbucksIcon,Walmartragdoll,wraithicon, campus1, campus2, campus3, campus4, logo } from '../resources/images/index.js'
import LunchDiningOutlinedIcon from '@mui/icons-material/LunchDiningOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';
import PedalBikeOutlinedIcon from '@mui/icons-material/PedalBikeOutlined';
import PetsIcon from '@mui/icons-material/Pets';

export default function DynamicGallery(props){
    const [currentSet, changeSet] = useState('test');
    const [position, setPosition] = useState(0);
    const height = 30;
    const width = 60;
    const transition = useSpring({
        to: { transform: `translateX(-${position*(height/3+3)}vw)` },
    })

    const imageSet = {
        languages: [],
        education: [logo, campus1, campus2, campus3, campus4],
        hobbies: [],
        pets: [],
        food: [],
        test: [crackspy, fc2, PyroIcon, StarbucksIcon, Walmartragdoll, wraithicon],
    }

    const imageStyle = {
        marginLeft: '3vw',
        width: {xs: `${height/2}vw`, md: `${height/3}vw`},
        height: '17vh',
        borderRadius: '20px',
        borderStyle: 'solid',
        borderWidth: '2px 5px 7px 2px',
        borderColor: 'black',
        backgroundColor: 'white',
    }


    const images = (
        imageSet[currentSet].map((image) => (<img style={{...imageStyle}} src={image} draggable={false}></img>))
    )
    
    const radioButton = {
        m: 0,
        border: 1.5,
        boxShadow: "3px 5px 10px black",
        borderColor: '#2F2F2F',
        backgroundColor: '#EEE5E9',
        borderRadius: '50%',
        height: {xs: '3rem', md:'6rem'},
        width: {xs: '3rem', md:'6rem'},
        minWidth: '0px',
        '&:hover': {
            backgroundColor: '#2F2F2F',
            borderColor: '#EEE5E9',
        }
    }

    const iconStyle = {
        fontSize: '50px',
        color: 'black',
        width: '80%',
        height: '80%',
        margin: '0px 0px 0px 0px',
        padding: '0px 0px 0px 0px',
    }

    const scrollButtonStyle = {
        width: {xs: '10vw', md: '5vw'},
        minWidth: {xs: '10vw', md: '5vw'},
        height: `${height}vh`,
        display: 'flex',        
        alignItems: 'center',
        justifyContent: 'center',
    }

    const handleScroll = (direction) => {
        console.log(`direction = ${direction}`)
        if(position+direction > -1 && (position+direction) <= imageSet[currentSet].length)
            setPosition(position + direction);
        
    }

    return(
        <Box style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <p id="about-paragraph">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis quae, nesciunt odit numquam qui provident quisquam iusto dolores, minima fuga id voluptatem earum quos veniam error aliquam, porro voluptas impedit vel tempore natus eos possimus. Ad incidunt, quibusdam dicta, inventore delectus reprehenderit dolorum velit quo esse maxime molestiae ducimus sed deleniti eaque similique soluta deserunt sint veniam porro. Laudantium, libero ab. Quis eveniet fuga possimus non magni, repudiandae cupiditate quaerat animi dignissimos nam doloribus consequatur asperiores culpa, exercitationem ex! Obcaecati quae expedita nobis, consequatur sed mollitia laborum voluptatem quam impedit commodi deleniti maxime qui possimus architecto rem. Neque, autem aperiam?    
            </p>
            <Grid container alignItems="center" justifyContent="center" sx={{marginLeft: '0px', marginBottom:'10px'}} spacing={5}>
                <Grid item style={{paddingLeft: '0vw'}} xs={2}><Button onClick={() => {changeSet('education')}} sx={{...radioButton}}><SchoolOutlinedIcon sx={{...iconStyle}}/></Button></Grid>
                <Grid item style={{paddingLeft: '0vw'}} xs={2}><Button onClick={() => {changeSet('languages')}} sx={{...radioButton}}><CodeOutlinedIcon sx={{...iconStyle}}/></Button></Grid>
                <Grid item style={{paddingLeft: '0vw'}} xs={2}><Button onClick={() => {changeSet('hobbies')}} sx={{...radioButton}}><PedalBikeOutlinedIcon sx={{...iconStyle}}/></Button></Grid>
                <Grid item style={{paddingLeft: '0vw'}} xs={2}><Button onClick={() => {changeSet('pets')}} sx={{...radioButton}}><PetsIcon sx={{...iconStyle}}/></Button></Grid>
                <Grid item style={{paddingLeft: '0vw'}} xs={2}><Button onClick={() => {changeSet('food')}} sx={{...radioButton}}><LunchDiningOutlinedIcon sx={{...iconStyle}}/></Button></Grid>
            </Grid>

            <div>
                <Box sx={{
                    display: 'flex', 
                    flexDirection: 'row',
                    width: {xs: `${width*1.5}vw`, md: `${width}vw`},
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
                    <Button sx={{...scrollButtonStyle}} onClick={() => handleScroll(-1)}>
                        <ArrowBackIosNewIcon sx={{width: '3vw', height: '3vw', color:'rgba(157, 161, 162, .8)'}}/>
                    </Button>
                    <div style={{
                        height: `${height*.8}vh`,
                        overflow: 'hidden',
                    }}>
                        <animated.div style={{
                            ...transition,
                            zIndex: 0,
                            display: 'flex', 
                            flexDirection: 'row', 
                            height: `${height*.8}vh`,
                            position: 'relative',
                            float: 'left',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        >
                            {images}
                        </animated.div>
                    </div>
                    <Button sx={{...scrollButtonStyle, }}  onClick={() => handleScroll(1)}>
                        <ArrowForwardIosIcon sx={{width: '3vw', height: '3vw', color:'rgba(157, 161, 162, .8)'}}/>
                    </Button>
                </Box>
            </div>
        </Box>
    )
}