import { useState } from "react";

const useInput = (defaultValue, validationFn) => {
  const [enteredValue, setEnteredValue] = useState(defaultValue);
  const [didEdit, setDidEdit] = useState(false);

  const valueIsValid = validationFn(enteredValue);

  const handleInputChange = (event) => {
    setEnteredValue(event.target.value);
    setDidEdit(false);
  };

  const handleInputBlur = () => {
    setDidEdit(true);
  };

  return {
    value: enteredValue,
    hasError: didEdit && !valueIsValid,
    didEdit: didEdit,
    setDidEdit,
    handleInputChange,
    handleInputBlur,
  };
};

export default useInput;
