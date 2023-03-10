import { PropaneSharp } from "@mui/icons-material";
import { Box } from "@mui/material"
import { style } from "@mui/system";
import { useEffect, useState } from 'react' 

export default function LinkedText(props){
    const [linkData, setData] = useState({});

    useEffect(() => {
        const links = props.links; // give dictionary of all keywords to replace with query response.

        for(let keyString in links){
            // keyString is the string to be replaced
            console.log(keyString);
            console.log(links[keyString])
            //const req = new XMLHttpRequest();
            //req.open('GET', )

        }
    }, [])

    


    const paragraphStyle = {
        width: props.style ? props.style.width ? props.style.width : '100%' : '100%', // this is bad
        height: 'min-content',
        textAlign: 'left',
        backgroundColor: 'aliceblue',
        borderWidth: '2px',
        borderStyle: 'solid',
        borderRadius: '25px',
        borderColor: 'black',
        padding:'1%',
    }

    return(
        <Box sx={paragraphStyle}>
            
        </Box>
    )
}