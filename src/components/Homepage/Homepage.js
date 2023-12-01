import { useContext } from 'react'
import { Box } from '@mui/material'
import { keyframes } from 'styled-components'
import { Link } from 'react-router-dom'
//import './homepage.css'

export default function Homepage() {
    return(
        <Box>
            <ul>
                <li><Box 
                component={Link}
                to="/About Me/"
                >
                    About Me
                </Box></li>
                <li><Box 
                component={Link}
                to="/Experience/"
                >
                    Experience
                </Box></li>
                <li><Box 
                component={Link}
                to="/Showcase/"
                >
                    Showcase
                </Box></li>
                <li><Box 
                component={Link}
                to="/Fun Stuff/"
                >
                    Fun Stuff
                </Box></li>
                <li><Box 
                component={Link}
                to="/Blog/"
                >
                    Blog
                </Box></li>
            </ul>
        </Box>
    )
}