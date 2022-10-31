import React from 'react';
import Layout from './layouts';
import {GlobalProvider} from "./contexts/GlobalContext";

const App = () => {
  return (
    <GlobalProvider>
      <div className="App">
        <Layout />
      </div>
    </GlobalProvider>
  )
};

export default App;
