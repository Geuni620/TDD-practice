import {render, fireEvent, screen} from "@testing-library/react";
import SummaryForm from "../SummaryForm";

test("체크박스와 버튼이 잘 랜더링 되어있는지 확인한다.", () => {
  render(<SummaryForm />);

  const checkBox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });

  expect(checkBox).not.toBeChecked();

  const confirmButton = screen.getByRole("button", {name: /confirm order/i});
  expect(confirmButton).toBeDisabled();
});

test("체크박스를 체크했을 때 체크가 되고, 버튼은 활성화된다.", () => {
  render(<SummaryForm />);

  const checkBox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  const confirmButton = screen.getByRole("button", {name: /confirm order/i});

  fireEvent.click(checkBox);
  expect(confirmButton).toBeEnabled();

  fireEvent.click(checkBox);
  expect(confirmButton).toBeDisabled();
});
