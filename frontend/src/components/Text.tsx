function Text(props: {text:string, className?:string}) {
    return <p className={props.className}>{props.text}</p>
}

export default Text