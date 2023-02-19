import {useEffect, useState} from 'react'
import $, { timers } from 'jquery'
import logo from './logo.svg';
import './App.css';
import Terminal from "./components/Terminal"
import {Box, Button, Grid, Divider} from '@mui/material'
import DynamicGallery from './components/DynamicGallery';
import FunnyChess from './components/FunnyChess';
import TerminalShowcase from './components/Showcases/TerminalShowcase';
import ChessShowcase from './components/Showcases/ChessShowcase';
import MyImage from './components/MyImage';
import MusicKitRequest from './components/MusicKitRequest';

function App() {
    const [ip, setIP] = useState(0);
    useEffect(() => {




        // I was going to use this to ban my friend from accessing my website, but it would require publically
        // posting her IP to github so I cannot do that at this time.
        // $.getJSON("https://api.ipify.org?format=json", function(data) {
        //     setIP(data.ip);
        // })
    })




    return (
        <div className="App">
            <div id="banner" style={{position: 'sticky'}}>
                <div id="welcome-text">
                    <h6>Redo this in spring!</h6>
                </div>
                <Box xs={{display: 'flex', flexDirection: 'row'}} id="navbar-contents" >
                    <a style={{marginLeft: '1vw'}} href="#about-me" className="nav-link">About me</a>
                    <a style={{marginLeft: '1vw'}} href="#experience" className="nav-link">Experience</a>
                    <a style={{marginLeft: '1vw'}} href="#projects" className="nav-link">Projects</a>
                    <a style={{marginLeft: '1vw'}} href="#contact" className="nav-link">Contact</a>
                    <a style={{marginLeft: '1vw'}} href="#top" className="nav-link">Back to Top!</a>
                </Box>
            </div>
            <div id="top"></div>
            <div id="about-me">
                <h1 style={{margin: '0px'}}>Welcome to my website!</h1>
                <Grid container direction="row">
                    <Grid item xs={12} sm={4} sx={{width: {xs: '80vw', sm: '11vw'}, height: {xs:'90vh', sm: '30vh'}}} id="about-picture-container">
                        <MyImage/>
                    </Grid>
                    <Grid item sm={8} xs={12}>
                        <DynamicGallery/>
                    </Grid>
                </Grid>
            </div>
            <div id="experience">
                
            </div>
            <div id="projects">
                <TerminalShowcase />
                <Divider variant="middle" sx={{borderBottomWidth: '5px', width: '65vw', margin: '1vh 0px 3vh 17.5vw'}}/>
                <ChessShowcase/>
            </div>
            <div id="music">
                <MusicKitRequest height='80vh'/>
            </div>
            <div id="contact" style={{backgroundColor: 'black', height: '10vh', color: 'white'}}>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <span style={{margin: '2vh 0px 2vh 0px'}}>Contacts</span>
                    <Grid container style={{width: '50vw'}}>
                        <Grid item xs={6}><a href="mailto:trevor.johannessen@gmail.com" style={{color: '#FAF9F6'}}>Email</a></Grid>
                        <Grid item xs={6}><a href="https://www.linkedin.com/in/trevor-johannessen/" style={{color: '#FAF9F6'}}>LinkedIn</a></Grid>
                    </Grid>
                </div>
            </div>
        </div>
    );
}

export default App;
