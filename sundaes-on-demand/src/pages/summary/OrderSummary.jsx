import React from "react";
import SummaryForm from "./SummaryForm";
import {useOrderDetails} from "../../contexts/OrderDetails";
import {formatCurrency} from "../../utilities";

export default function OrderSummary() {
  const {totlas, optionCounts} = useOrderDetails();

  const scoopArray = Object.entries(optionCounts.scoops); // [["chocolate", 2], ["vanilla", 1]];
  const scoopList = scoopArray.map(([key, value]) => (
    <li key={key}>
      {value} {key}
    </li>
  ));

  const toppingsArray = Object.keys(optionCounts.toppings); // [["m&ms", "Gummi bears"]]
  const toppingList = toppingsArray.map(key) => <li key={key}>{key}</li>

  return (
    <div>
      <h1>OrderSummary</h1>
      <h2>Scoops: {formatCurrency(totlas.scoops)}</h2>
      <ul>{scoopList}</ul>
      <h2>toppings: {formatCurrency(totlas.toppings)}</h2>
      <ul>{toppingList}</ul>
      <SummaryForm />
    </div>
  );
}
