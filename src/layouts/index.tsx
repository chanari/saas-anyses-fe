import Content from './shared/Content';
import SideBar from './shared/SideBar';
import Routers from '../routers';
const Index = () => {
  return (
    <div
      style={{
        display: 'flex',
        flex: '1 1 auto',
        maxWidth: '100%',
      }}
    >
      <SideBar />
      <Content>
        <Routers />
      </Content>
    </div>
  );
};

export default Index;
