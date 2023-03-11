async function fetchCategories() {
    const baseUrl = "http://localhost:3000/api/categories";
    const res = await fetch(baseUrl);
    const data = await res.json();
    return data;
  }
  
  export default fetchCategories;
  