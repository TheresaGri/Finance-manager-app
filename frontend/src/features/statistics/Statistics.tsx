import "./Statistics.css";

function Statistics(props: {
  sumOfAllIncome: number;
  sumOfAllExpenses: number;
}) {
  return (
    <div className="statistics">
      <div className="incomeAndExpense">Sum of all income: {props.sumOfAllIncome}€</div>
      <div className= "incomeAndExpense">Sum of all expenses: {props.sumOfAllExpenses}€</div>
    </div>
  );
}

export default Statistics;
