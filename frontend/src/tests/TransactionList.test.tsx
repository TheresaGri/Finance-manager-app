import { assert, expect, test } from 'vitest'
import { render, screen } from "@testing-library/react";
import TransactionList from "../features/transactionList/TransactionList";

test("test something", () => {
  //Arrange
  const {container} = render(<TransactionList />);

  //Act

  //Assert
    expect(container).toBeInTheDocument()
});
