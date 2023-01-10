import * as React from 'react';

const contextValues = {
  zero: 0,
  one: 1,
  two: 2
}

const userContext = React.createContext(contextValues.zero);

export {
  contextValues,
  userContext,
}