async function patchTransaction(data: {}, id: number) {
    const res = await fetch(`http://localhost:3000/api/transactions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }
  
  export default patchTransaction;
  