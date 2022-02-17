import {useState} from 'react';

const useInput = (regex) => {
  const [value, setValue] = useState('');
  let isValid = true;
  if (regex) isValid= regex.test(value);

  const valueChangeHandler = (event) => setValue(event.target.value);

  return { 
    value,
    setValue,
    isValid,
    valueChangeHandler
  }
}

export default useInput;