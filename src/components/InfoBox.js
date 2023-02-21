import { Box, Grid, Divider, Button} from '@mui/material';
import {useState} from 'react'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

export default function InfoBox(props){
    const [textIndex, changeIndex] = useState(0);
    const contents = [
        ["Rules", "These are the rules of Chess 2."],
        ['Pawn:', 'Can move 1 space in a cardinal direction.'],
        ['Knight:', 'Can move 2 spaces diagonally.'],
        ['Rook:', 'Can move in a castle pattern. (You\'ll see)'],
        ['Bishop:', 'Can move 2 spaces forwards or backwards, or 1 space left or right. Has a spin attack that kills anything in a 3x3 space wherever it moves. This attack affects your pieces too.'],
        ['King:', 'Cannot move.'],
        ['Queen:', 'Can move to any unoccupied space on the board. The queen cannot jump pieces.'],
    ];

    const leftButton = (
        <Button onClick={() => changeIndex(textIndex-1)} disabled={textIndex <= 0}><ArrowLeftIcon/></Button>
    )

    const rightButton = (
        <Button onClick={() => changeIndex(textIndex+1)} disabled={textIndex >= contents.length-1}><ArrowRightIcon/></Button>
    )
    
    return (
        <Box
            sx={{
                height: '100%',
                width: '100%',
                backgroundColor: '#80c1ff',
                borderColor: 'black',
                borderWidth: '4px',
                borderStyle: 'solid',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
                <div xs={10} style={{height: '78%', paddingLeft: '5px'}}>
                    <p>{contents[textIndex][0]}</p>
                    <Divider/>
                    <p align={'left'}>{contents[textIndex][1]}</p>
                </div>
                <Divider variant='middle' style={{margin: 0}}/>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', width: '100%'}}>
                    {leftButton}
                    {rightButton}
                </div>
        </Box>
    )
}