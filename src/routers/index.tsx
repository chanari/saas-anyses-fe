import { Routes, Route } from 'react-router-dom';
import LeaveList from '../views/LeaveList';
import Login from '../views/Login';

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
};

const Index = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="leave" element={<LeaveList />}>
        <Route path=":id" element={<h1>Leave detail</h1>} />
        <Route path="create" element={<h1>Leave create</h1>} />
      </Route>
    </Routes>
  );
};

export default Index;
