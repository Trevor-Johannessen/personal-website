export default function Showcase(props){
    const height = props.height;
    const width = props.width;

    return(
        <div className="showcase">{props.children}</div>
    )


}