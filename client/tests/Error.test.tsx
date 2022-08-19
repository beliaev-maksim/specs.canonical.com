import Error from "../Error";
import { render, screen } from "@testing-library/react";

it("renders error component", () => {
  render(<Error error="test error" />);

  const error = screen.getByText("test error");
  expect(error).toBeInTheDocument();
});
