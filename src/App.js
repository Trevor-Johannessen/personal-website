import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homepage from './components/Homepage/Homepage'
import Aboutme from './components/Aboutme/Aboutme';
import Experience from './components/Experience/Experience'
import Fun from './components/Fun/Fun';
import Showcase from './components/Showcase/Showcase';
import Tools from './components/Tools/Tools';
import Blog from './components/Blog/Blog';
function App() {
return (
    <BrowserRouter>
        <Routes>
            <Route path="/" exact element={<Homepage/>} />
            <Route path="/About Me/" exact element={<Aboutme/>} />
            <Route path="/Experience/" exact element={<Experience/>} />
            <Route path="/Showcase/" exact element={<Showcase/>} />
            <Route path="/Fun Stuff/" exact element={<Fun/>} />
            <Route path="/Tools/" exact element={<Tools/>} />
            <Route path="/Blog/" exact element={<Blog/>} />
        </Routes>
    </BrowserRouter>
);
}

export default App;
