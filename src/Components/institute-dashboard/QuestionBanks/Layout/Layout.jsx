import React from 'react';
import { Outlet } from 'react-router-dom';
import TopBar from '../../class-batch/classtopbar/classtopbar';
import Header from '../../../header/header';
import './Layout.css'
const Layout = () => {
  return (
    <>
      <Header />
      <div className="questionbank-layout">
        {/* <Sidebar className="questionbank-sidebar" /> */}

        {/* Main Content Area */}
        <div className="questionbank-content">
          <TopBar />
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
