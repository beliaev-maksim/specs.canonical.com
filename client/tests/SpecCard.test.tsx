import SpecCard from "../SpecCard";
import { testSpec } from "./__mocks__/utils";
import { fireEvent, render, screen } from "@testing-library/react";

describe("renders spec card component", () => {
  let SpecCardComponent: any;

  beforeEach(() => {
    SpecCardComponent = render(<SpecCard spec={testSpec} />);
  });

  it("displays spec details on the card", () => {
    const specTitle = screen.getByText("test_title");
    expect(specTitle).toBeInTheDocument();
    const comments = screen.getByText("10 comments 5 unresolved");
    expect(comments).toBeInTheDocument();
    const specIndex = screen.getByText("index");
    expect(specIndex).toBeInTheDocument();
  });

  it("opens the spec preview on click of the spec title", async () => {
    const specTitle = screen.getByText("test_title");
    fireEvent.click(specTitle);
    const specPreview: any =
      SpecCardComponent.container.querySelector(".spec-aside");
    expect(specPreview).toBeInTheDocument();
  });

  it("opens the spec preview when Enter key is pressed", async () => {
    const specTitle = screen.getByText("test_title");
    fireEvent.keyDown(specTitle, { key: "Enter" });
    const specPreview: any =
      SpecCardComponent.container.querySelector(".spec-aside");
    expect(specPreview).toBeInTheDocument();
  });
});
