import Alert from "react-bootstrap/Alert";

export default function AlertBanner({message, variant}) {
  const alertMessage =
    message || "An unexpected error occurred. Please try again later.";

  // 변수가 truthy이거나 누군가 변수를 입력하면, 동일한 방식을 사용하고, 그게 아니면 "danger" 변수를 사용
  // 그리고 다크모드가 아니면 빨간색이 나타남
  const alertVariant = variant || "danger";

  return (
    <Alert variant={alertVariant} style={{backgroundColor: "red"}}>
      {alertMessage}
    </Alert>
  );
}
