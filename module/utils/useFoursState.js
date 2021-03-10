import { useState } from 'react';

const useFocusState = (defaultSate = false) => {
  const [value, setState] = useState(defaultSate);
  return {
    value,
    update : (state) => {
      setState(state);
    },
  };
};

export default useFocusState;