import { useState } from 'react';

export default function Showcase(props){
    const [isIntersecting, setIntersecting] = useState(false)




    return (
        <div className="showcase">
            {props.children}
        </div>
    )
}