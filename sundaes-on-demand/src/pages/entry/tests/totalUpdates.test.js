import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Options from "../Options";

test("update scoop subtotal when scoops change", async () => {
  const user = userEvent.setup();
  render(<Options optionType="scoops" />);

  // 총 금액은 0원에서 시작한다.
  const scoopsSubtotal = screen.getByText("Scoops total: $", {exact: false});
  /*
    exact 옵션
    - 기본 true로 설정되어 있음, 이는 부분적 매치이기 때문에 이 exact 옵션을 false로 설정해주어야함.
    - 전체 문자열이 아니어도 해당 요소를 찾을 수 있음.
  */
  expect(scoopsSubtotal).toHaveTextContent("0.00");

  // 바닐라 스쿱 1개 올리고, subTotal을 확인한다.
  const vanillaInput = await screen.findByRole("spinbutton", {name: "Vanilla"});

  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");
  expect(scoopsSubtotal).toHaveTextContent("2.00 ");

  // 초콜릿 스쿱을 2개 올리고, subTotal을 확인한다.
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });

  await user.clear(chocolateInput);
  await user.type(chocolateInput, "2");
  expect(scoopsSubtotal).toHaveTextContent("6.00");
});
