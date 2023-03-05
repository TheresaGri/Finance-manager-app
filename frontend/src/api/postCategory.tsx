async function postTransaction(data: {}) {
  const res = await fetch("http://localhost:3000/api/categories", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export default postTransaction;
