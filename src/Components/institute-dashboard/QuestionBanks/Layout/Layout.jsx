import React from 'react';
import { Outlet } from 'react-router-dom';
import TopBar from '../../class-batch/classtopbar/classtopbar';
import Header from '../../../header/header';
import './Layout.css'
const Layout = () => {
  
  const location = useLocation(); // Get current location/path

  // Check if the current route is for the 'Add Question' page
  const isQuestionsAdd = location.pathname.includes("/add");

  return (
    <div className="layout-container">
      {/* Header */}
      <Header />
      {/* TopBar */}
      {/* You can add your TopBar component here if needed */}

      {/* Main Content Area with Sidebar */}
      <div className="layout-main">
        {isQuestionsAdd ? (
          <AddQuestionSidebar /> 
        ) : (
          <Sidebar/>
        )}
        {/* Page Content */}
        <main className="layout-content">
          <Outlet /> {/* Render nested routes here */}
        </main>
      </div>
    </div>
  );
};

export default Layout;
