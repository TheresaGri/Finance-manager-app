async function fetchTransactions(dateOrAmount?: string) {
  const baseUrl: string = `http://localhost:3000/api/transactions`;
  const res = await fetch(baseUrl);
  const data = await res.json();
  console.log
  return data;
}

export default fetchTransactions;
