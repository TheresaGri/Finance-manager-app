async function putTransaction(data: {}, id: number) {
    const res = await fetch(`http://localhost:3000/api/transactions/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }
  
  export default putTransaction;
  