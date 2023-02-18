import {render, screen} from "../../../test-utils/testing-library-utils";

import Options from "../Options";

test("displays image for each scoop option from server", async () => {
  render(<Options optionType="scoops" />);

  //find images
  const scoopImages = await screen.findAllByRole("img", {name: /scoop$/i}); // 여기서 달러 기호는 문자열이 "scoop"으로 끝난다는 걸 나타냄
  expect(scoopImages).toHaveLength(2);

  // confirm alt text of images
  // @ts-ignore
  const altText = scoopImages.map((element) => element.alt);
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);

  /*
  50. Mock Service Worker로 테스트하기
  숫자나 문자열은 이를 toBe 매처로 사용할 수 있음
  배열과 객체는 toEqual 매처를 사용해야함
  */
});

/*
  50. Mock Service Worker로 테스트하기
  - 테스트 자체는 Service Worker가 네트워크 요청을 가로채도록 설정한 설정 파일의 Mock Service Worker만 처리함
  - 네트워크 요청을 생성할 위치는 옵션 컴포넌트(Options components)에 있음
  - 따라서 이 테스트는 옵션 컴포넌트를 실행하고 옵션 컴포넌트는 서버에 get 요청을 보냄
  - 하지만 Mock Service Worker 설정 때문에 요청은 서버에 전해지지 않고 대신 Mock Service Worker가 요청을 가로채서
  - 옵션 컴포넌트에 핸들러 응답을 반환하게 됨
  */

test("diplays image for each toppings option from server", async () => {
  render(<Options optionType="toppings" />);

  const toppingImages = await screen.findAllByRole("img", {name: /toppings$/i});
  expect(toppingImages).toHaveLength(3);

  const altText = toppingImages.map((element) => element.alt);
  expect(altText).toEqual([
    "Cherries toppings",
    "M&Ms toppings",
    "Hot fudge toppings",
  ]);
});
