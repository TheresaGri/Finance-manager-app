async function fetchTransactions() {
  const baseUrl: string = "http://localhost:3000/api/transactions";
  const res = await fetch(baseUrl);
  const data = await res.json();

  return data;
}

export default fetchTransactions;
