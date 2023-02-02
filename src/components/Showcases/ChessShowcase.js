import {Box} from '@mui/material'
import FunnyChess from '../FunnyChess'
import InfoBox from '../InfoBox'

export default function ChessShowcase(props){

    return(
        <Box>
            <h1 style={{marginBottom: '0px'}}>Chess!</h1>
            <h6 style={{marginTop:'0px'}}>I dont know how to play chess so I just guessed the rules.</h6>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    margin: '0vh 10vw 0vh 10vw',
                    justifyContent: 'space-evenly'
                }}>
                <InfoBox width={'15vw'} height={'36vh'}/>
                <FunnyChess width={36} height={36}/>
            </Box>
        </Box>
    )
}