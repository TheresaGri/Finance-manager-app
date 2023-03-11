import './App.css';
import TransactionList from './features/transactionList/TransactionList'
import Image from './components/Image';
import banklogo from './assets/bank-logo.png'

function App() {
  return (
    <div className="App">
      <Image src={banklogo} className={"bankLogo"}/>
      <TransactionList />
    </div>
  )
}

export default App