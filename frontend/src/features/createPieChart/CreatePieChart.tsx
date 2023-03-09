import * as d3 from "d3";
import { useState, useRef, useEffect } from "react";
import fetchCategories from "../../api/fetchCategories";
import fetchTransactions from "../../api/fetchTransactions";
import CategoryType from "../../utils/types/CategoryType";
import TransactionType from "../../utils/types/TransactionType";

export default function CreatePieChart() {
  const [categories, setCategories] = useState<Array<CategoryType>>([]);
  const [transactions, setTransactions] = useState<Array<TransactionType>>([]);
  const svgRef = useRef();

  useEffect(() => {
    async function loadTransactionsData() {
      setTransactions(await fetchTransactions());
    }
    loadTransactionsData();
  }, []);

  useEffect(() => {
    async function loadCategoryData() {
      setCategories(await fetchCategories());
    }
    loadCategoryData();
  }, []);

  const categoryIdCount = transactions.reduce((acc, transaction) => {
    const categoryId = transaction.categoryId;
    acc[categoryId] = (acc[categoryId] || 0) + 1;
    return acc;
  }, {});

  let data = Object.keys(categoryIdCount).map((categoryId) => {
    const category = categories.find((c) => c.id === Number(categoryId));
    const categoryName = category ? category.name : "i";
    const categoryColor = category ? category.color : "white";
    return {
      property: categoryName,
      value: categoryIdCount[categoryId],
      color: categoryColor,
    };
  });


  useEffect(() => {
    const w = 300;
    const h = 300;
    const radius = w / 2;
    const svg = d3
      .select(svgRef.current)
      .attr("width", w)
      .attr("height", h)
      .style("overflow", "visible")
      .style("margin-top", "400px");

    const formattedData = d3.pie().value((d) => d.value)(data);
    const arcGenerator = d3.arc().innerRadius(0).outerRadius(radius);
    const color = d3
      .scaleOrdinal()
      .domain(data.map((d) => d.property))
      .range(d3.schemeSet2);

    const textThreshold = 20; 

    svg
      .selectAll()
      .data(formattedData)
      .join("path")
      .attr("d", arcGenerator)
      .style("opacity", 0.7)
      .attr("fill", (d) => d.data.color);

    svg
      .selectAll()
      .data(formattedData)
      .join("text")
      .text((d) => d.data.property)
      .style("font-size", "14px") 
      .attr("transform", (d) => {
        const [x, y] = arcGenerator.centroid(d);
        const dist = Math.sqrt(x * x + y * y);
        if (dist < textThreshold) {
          const angle = Math.atan2(y, x);
          const newX = Math.cos(angle) * textThreshold;
          const newY = Math.sin(angle) * textThreshold;
          return `translate(${newX},${newY})`;
        } else {
          return `translate(${x},${y})`;
        }
      })
      .style("text-anchor", "middle")
      .append("tspan")
      .text((d) => ` (${d3.format(".1%")(d.value / transactions.length)})`)
      .style("font-size", "0.7em")
      .attr("x", 0)
      .attr("y", "1em");
  }, [data]);

  return (
    <div>
      <svg ref={svgRef}></svg>
    </div>
  );
}
