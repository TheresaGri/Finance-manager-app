import fetchTransactions from "../../api/fetchTransactions";
import Button from "../../components/Button";
const limit = 2;
let offset = 0;
const lengthOfTransactions = fetchTransactions.length;
export default function createPagination(props: {
  changeOffset: MouseEventHandler<HTMLButtonElement> ;
}) {

  for (let i = 0; i < lengthOfTransactions; i++) {
    offset = i;
     return (
     <div>
     <Button name = {`${offset}`} className = {"paginationButton"} onClick = {props.changeOffset} ></Button>
     </div>)
  }
}