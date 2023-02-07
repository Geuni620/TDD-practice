import {render, screen, fireEvent} from "@testing-library/react";

import App from "./App";

test("button has correct initial color, and updates when clicked", () => {
  render(<App />);

  // find an element with a role of button and text of "change to blue"
  const colorButton = screen.getByRole("button", {name: "Change to blue"});

  // expect the background color to be red
  expect(colorButton).toHaveStyle({backgroundColor: "red"});

  // click button
  fireEvent.click(colorButton);

  expect(colorButton).toHaveStyle({backgroundColor: "blue"});

  // expect the button text to be "Change to red"

  expect(colorButton).toHaveTextContent("Change to red");
});

test("initial conditions", () => {
  render(<App />);

  // check that the button starts out enabled
  const colorButton = screen.getByRole("button", {name: "Change to blue"});
  expect(colorButton).toBeEnabled();

  // check that the checkbox starts out unchecked
  const checkbox = screen.getByRole("checkbox");
  expect(checkbox).not.toBeChecked();
});

test("checkbox가 체크되었을 때, button이 비 활성화 된다.", () => {
  render(<App />);

  const checkbox = screen.getByRole("checkbox", {name: "Disable button"});
  const colorButton = screen.getByRole("button", {name: "Change to blue"});

  fireEvent.click(checkbox);
  expect(colorButton).toBeDisabled();

  fireEvent.click(checkbox);
  expect(colorButton).toBeEnabled();
});
