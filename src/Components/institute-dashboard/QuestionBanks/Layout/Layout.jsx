import React from "react";
import { Outlet } from "react-router-dom";
import TopBar from "../../class-batch/classtopbar/classtopbar";
import Header from "../../../header/header";
import "./Layout.css";
const Layout = () => {
  return (
    <div className="layout-container">
      {/* Header */}
      <Header />
      {/* TopBar */}

      {/* Main Content Area with Sidebar */}
      <div className="layout-main">
        {/* Sidebar */}
        <Sidebar />

        {/* Page Content */}
        <main className="layout-content">
          <Outlet /> {/* Render nested routes here */}
        </main>
      </div>
    </div>
  );
};

export default Layout;
