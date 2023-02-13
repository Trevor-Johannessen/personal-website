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
        }
        asyncGetIP();
    }, [])
    let src;
    switch(image){
        case 'none': src=null;
            break;
        case '0': src=me;
            break;
        case '1': src=ED;
            break;
        case '2': src=PyroIcon;
            break;
    }

    return (
        <div>
            {src ? <img src={me} id="about-picture"/> : <div/>}
        </div>
    )
}