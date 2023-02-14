import {useEffect, useState} from "react";

import axios from "axios";
import ScoopOption from "./ScoopOption";
import ToppingOption from "./ToppingOption";
import Row from "react-bootstrap/Row";

export default function Options({optionType}) {
  const [items, setItems] = useState([]);
  useEffect(() => {
    // optionType is 'scoops' or 'toppings'
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((res) => setItems(res.data))
      .catch((err) => {
        // TODO: handle error response
      });
  }, [optionType]);

  // TODO: replace "null" with ToppingOption when available
  const ItemComponent = optionType === "scoops" ? ScoopOption : ToppingOption;

  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ));

  return <Row>{optionItems}</Row>;
}
