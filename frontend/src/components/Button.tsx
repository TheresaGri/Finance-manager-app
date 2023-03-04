import { MouseEventHandler } from "react";

function Button(props: {
  name: string;
  className: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button onClick={props.onClick} className={props.className}>
      {props.name}
    </button>
  );
}

export default Button;
