import { Button, createTheme, Grid } from "@mui/material";
import { green } from "@mui/material/colors";
import { Box } from "@mui/system";
import {useState} from 'react'
import crackspy from '../resources/images/test/crackspy.jpg'
import fc2 from '../resources/images/test/fc2.png'
import PyroIcon from '../resources/images/test/PyroIcon.png'
import StarbucksIcon from '../resources/images/test/StarbucksIcon.png'
import Walmartragdoll from '../resources/images/test/Walmartragdoll.PNG'
import wraithicon from '../resources/images/test/wraithicon.png'

export default function DynamicGallery(props){
    const [xPos, setXPos] = useState(0);
    

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

    return(
        <Box >
            <Grid container alignItems="center" justifyContent="center">
                <Grid item xs={2}><Button sx={{...radioButton}}></Button></Grid>
                <Grid item xs={2}><Button sx={{...radioButton}}></Button></Grid>
                <Grid item xs={2}><Button sx={{...radioButton}}></Button></Grid>
                <Grid item xs={2}><Button sx={{...radioButton}}></Button></Grid>
                <Grid item xs={2}><Button sx={{...radioButton}}></Button></Grid>
            </Grid>

            {/* finish this tutorial at some point: https://www.youtube.com/watch?v=FFUUhYhxh5Q */}
            <Box sx={{display: 'flex', flexDirection: 'row', overflow:'hidden'}}>
                <img src={crackspy}></img>
                <img src={fc2}></img>
                <img src={PyroIcon}></img>
                <img src={StarbucksIcon}></img>
                <img src={Walmartragdoll}></img>
                <img src={wraithicon}></img>
            </Box>
        </Box>
    )
}