import React from 'react';
import Header from './Header';
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
      <div style={{ padding: "1.5rem 4.5rem" }}>{props.children}</div>
    </div>
  );
};

export default Content;
