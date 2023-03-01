import {Box, Grid} from '@mui/material'
import FunnyChess from '../FunnyChess'
import FunnyChessOnline from '../FunnyChessOnline'
import InfoBox from '../InfoBox'

export default function ChessShowcase(props){

    return(
        <Box sx={{marginBottom:'20vh'}}>
            <h1 style={{marginBottom: '0px'}}>Chess!</h1>
            <h6 style={{marginTop:'0px'}}>I dont know how to play chess so I just guessed the rules.</h6>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    margin: '0vh 10vw 0vh 10vw',
                    justifyContent: 'space-evenly'
                }}>
                <Grid container rowSpacing={{xs: '12', md:'1'}}>
                    <Grid item xs={12} md={6}><Box sx={{width: {xs: '80vw', md: '15vw'}, height: {xs: '50vh', md: '36vh' }, marginBottom: {xs:'5vh', md:'0vh'}}}><InfoBox/></Box></Grid>
                    <Grid item xs={12} md={6}><Box sx={{height: {xs: '90vw', md: '36vh'}}}><FunnyChessOnline/></Box></Grid>
                </Grid>
            </Box>
        </Box>
    )
}