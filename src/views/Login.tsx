import React from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {};
const Login: React.FC<Props> = () => {
  let navigate = useNavigate();

  const onClickLogin = () => {
    localStorage.setItem('token', 'TOKEN123456');
    navigate('/leave');
  };
  return (
    <div>
      <h1>Login</h1>
      <button onClick={onClickLogin}>Login with google</button>
    </div>
  );
};

export default Login;
