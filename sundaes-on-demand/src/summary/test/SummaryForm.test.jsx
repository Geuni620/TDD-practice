import {render, screen} from "@testing-library/react";
import SummaryForm from "../SummaryForm";
import userEvent from "@testing-library/user-event";

test("체크박스와 버튼이 잘 랜더링 되어있는지 확인한다.", () => {
  render(<SummaryForm />);

  const checkBox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });

  expect(checkBox).not.toBeChecked();

  const confirmButton = screen.getByRole("button", {name: /confirm order/i});
  expect(confirmButton).toBeDisabled();
});

test("체크박스를 체크했을 때 체크가 되고, 버튼은 활성화된다.", async () => {
  render(<SummaryForm />);
  const user = userEvent.setup();

  const checkBox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  const confirmButton = screen.getByRole("button", {name: /confirm order/i});

  await user.click(checkBox);
  expect(confirmButton).toBeEnabled();

  await user.click(checkBox);
  expect(confirmButton).toBeDisabled();
});

test("popover responds to hover", async () => {
  const user = userEvent.setup();

  // popover starts out hidden

  // popover appears on mouseover of checkbox label

  // popover disappears when we mouse out
});

/*
  42. 'fireEvent'를 'userEvent'로 교체하기
    - userEvent는 promise를 반환하기 때문에 꼭 await를 붙여주어야함!
    - 보이지 않는 무언가를 테스트할 경우 getBy를 사용해서는 안됨.
*/

/*
  43. command[All]ByQueryType
  - command
    get : DOM 내에 있을 것을 expect하게 되는 건 get
    query : DOM 내에 있지 않을 것을 expect 하는 경우에는 query를 사용.
    find : 요소가 비동기적으로 나타날 경우를 expect 할 때는 find

  - All
    - 포함을 시키거나 포함을 시키지 않는 부분인데, 하나의 매치만이 아니라 하나 이상의 매치를 expect하는 경우에는 [All]

  - QueryType
    - 무엇을 검색을 하는지를 의미
    - 우리는 보통 Role을 사용해 왔음. 그리고 코드의 접근성을 보장하기 위해 가장 선호되는 방법이기도 함.
    
    - 이미지를 찾기 위해서는 AltText를 사용할 수 있고, 요소를 디스플레이하기 위해서는 Text를 사용할 수 있음
    - 특정한 역할이 없는, 비상호작용적인 디스플레이 요소에 대해 사용한 적이 있었음.
    - 양식 요소를 찾는 데에는 다양한 속성의 사용이 가능한데, PlaceholderText, LabelText, DisplayValue가 있음.
      - 이들을 섞어서 사용하면 됨.
      - 예를 들어, getAltByText, 혹은 findByAltText, QueryAllByLabelText로 사용하는 식임.  
      - 이런 식으로 DOM에서 찾고자 하는 내용에 가장 적절한 방식으로 섞어서 사용하는 것.
      - screen 쿼리에 관련해서는 이 세 개의 페이지를 참조하시는 걸 추천.

    - 첫 번째 변형(Variants)에 대한 내용으로 getBy, getAllby, queryBy 등의 정식 정의를 설명해두었음
    - ByLabelText에 대한 정의와 예시 등도 설명을 하고 있고, ByPlaceholderText, ByText 등에 관련한 내용도 확인 가능함.
      - https://testing-library.com/docs/queries/about/
    - 빠르게 훑어볼 수 있는 참고 자료로는 테스트 라이브러리의 Cheatsheet가 있는데, 이는 리액트에 관한 것.
  
    - 어떤 쿼리를 사용해야할까?
      1. 모두 엑세스 할 수 있는 쿼리를 사용하는 게 좋을 것.
        - 화면을 쳐다보고 있는 사람에게든, 스크린 리더 등의 보조 기술을 사용하고 있는 사람에게 건 간에.
      2. 의미론적 쿼리, 이들은 잘 선호되지 않긴 한데.
        - 브라우저와 보조 기술의 사이 일관성이 다소 떨어지기 때문
        - 테스트는 사람들이 소프트웨어를 사용하는 방식을 모방해야 한다는 점. 잊지말 것!
        - 만약 이러한 속성들이 표시되는 방식이 일관적이지 못하다면, 사용자들이 소프트웨어와 상호작용하는 것과 동일한 방식으로 테스트가 진행되고 있는지를 알 수 없을 것.
      3. 테스트 IDs
        - 최후의 수단, 사용자들이 테스트 ID와 상호작용할 일은 저대 없기 때문.

*/
