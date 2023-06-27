import React, { useState } from 'react';
import Context from './Context';

function Provider({ children }) {
  // const [somestate, setsomestate] = useState();
  return (
    <Context.Provider>
      {/* value={ {
        somestate,
        setsomestate,
      } } */}
    </Context.Provider>
  );
};

export default Provider;