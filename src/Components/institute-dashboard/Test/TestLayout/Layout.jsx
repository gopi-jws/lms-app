import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import TestSidebar from "../TestSidebar/TestSidebar";
import Header from "../../../header/header";
import "./Layout.css"; // Import the CSS for layout styling
import TestAddSideabr from "../TestAddSideabr/TestAddSideabr";
import TestQuestionAddSidebar from '../TestQuestionAdd/TestQuestionAddSidebar'
import { TestProvider } from "../TestContext";

const Layout = () => {
  const location = useLocation(); // Get current location/path

  // Check if the current route includes '/movetest'
  const isTestAdd = location.pathname.includes("/movetest");

  // Check if the current route includes '/testquestionadd'
  const isTestQuestionAdd = location.pathname.includes("/testquestionadd");

  return (
    <TestProvider>
    <div className="layout-container">
      {/* Header */}
      <Header />

      {/* Main Content Area with Sidebar */}
      <div className="layout-main">
        {/* Conditionally Render Sidebar */}
        {isTestQuestionAdd ? (
          <TestQuestionAddSidebar /> // Render TestQuestionAddSidebar if it's on the 'testquestionadd' page
        ) : isTestAdd ? (
          <TestAddSideabr /> // Render TestAddSideabr if it's on the 'movetest' page
        ) : (
          <TestSidebar /> // Default sidebar
        )}

        {/* Page Content */}
        <main className="layout-content">
          <Outlet /> {/* Render nested routes here */}
        </main>
      </div>
    </div>
    </TestProvider>
  );
};

export default Layout;
