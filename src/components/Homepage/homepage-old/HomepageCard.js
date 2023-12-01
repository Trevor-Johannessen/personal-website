import { Box } from '@mui/material'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function HomepageCard(props){
    const [isShown, setIsShown] = useState(false);

    const cardStyle = {
        marginTop: '.75vh',
        marginBottom: '.75vh',
        backgroundColor: '#e6e6e6',
        height: '18vh',
        width: '45vw',
        borderRadius: '10px',
        boxShadow: `0 0 ${isShown ? 15 : 5}px 2px ${isShown ? '#00ffff' : '#c8c8c8'}`, 
        gridColumnStart:1,
        gridRowStart:1,
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        fontSize: '5em',
        cursor: 'pointer',
        textDecoration: 'none',
    };

    return (
        <Box
            onMouseEnter={() => setIsShown(true)}
            onMouseLeave={() => setIsShown(false)}
            style={{...props.style, ...cardStyle}}
            component={Link}
            to={props.route ? `/${props.text}/`: "./"}
        >
            <span style={{color:'rgba(0,0,0,.7)', fontFamily:"verdana"}}>{props.text}</span>
        </Box>
    )
}