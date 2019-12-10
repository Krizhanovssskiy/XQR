import { useState } from 'react';

const useTextInputs = (callback, INITIAL_INPUTS) => {
  for (let input in INITIAL_INPUTS) {
    if (INITIAL_INPUTS[input] === null) {
      INITIAL_INPUTS[input] = '';
    }
  }
  const INITIAL_STATE = {
    ...INITIAL_INPUTS,
    _isTouched: false
  };
  const [inputs, setInputs] = useState(INITIAL_STATE);

  const onFormSubmit = e => {
    if (e) {
      e.preventDefault();
    }
    callback();
  };

  const onInputChange = e => {
    if (e) {
      e.preventDefault();
      e.persist();
    }

    if (!inputs._isTouched) {
      setInputs(inputs => ({
        ...inputs,
        _isTouched: true
      }));
    }

    setInputs(inputs => ({
      ...inputs,
      [e.target.name]: e.target.value
    }));
  };

  return { onFormSubmit, onInputChange, inputs };
};

export default useTextInputs;
