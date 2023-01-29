import logo from './logo.svg';
import './App.css';
import Terminal from "./components/Terminal"
import me from './resources/images/me.jpg' 
import {Button, Grid} from '@mui/material'
import DynamicGallery from './components/DynamicGallery';


function App() {
    return (
        <div className="App">
            <div id="banner">
                <div id="welcome-text">
                    <h1>Welcome!</h1>
                </div>
                <div id="navbar-contents">
                    <a href="#about-me" class="nav-link">About me</a>
                    <a href="#experience" class="nav-link">Experience</a>
                    <a href="#projects" class="nav-link">Projects</a>
                    <a href="#contact" class="nav-link">Contact</a>
                    <a href="#top" class="nav-link">Back to Top!</a>
                </div>
            </div>
            <div style={{height: '5vh'}}></div>
            <div id="top"></div>
            <Grid container id="about-me">
                <Grid item xs={12}><h1>Welcome to my website!</h1></Grid>
                <Grid item xs={4} id="about-picture-container">
                    <img src={me} id="about-picture"/>
                </Grid>
                <Grid item xs={8}>
                    <Grid container>
                        <Grid xs={12} item>
                            <p id="about-paragraph">
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet fugit qui, vero laborum repellendus explicabo cumque vel necessitatibus optio saepe distinctio eligendi illum delectus facilis blanditiis illo! Assumenda molestias autem deserunt voluptatibus doloremque? Et possimus perspiciatis maiores. Sed, laudantium dignissimos? Suscipit necessitatibus exercitationem dicta pariatur quia ipsa? Laudantium vero iusto iste molestias molestiae harum sapiente tempore eaque facere beatae temporibus error mollitia architecto odio quae dolore, itaque reprehenderit excepturi earum alias tempora, autem magni perspiciatis! Deleniti aut tempore impedit esse officiis quibusdam delectus eius, ullam quam perferendis, repellat nisi aliquid? Neque cum eos earum ipsam a architecto consequatur rerum quos magni delectus facere explicabo minima temporibus obcaecati impedit tempora soluta, nemo quae, at, odit quasi. Porro magnam, voluptatum ducimus dolorem alias minima nemo libero voluptatem! Repellendus officia, qui voluptas rem amet quod doloribus debitis vel tenetur repudiandae unde repellat excepturi ad? Praesentium eius autem dignissimos dolorem officiis nemo eveniet delectus.
                            </p>
                        </Grid>
                        <Grid item xs={12}>
                            <DynamicGallery/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <div id="experience">
                
            </div>
            <div id="projects">
                <div class="showcase">
                    <div class="showcase-split" align="left">
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur possimus suscipit inventore impedit perferendis distinctio velit minus ad. Facilis tenetur accusamus quisquam ad cupiditate impedit, nihil dolores enim quibusdam, tempora corrupti sed cum, sunt quam. Maxime explicabo dolor quibusdam ad sunt ea exercitationem, aperiam neque reiciendis at vel, fuga quaerat placeat, nesciunt quasi dicta? Repellat, consequatur maxime? Illum voluptatum quae velit atque eveniet sint libero, et ut error fuga asperiores nam tempora nobis ipsam reprehenderit modi odit temporibus vero inventore earum! Placeat voluptates quas veniam qui non asperiores! Odio vero provident quaerat neque iure doloribus, vel eaque sunt corporis unde.
                    </div>
                    <Terminal class="showcase-split slide-in-right-start" align="right">
                        
                    </Terminal>
                </div>
            </div>
            <div id="contact">

            </div>
        </div>
    );
}

export default App;
