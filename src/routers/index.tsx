import {Routes, Route, Navigate, Outlet} from 'react-router-dom';
import LeaveList from '../views/Leave/LeaveList';
import Login from "../views/Login";
import Content from "../layouts/shared/Content";
import React from 'react'

const ProtectedRoute = ({ redirectPath = '/login' }) => {
  const token = localStorage.getItem('authorization-token')
  if (!token) return (<Navigate to={redirectPath} replace />);

  return (
    <Content>
      <Outlet />
    </Content>
  );
};


const PageRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<LeaveList />} />
        <Route path="leaves" element={<LeaveList />} />
      </Route>
    </Routes>
  );
};

export default PageRoutes;
