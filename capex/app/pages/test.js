// Import React and other dependencies
import React from "react";
import { render, screen } from "@testing-library/react";
import Test from "../pages/test";

// Define the test suite for the test page component
describe("Test page", () => {
  // Define the test case for rendering the test page component
  it("should render the test page component", () => {
    // Render the test page component
    render(<Test />);
    // Expect to find the heading element with the text "This is a test page"
    expect(
      screen.getByRole("heading", { name: /this is a test page/i })
    ).toBeInTheDocument();
  });
});
