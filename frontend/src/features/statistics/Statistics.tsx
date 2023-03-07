import "./Statistics.css";

function Statistics(props: {
  sumOfAllIncome: number;
  sumOfAllExpenses: number;
}) {
  return (
    <div className="statistics">
      <h2>Sum of all income: {props.sumOfAllIncome}€</h2>
      <h2>Sum of all expenses: {props.sumOfAllExpenses}€</h2>
    </div>
  );
}

export default Statistics;
