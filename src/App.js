import "./App.css";
import {useState} from "react";

export function replaceCamelWithSpaces(colorName) {
  return colorName.replace(/\B([A-Z])\B/g, " $1");
  // 단어 가운데에서 대문자를 찾았을 때마다 개수에 상관없이 매번 다음을 수행하라는 의미
  // → 어떤 대문자를 발견하든 앞에 공백을 추가한 대문자로 대체
}

function App() {
  const [buttonColor, setButtonColor] = useState("MediumVioletRed");
  const newButtonColor =
    buttonColor === "MediumVioletRed" ? "MidnightBlue" : "MediumVioletRed";

  const [disabled, setDisabled] = useState(false);

  return (
    <div>
      <button
        onClick={() => setButtonColor(newButtonColor)}
        style={{backgroundColor: disabled ? "gray" : buttonColor}}
        disabled={disabled}
      >
        Change to {replaceCamelWithSpaces(newButtonColor)}
      </button>
      <input
        id="disable-button-checkbox"
        defaultChecked={disabled}
        onChange={(e) => setDisabled(e.target.checked)}
        type="checkbox"
      />
      <label htmlFor="disable-button-checkbox">Disable button</label>
    </div>
  );
}

export default App;
