import { describe, test } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import TransactionList from "../features/transactionList/TransactionList";

test("test something", () => {
  //Arrange
  render(<TransactionList />);

  //Act

  //Assert
  screen.getByText();
});
