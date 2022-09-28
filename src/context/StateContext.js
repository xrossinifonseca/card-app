import React, { useState, useContext, createContext } from "react";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardDateMonth, setCardDateMonth] = useState("");
  const [cardDateYear, setCardDateYear] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [message, setMessage] = useState(false);
  const [messageCvv, setMessageCvv] = useState(false);
  const [sucess, setSucess] = useState(false);

  const inputNumber = () => {
    let cardNumberInput = cardNumber.replace(/[^\d]/g, "").substring(0, 16);
    let cardNumberSections = cardNumberInput.match(/\d{1,4}/g);

    if (cardNumberSections !== null) {
      cardNumberInput = cardNumberSections.join(" ");
      return setCardNumber(cardNumberInput);
    } else if (!cardNumberInput) {
      setCardNumber("");
      setMessage("EXP. onlyn number!");
    }
  };

  const validateCard = () => {
    let month = cardDateMonth.replace(/[^\d]/g, "");
    let year = cardDateYear.replace(/[^\d]/g, "");
    let cvv = cardCvv.replace(/[^\d]/g, "");

    let nameRegex = cardName.replace(/[^A-zÀ-ú\s]/gi, "");

    // verification input name
    const cardNameInput = cardName.split(" ");
    const name = cardNameInput
      .map((name) => {
        return name[0].toUpperCase() + name.substring(1);
      })
      .join(" ");

    let numberRegex = cardNumber.replace(/[^\d]/g, "").substring(0, 16);

    if (cardNumber !== numberRegex) {
      setCardNumber("");
      setMessage("EXP. onlyn number!");
    } else if (cardNumber.length > 0 && cardNumber.length < 16) {
      setMessage("Wrong format!");
      setCardNumber("");
    } else if (cardName !== nameRegex) {
      setMessage("Nome invalido");
      setCardName("");
    } else if (!month || !year) {
      setCardDateMonth("");
      setCardDateYear("");
      setMessage("Only number!");
    } else if (
      (month.length > 0 && month.length < 2) ||
      (year.length > 0 && year.length < 2)
    ) {
      setCardDateMonth("");
      setCardDateYear("");
      setMessage("Can't be blank!");
    } else if (!cvv) {
      setCardCvv("");
      setMessage("");
      setMessageCvv("Only number!");
    } else if (cvv.length > 0 && cvv.length < 3) {
      setMessageCvv("Can't be blank!");
      setCardCvv("");
    } else {
      setMessage(false);
      setCardDateMonth(month);
      setCardDateYear(year);
      setCardName(name);
      setSucess(true);
      setMessageCvv(false);

      setCardCvv(cvv);
    }
  };

  const buttonContinue = () => {
    setMessage(false);
    setCardDateMonth("");
    setCardDateYear("");
    setCardName("");
    setCardNumber("");
    setSucess(false);
    setMessageCvv(false);
    setCardCvv("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    inputNumber();

    validateCard();
  };

  return (
    <Context.Provider
      value={{
        cardName,
        setCardName,
        cardNumber,
        setCardNumber,
        cardDateMonth,
        setCardDateMonth,
        cardDateYear,
        setCardDateYear,
        handleSubmit,
        message,
        setCardCvv,
        cardCvv,
        messageCvv,
        sucess,
        buttonContinue,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
