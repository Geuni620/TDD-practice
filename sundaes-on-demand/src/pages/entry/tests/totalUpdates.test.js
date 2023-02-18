import {render, screen} from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import OrderEntry from "../OrderEntry";

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
  expect(scoopsSubtotal).toHaveTextContent("2.00");

  // 초콜릿 스쿱을 2개 올리고, subTotal을 확인한다.
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });

  await user.clear(chocolateInput);
  await user.type(chocolateInput, "2");
  expect(scoopsSubtotal).toHaveTextContent("6.00");
});

test("update toppings subtotal when toppings change", async () => {
  const user = userEvent.setup();
  render(<Options optionType="toppings" />);

  // 총 금액은 0원으로 시작한다.
  const toppingsSubtotal = screen.getByText("Toppings total: $", {
    exact: false,
  });
  expect(toppingsSubtotal).toHaveTextContent("0.00");

  // add cherries and check subtotal
  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  await user.click(cherriesCheckbox);
  expect(toppingsSubtotal).toHaveTextContent("1.50");

  // add hot fudge and check subtotal
  const hotFudgeCheckbox = await screen.findByRole("checkbox", {
    name: "Hot fudge",
  });
  await user.click(hotFudgeCheckbox);
  expect(toppingsSubtotal).toHaveTextContent("3.00");

  // remove hot fudge and check subtotal
  await user.click(hotFudgeCheckbox);
  expect(toppingsSubtotal).toHaveTextContent("1.50");
});

describe("grand total", () => {
  test("grand total updates properly if scoop is added first", async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", {name: /Grand total: \$/});
    expect(grandTotal).toHaveTextContent("0.00");

    // update vanilla scoops to 2 and check grand total
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "2");
    expect(grandTotal).toHaveTextContent("4.00");

    // add cherries and check grand total
    const cherriesCheckBox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    await user.click(cherriesCheckBox);
    expect(grandTotal).toHaveTextContent("5.50");
  });

  test("grand total updates properly if topping is added first", async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", {name: /Grand total: \$/});

    const cherriesCheckBox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    await user.click(cherriesCheckBox);
    expect(grandTotal).toHaveTextContent("1.50");

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "2");
    expect(grandTotal).toHaveTextContent("5.50");
  });

  test("grand total updates properly if item is removed", async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);

    // add cherries
    const cherriesCheckBox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    await user.click(cherriesCheckBox);
    // grand total $1.50

    // update vanilla scoops to 2; grand total should be $5.50
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "2");

    // remove 1 scoop of vanilla and check grand total
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "1");

    // check grand total
    const grandTotal = screen.getByRole("heading", {name: /Grand total: \$/});
    expect(grandTotal).toHaveTextContent("3.50");

    // remove cherries and check grand total
    await user.click(cherriesCheckBox);
    expect(grandTotal).toHaveTextContent("2.00");
  });
});
