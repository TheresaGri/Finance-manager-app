async function fetchTransactions(dateOrAmount?: string) {

  const baseUrl: string = `http://localhost:3000/api/transactions?sort=${dateOrAmount}`;
  const res = await fetch(baseUrl);
  const data = await res.json();
  console.log(data)
  return data;
}

export default fetchTransactions;
