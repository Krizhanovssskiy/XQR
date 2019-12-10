// The name is an index of the array

// {kind: '', text: '', radio: ''}

import { useState } from 'react';

export default (callback, INITIAL_INPUTS = []) => {
  const [multiInputs, setMultiInputs] = useState(INITIAL_INPUTS);
  const [_isTouched, set_isTouched] = useState(false);

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

    if (!_isTouched) {
      set_isTouched(true);
    }

    setMultiInputs(multiInputs => {
      const newMultiInputs = [...multiInputs];
      newMultiInputs[e.target.name] = e.target.value;
      return newMultiInputs;
    });
  };

  const addInput = () => {
    setMultiInputs(multiInputs => [...multiInputs, '']);
  };

  const removeInput = name => {
    setMultiInputs(multiInputs => [
      ...multiInputs.slice(0, name),
      ...multiInputs.slice(name + 1)
    ]);
  };

  return { onFormSubmit, onInputChange, addInput, removeInput, multiInputs, _isTouched };
};
