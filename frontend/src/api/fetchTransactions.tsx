async function fetchTransactions(dateOrAmount?: string, limit?: number, offset?: number) {
  const baseUrl: string = `http://localhost:3000/api/transactions?sortAscending=${dateOrAmount}&offset=${offset}&limit=${limit}`;
  const res = await fetch(baseUrl);
  const data = await res.json();

  return data;
}

export default fetchTransactions;
