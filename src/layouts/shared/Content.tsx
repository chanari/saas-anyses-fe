import React from 'react';
import Header from './Header';
import Container from '@mui/material/Container';
type Props = {
  children: JSX.Element;
};

const Content: React.FC<Props> = (props) => {
  return (
    <div
      style={{
        flex: '1 1 auto',
        background: '#f5f5f5',
      }}
    >
      <Header />
      <div style={{ padding: 24 }}>{props.children}</div>
    </div>
  );
};

export default Content;
