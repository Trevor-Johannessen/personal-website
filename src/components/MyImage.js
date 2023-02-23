import {useState, useEffect} from 'react'
import me from '../resources/images/me.jpg' 
import PyroIcon from '../resources/images/test/PyroIcon.png'
import ED from '../resources/images/ED.jpg'
import Athena from '../resources/images/Athena.jpg'
import api from '../Requests'
export default function MyImage(props){
    const [image, setImage] = useState('none');

    useEffect(()=>{
        async function asyncGetIP(){
            let imageCode = await api.checkIP();
            setImage(`${imageCode.data}`)
            console.log(imageCode)
        }
        asyncGetIP();
    }, [])

    let src;
    const style = {
        borderRadius: '8px',
        objectFit: 'cover',
        borderColor: 'black',
        borderWidth: '2px',
        borderStyle: 'solid',
        borderRadius: '5px',
        height: '50vh',
    }

    switch(image){
        case 'none': src=null;
            break;
        case '0': src = null;
            break;
        case '1': src = ED;
            break;
        case '2': src = PyroIcon;
            break;
        case '3': src = Athena; 
            break;
        default:
            src=null;
    }

    return (
        <div>
            {src ? <img src={src} style={style} onDoubleClick={() => setImage('3')}></img> : ''}
        </div>
    )
}