import { useState, useRef } from 'react';

export const useInputs = (callback, inputsObject) => {
  for (let input in inputsObject) {
    if (inputsObject[input] === null) {
      inputsObject[input] = '';
    }
  }
  const INITIAL_STATE = {
    ...inputsObject,
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
    if (e.target.type === 'text') {
      setInputs(inputs => ({
        ...inputs,
        [e.target.name]: e.target.value
      }));
    } else if (e.target.type === 'number') {
      if (e.target.value < 100000000) {
        setInputs(inputs => ({
          ...inputs,
          [e.target.name]: e.target.value
        }));
      }
    } else if (e.target.type === 'file') {
      const file = e.target.files[0];
      if (file && file.type.match('image')) {
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
          setInputs(inputs => ({
            ...inputs,
            [e.target.name]: file,
            imagePreviewUrl: fileReader.result
          }));
        };
        fileReader.readAsDataURL(file);
      } else if (file && file.type.match('video')) {
        const fileReader = new FileReader();
        fileReader.onloadend = e => {
          setInputs(inputs => ({
            ...inputs,
            [e.target.name]: file,
            videoPreviewUrl: fileReader.result
          }));
        };
        fileReader.readAsDataURL(file);
      }
    }
  };
  return { onFormSubmit, onInputChange, inputs };
};

export const useOnWheel = () => {
  const wheeledElement = useRef(null);

  const onMouseWheel = e => {
    const { current } = wheeledElement;
    e.deltaY > 0 ? (current.scrollLeft += 20) : (current.scrollLeft -= 20);
  };
  return { wheeledElement, onMouseWheel };
};
