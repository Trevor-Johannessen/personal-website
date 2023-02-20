import {useState, useEffect} from 'react'
import me from '../resources/images/me.jpg' 
import PyroIcon from '../resources/images/test/PyroIcon.png'
import ED from '../resources/images/ED.jpg'
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

    let img;
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
        case 'none': img=null;
            break;
        case '0': img = <img src={me} style={style}/>;
            break;
        case '1': img = <img src={ED} style={style}/>;
            break;
        case '2': img = <img src={PyroIcon} style={style}/>;
            break;
        default:
            img=null;
    }

    return (
        <div>
            {img ? img : ''}
        </div>
    )
}