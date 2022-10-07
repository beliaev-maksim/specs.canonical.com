import crypto from "crypto";
import App from "../App";
import { emptyTestSpec, testSpec, testTeams } from "./__mocks__/utils";
import { fireEvent, render, screen, within } from "@testing-library/react";

Object.defineProperty(global, "crypto", {
  value: {
    getRandomValues: (arr: any) => crypto.randomBytes(arr.length),
  },
});

describe("renders app component", () => {
  it("displays spec details", () => {
    const AppComp = render(<App specs={[testSpec]} teams={testTeams} />);

    const SpecCard: any = AppComp.container.querySelector(".spec-card");
    const { getByText } = within(SpecCard);
    const specTitle = getByText("test_title");
    expect(specTitle).toBeInTheDocument();
    const specStatus = getByText("active");
    expect(specStatus).toBeInTheDocument();
    const specType = getByText("Process");
    expect(specType).toBeInTheDocument();
  });

  it("displays unknown spec title, index, status, folder name and type", () => {
    const AppComp = render(<App specs={[emptyTestSpec]} teams={[""]} />);

    const SpecCard: any = AppComp.container.querySelector(".spec-card");
    const { getByText, getAllByText } = within(SpecCard);
    const specTitle = getByText("Unknown title");
    expect(specTitle).toBeInTheDocument();
    const unknown = getAllByText("Unknown");
    expect(unknown).toHaveLength(4);
  });

  it("displays no spec", () => {
    render(<App specs={[testSpec]} teams={testTeams} />);

    const searchInput = screen.getByLabelText("Search");
    fireEvent.change(searchInput, { target: { value: "search" } });
    const noSpec = screen.getByText("No specs found");
    expect(noSpec).toBeInTheDocument();
  });
});
