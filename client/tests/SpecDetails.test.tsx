import SpecsDetails from "../SpecsDetails";
import { moreSpecTestDetails, testSpecDetails } from "./__mocks__/utils";
import { act, fireEvent, render, screen } from "@testing-library/react";

describe("renders spec details component", () => {
  const setViewSpecsDetails = jest.fn();

  const SpecDetailsComp = (
    <SpecsDetails
      moreSpecDetails={moreSpecTestDetails}
      viewSpecsDetails={true}
      setViewSpecsDetails={setViewSpecsDetails}
    />
  );

  let originalFetch: any;

  beforeEach(() => {
    originalFetch = global.fetch;
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(testSpecDetails),
        ok: true,
      })
    ) as jest.Mock;
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it("displays loader while fetching spec details", () => {
    render(SpecDetailsComp);

    const loader = screen.getByText("Loading...");
    expect(loader).toBeInTheDocument();
  });

  it("displays spec details", async () => {
    await act(async () => {
      render(SpecDetailsComp);
    });

    const content = screen.getByText("test html content");
    expect(content).toBeInTheDocument();
    const googleDocsButton = screen.getByRole("link", {
      name: "Open in Google Docs",
    });
    expect(googleDocsButton).toHaveAttribute("href", "https://www.test.test");
  });

  it("closes the spec details", async () => {
    let SpecDetailsComponent: any;
    await act(async () => {
      SpecDetailsComponent = render(SpecDetailsComp);
    });
    const specAsideBackdrop: any = SpecDetailsComponent.container.querySelector(
      ".spec-aside-backdrop"
    );
    const closeButton: any =
      SpecDetailsComponent.container.querySelector(".p-modal__close");
    fireEvent.click(specAsideBackdrop);
    fireEvent.click(closeButton);
    expect(setViewSpecsDetails).toHaveBeenCalledTimes(2);
    expect(setViewSpecsDetails).toBeCalledWith(false);
  });

  it("displays an error message from the backend", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ message: "Error 404" }),
        ok: false,
      })
    ) as jest.Mock;

    await act(async () => {
      render(SpecDetailsComp);
    });

    const errorPrompt = screen.getByText("Error 404");
    expect(errorPrompt).toBeInTheDocument();
  });

  it("displays the 'something went wrong' error message", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.reject(),
        ok: false,
      })
    ) as jest.Mock;

    await act(async () => {
      render(SpecDetailsComp);
    });

    const errorPrompt = screen.getByText("Error. Something went wrong.");
    expect(errorPrompt).toBeInTheDocument();
  });

  it("does not displays a warning message when status is set", async () => {
    await act(async () => {
      render(SpecDetailsComp);
    });

    expect(screen.getByText("active")).toBeInTheDocument();
    expect(() => screen.getByTestId("unknown-status-message")).toThrow(
      "Unable to find an element"
    );
  });

  it("displays a warning message for 'unknown' statuses", async () => {
    await act(async () => {
      console.log(testSpecDetails);
      const specDetails = testSpecDetails;
      specDetails.metadata.status = "unknown";
      specDetails.metadata.statusMessage = "Incorrect";

      render(
        <SpecsDetails
          moreSpecDetails={moreSpecTestDetails}
          viewSpecsDetails={true}
          setViewSpecsDetails={setViewSpecsDetails}
        />
      );
    });

    const status = screen.getByText("unknown");
    expect(status).toBeInTheDocument();
    const warning = screen.getByTestId("unknown-status-message");
    expect(warning).toBeInTheDocument();
  });
});
