import SummaryForm from "./pages/summary/SummaryForm";
import Container from "react-bootstrap/Container";
import OrderEntry from "./pages/entry/OrderEntry";
import {OrderDetailsProvider} from "./contexts/OrderDetails";

function App() {
  return (
    <div className="App">
      <SummaryForm />
      <Container>
        <OrderDetailsProvider>
          {/* Summary page and entry page need provider */}
          <OrderEntry />
        </OrderDetailsProvider>
        {/* confirmation page does not need provider */}
      </Container>
    </div>
  );
}

export default App;
