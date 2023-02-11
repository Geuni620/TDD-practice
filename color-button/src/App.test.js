import {render, screen, fireEvent} from "@testing-library/react";

import App from "./App";
import {replaceCamelWithSpaces} from "./App";

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

  // expect(colorButton).toHaveTextContent("Change to red");
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

test("checkbox에 체크 되었을 때, button이 disabled 되어야하고, 색상은 회색으로 변경해야한다.", () => {
  render(<App />);

  const checkbox = screen.getByRole("checkbox", {name: "Disable button"});
  const colorButton = screen.getByRole("button", {name: "Change to blue"});

  // disable button
  fireEvent.click(checkbox);
  expect(colorButton).toBeDisabled();
  expect(colorButton).toHaveStyle({backgroundColor: "gray"});

  // re-enable button
  fireEvent.click(checkbox);
  expect(colorButton).toBeEnabled();
  expect(colorButton).toHaveStyle({backgroundColor: "red"});
});

test("버튼을 클릭하면 색상이 변경되고, 체크박스를 클릭한 후 버튼은 그레이가 되어야한다.", () => {
  render(<App />);

  const checkbox = screen.getByRole("checkbox", {name: "Disable button"});
  const colorButton = screen.getByRole("button", {name: "Change to blue"});

  // change button to blue
  fireEvent.click(colorButton);
  expect(colorButton).toBeEnabled();
  expect(colorButton).toHaveStyle({backgroundColor: "blue"});

  // disable button
  fireEvent.click(checkbox);
  expect(colorButton).toBeDisabled();
  expect(colorButton).toHaveStyle({backgroundColor: "gray"});

  // re-enable button
  fireEvent.click(checkbox);
  expect(colorButton).toBeEnabled();
  expect(colorButton).toHaveStyle({backgroundColor: "blue"});
});

describe("spaces before camel-case capital letters", () => {
  test("Works for no inner capital letters", () => {
    // toBe는 두 값을 직접 비교함
    expect(replaceCamelWithSpaces("Red")).toBe("Red");
  });

  test("Works for one inner capital letter", () => {
    expect(replaceCamelWithSpaces("Midnight Blue")).toBe("Midnight Blue");
  });

  test("Works for multiple inner capital letters", () => {
    expect(replaceCamelWithSpaces("MediumVioletRed")).toBe("Medium Violet Red");
  });
});

test("빨간색 대신 자주색을, 파란색 대신 암청색으로 변하는지 확인", () => {
  render(<App />);

  const colorButton = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });

  fireEvent.click(colorButton);
  expect(colorButton).toHaveStyle({backgroundColor: "MidnightBlue"});

  fireEvent.click(colorButton);
  expect(colorButton).toHaveStyle({backgroundColor: "MediumVioletRed"});
});
