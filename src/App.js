import "./app.css";
import Form from "./components/Form";
import cardFront from "./images/bg-card-front.png";
import cardBack from "./images/bg-card-back.png";
import cardLogo from "./images/card-logo.svg";
import { useStateContext } from "./context/StateContext";

function App() {
  const { cardName, cardNumber, cardDateMonth, cardDateYear, cardCvv } =
    useStateContext();

  return (
    <div className="container">
      <div className="left">
        <div className="card-display-front">
          <img src={cardFront} alt="front-card" className="card-front" />
          <img src={cardLogo} alt="card-logo" className="card-logo" />
        </div>
        <p className="card-display-number">{cardNumber}</p>
        <p className="card-display-name">{cardName}</p>

        {cardDateMonth.length > 0 && (
          <p className="card-display-year">
            {cardDateMonth}/{cardDateYear}
          </p>
        )}
      </div>

      <div className="card-display-back">
        <img src={cardBack} alt="back-card" className="back-card" />
        <p className="card-display-cvv">{cardCvv}</p>
      </div>

      <div className="right">
        <Form />
      </div>
    </div>
  );
}

export default App;
