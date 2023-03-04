import { ChangeEventHandler } from "react"

function Input(props: {className?: string, type: string, value?: string, onChange: ChangeEventHandler<HTMLInputElement>}) {
    return <input type={props.type} value={props.value} className={props.className} onChange={props.onChange}></input>
}

export default Input