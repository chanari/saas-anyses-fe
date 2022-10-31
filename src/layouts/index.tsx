import Routers from '../routers';

const Index = () => {
  const styled = {
    display: 'flex',
    flex: '1 1 auto',
    maxWidth: '100%',
    height: '100vh',
  }

  return (
    <div style={styled}>
      <Routers />
    </div>
  );
};

export default Index;
