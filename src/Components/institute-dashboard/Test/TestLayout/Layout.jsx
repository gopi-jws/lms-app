import React from "react";
import { Outlet } from "react-router-dom";
import TestSidebar from "../TestSidebar/TestSidebar";
import Header from "../../../header/header";
import "./Layout.css"; // Import the CSS for layout styling


const Layout = () => {
  return (
    <div className="layout-container">
      {/* Header */}
      <Header />
      {/* TopBar */}
     
    
      {/* Main Content Area with Sidebar */}
      <div className="layout-main">
        {/* Sidebar */}
        <TestSidebar />

        {/* Page Content */}
        <main className="layout-content">
          <Outlet /> {/* Render nested routes here */}
        </main>
      </div>
    </div>
  );
};

export default Layout;
