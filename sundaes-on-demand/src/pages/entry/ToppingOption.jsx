import Col from "react-bootstrap/Col";

const ToppingOption = ({name, imagePath}) => {
  return (
    <Col xs={12} sm={6} md={4} style={{textAlign: "center"}}>
      <img
        style={{width: "75%"}}
        alt={`${name} toppings`}
        scr={`http://localhost:3030/${imagePath}`}
      />
    </Col>
  );
};

export default ToppingOption;
