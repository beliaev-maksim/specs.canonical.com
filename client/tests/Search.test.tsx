import Search from "../Search";
import { fireEvent, render, screen } from "@testing-library/react";

describe("renders search component", () => {
  const onChange = jest.fn();

  beforeEach(() => {
    render(<Search onChange={onChange} defaultValue="test" />);
  });

  it("contains the default value", () => {
    const searchInput = screen.getByLabelText("Search");
    expect(searchInput).toHaveValue("test");
  });

  it("triggers onChange event handler", () => {
    const searchInput = screen.getByLabelText("Search");
    fireEvent.change(searchInput, { target: { value: "testing" } });
    expect(onChange).toHaveBeenCalled();
  });
});
