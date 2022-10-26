import React from 'react';
import Layout from './layouts';
import Login from './views/Login';

const App = () => {
  const token = localStorage.getItem('token');
  console.log(token);
  if (!token) {
    return <Login />;
  }
  return (
    <div className="App">
      <Layout />
    </div>
  );
};

export default App;
