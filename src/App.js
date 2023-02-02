import logo from './logo.svg';
import './App.css';
import Terminal from "./components/Terminal"
import me from './resources/images/me.jpg' 
import {Button, Grid, Divider} from '@mui/material'
import DynamicGallery from './components/DynamicGallery';
import FunnyChess from './components/FunnyChess';
import TerminalShowcase from './components/Showcases/TerminalShowcase';
import ChessShowcase from './components/Showcases/ChessShowcase';

function App() {
    return (
        <div className="App">
            <div id="banner" style={{position: 'sticky'}}>
                <div id="welcome-text">
                    <h6>Redo this in spring!</h6>
                </div>
                <div id="navbar-contents" >
                    <a href="#about-me" class="nav-link">About me</a>
                    <a href="#experience" class="nav-link">Experience</a>
                    <a href="#projects" class="nav-link">Projects</a>
                    <a href="#contact" class="nav-link">Contact</a>
                    <a href="#top" class="nav-link">Back to Top!</a>
                </div>
            </div>
            <div id="top"></div>
            <div id="about-me">
                <h1 style={{margin: '0px'}}>Welcome to my website!</h1>
                <Grid container direction="row">
                    <Grid item xs={4} id="about-picture-container">
                    <img src={me} id="about-picture"/>
                    </Grid>
                    <Grid item xs={8} >
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
            <div id="contact">

            </div>
        </div>
    );
}

export default App;
