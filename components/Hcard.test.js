import { render, screen } from "@testing-library/react";
import Hcard from "./Hcard";

describe("Hcard", () => {
  it("should render the app", () => {
    render(<Hcard />);
    expect(screen.getByText("hCard Builder")).toBeInTheDocument();
  });

  it("should render the user input", () => {
    const props = {
      givenName: "Test Name",
      state: "Victoria",
    };
    render(<Hcard {...props} />);

    const givenName = screen.getByLabelText("Given Name");
    const state = screen.getByLabelText("State");

    expect(givenName).toHaveDisplayValue("Test Name");
    expect(state).toHaveDisplayValue("Victoria");
  });
});
