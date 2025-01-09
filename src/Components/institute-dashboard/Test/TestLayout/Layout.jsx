import React from "react";
import { Outlet , useLocation} from "react-router-dom";
import TestSidebar from "../TestSidebar/TestSidebar";
import Header from "../../../header/header";
import "./Layout.css"; // Import the CSS for layout styling
import TestAddSideabr from "../TestAddSideabr/TestAddSideabr";
 
 


const Layout = () => {
  const location = useLocation(); // Get current location/path
   // Check if the current route is for the 'Add Question' page
  const isTestAdd = location.pathname.includes("/movetest");

  return (
    <div className="layout-container">
      {/* Header */}
      <Header />
      {/* TopBar */}
     
    
      {/* Main Content Area with Sidebar */}
      <div className="layout-main">
          {isTestAdd ? (
            <TestAddSideabr />
          ):(
  <TestSidebar />
          )}
        {/* Sidebar */}
      

        {/* Page Content */}
        <main className="layout-content">
          <Outlet /> {/* Render nested routes here */}
        </main>
      </div>
    </div>
  );
};

export default Layout;
