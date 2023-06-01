import { render, screen } from "@testing-library/react";
import Calendar from "./Calendar";

it("renders with the given date prop", () => {
  // create a date object for testing
  const testDate = new Date(2021, 11, 25); // December 25th, 2021
  // render the component with the test date as prop
  render(<Calendar date={testDate} onChange={() => {}} />);
  // expect to see the month and year in the header
  expect(screen.getByText("December 2021")).toBeInTheDocument();
  // expect to see the selected date highlighted
  expect(screen.getByText("25")).toHaveClass("calendar-selected");

});

it("renders with the current date by default", () => {
  // create a date object for testing
  const today = new Date();
  // render the component without a date prop
  render(<Calendar date={today} onChange={() => {}} />);
  // expect to see the month and year in the header
  expect(screen.getByText(`${today.toLocaleString("default", { month: "long" })} ${today.getFullYear()}`)).toBeInTheDocument();
  // expect to see the selected date highlighted
  expect(screen.getByText(`${today.getDate()}`)).toHaveClass("calendar-selected");
});

it("calls onChange prop when a date is selected", () => {
  // create a mock function for testing
  const mockOnChange = jest.fn();
  // render the component with the mock function as prop
  render(<Calendar date={new Date()} onChange={mockOnChange} />);
  // click on a date
  screen.getByText("15").click();
  // expect the mock function to be called
  expect(mockOnChange).toHaveBeenCalled();
});