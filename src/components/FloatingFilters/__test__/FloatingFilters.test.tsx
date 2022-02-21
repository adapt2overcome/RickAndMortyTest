import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import FloatingFilters from "../FloatingFilters";

const mockHandleRadioButtonChange = jest.fn();
const mockHandleSearch = jest.fn();

test("test render shearch input element", async () => {
  const component = render(
    <FloatingFilters
      filterQuery=""
      handleRadioButtonChange={mockHandleRadioButtonChange}
      handleSearch={mockHandleSearch}
    />
  );

  const inputElement = component.getByPlaceholderText(/Search character name/i);
  expect(inputElement).toBeInTheDocument();
});

test("should be able to change input", async () => {
  const component = render(
    <FloatingFilters
      filterQuery=""
      handleRadioButtonChange={mockHandleRadioButtonChange}
      handleSearch={mockHandleSearch}
    />
  );

  const inputElement = component.getByPlaceholderText(/Search character name/i);
  fireEvent.change(inputElement, { target: { value: "Morty" } });
  expect((inputElement as HTMLInputElement).value).toBe("Morty");
});
