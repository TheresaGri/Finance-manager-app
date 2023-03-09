import './Pagination.css'

const Pagination = (props: {
  transactionsPerPage: number;
  totalTransactions: number;
  paginate: Function;
}) => {
  const pageNumbers = [];

  for (
    let i = 1;
    i <= Math.ceil(props.totalTransactions / props.transactionsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <a
              onClick={() => props.paginate(number)}
              className="page-link"
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
