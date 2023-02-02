import Showcase from "../Showcase";
import {Box, Grid} from '@mui/material'
import Terminal from "../Terminal";

export default function TerminalShowcase(props){


    return(
        <Showcase>
            <h1 style={{marginBottom: '0px'}}>Terminal</h1>
            <h6 style={{marginTop:'0px'}}>Current Space Filler.</h6>
            <Box
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    height: '60vh',
                }}
            >
                <Box style={{display: 'grid', placeItems: 'center', alignContent: 'center'}}>
                <Box
                style={{
                    backgroundColor: '#DEDEDE', 
                    padding: "4px", 
                    borderRadius:"10px",
                    borderWidth: "3px",
                    borderStyle: "solid",
                    width: '40vw',
                    margin: '5vw',
                }}>
                    <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore quasi maxime quidem vero mollitia fugiat ducimus aliquid recusandae accusantium sed. Aperiam exercitationem, libero nam porro unde sint sunt quia eum facere maxime obcaecati, asperiores nesciunt, error ut magni fuga assumenda neque. Nam explicabo blanditiis quasi ab quas esse nesciunt vitae!
                    </p>
                </Box>
                </Box>
                <Box style={{width: '50vw', margin:'2.5vw', marginLeft: '0'}}>
                    <Terminal/>
                </Box>
                
            </Box>
        </Showcase>
    )
} 