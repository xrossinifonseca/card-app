import React from "react";
import { useStateContext } from "../context/StateContext";
import "./form.css";
import svg from "../images/icon-complete.svg";

const Form = () => {
  const {
    cardName,
    setCardName,
    cardNumber,
    setCardNumber,
    cardDateMonth,
    setCardDateMonth,
    cardDateYear,
    setCardDateYear,
    handleSubmit,
    cardCvv,
    setCardCvv,
    message,
    messageCvv,
    sucess,
    buttonContinue,
  } = useStateContext();

  return (
    <>
      {sucess === false ? (
        <form className="form" onSubmit={handleSubmit}>
          <label>CARDHOLDER NAME</label>
          <input
            type="text"
            name="cardName"
            value={cardName}
            placeholder="name in card"
            onChange={(e) => setCardName(e.target.value)}
            required
          />
          {message === "Nome invalido" && (
            <p className="errorMessage">{message}</p>
          )}
          <label>CARD NUMBER</label>
          <input
            type="text"
            maxLength={16}
            value={cardNumber}
            placeholder="0000 0000 000 000"
            onChange={(e) => setCardNumber(e.target.value)}
          />
          {message === "Wrong format!" && (
            <p className="errorMessage">{message}</p>
          )}
          {message === "EXP. onlyn number!" && (
            <p className="errorMessage">{message}</p>
          )}

          <div className="exp-info">
            <div>
              <label>EXP.DATE (MM/YY)</label>

              <span className="exp-date">
                <input
                  type="text"
                  value={cardDateMonth}
                  onChange={(e) => setCardDateMonth(e.target.value)}
                  placeholder="mm"
                  maxLength={2}
                  required
                />
                <input
                  type="text"
                  value={cardDateYear}
                  onChange={(e) => setCardDateYear(e.target.value)}
                  maxLength={2}
                  placeholder="yy"
                  required
                />
              </span>
              {message === "Only number!" && (
                <p className="errorMessage">{message}</p>
              )}
              {message === "Can't be blank!" && (
                <p className="errorMessage">{message}</p>
              )}
            </div>

            <div className="cvv">
              <label>CVV</label>
              <input
                type="text"
                maxLength={3}
                value={cardCvv}
                placeholder="123"
                onChange={(e) => setCardCvv(e.target.value)}
                required
              />
              {messageCvv && <p className="errorMessage">{messageCvv}</p>}
            </div>
          </div>
          <button type="submit">Confirm</button>
        </form>
      ) : (
        <div className="sucess">
          <img src={svg} alt="completed" />
          <h1>THANK YOU!</h1>
          <p>We've added your card details</p>
          <button type="button" onClick={() => buttonContinue()}>
            Continue
          </button>
        </div>
      )}
    </>
  );
};

export default Form;
