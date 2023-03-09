import './App.css';
import TransactionList from './features/transactionList/TransactionList'
import Image from './components/Image';

function App() {

  return (
    <div className="App">
      <Image src={"./src/assets/bank-logo.png"} className={"bankLogo"}/>
      <TransactionList />
    </div>
  )
}

export default App