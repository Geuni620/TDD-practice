import {
  render,
  screen,
  waitFor,
} from "../../../test-utils/testing-library-utils";
import OrderEntry from "../OrderEntry";
import {rest} from "msw";
import {server} from "../../../mocks/server";

test("handles error for scoops and toppings routes", async () => {
  server.resetHandlers(
    rest.get("http://localhost:3030/scoops", (req, res, ctx) =>
      res(ctx.status(500))
    ),
    rest.get("http://localhost:3030/toppings", (req, res, ctx) =>
      res(ctx.status(500))
    )
  );

  render(<OrderEntry />);

  await waitFor(async () => {
    const alerts = await screen.findAllByRole("alert");
    expect(alerts).toHaveLength(2);
  });
});

/*
    59. 선택된 테스트만 실행하는 방법과 waitFor
    test.skip와 test.only로 디버깅을 할 수 있음.

    - waitFor
      - 항목이 두 개가 될 때까지 기다리도록 하는 메서드로, 두 개의 alert가 모두 반환되거나 타임아웃 제한에 도달할 때까지 테스트 실행을 멈춤.
*/
