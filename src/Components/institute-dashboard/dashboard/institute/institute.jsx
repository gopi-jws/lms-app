import React from "react";
import Header from "../../../header/header";
import SidebarMenu from "../sidebar/sidemenu";
import "./institute.css"; 
import DashBoard from "../dashboard";
import TestStatusBar from "../teststaus/teststatus";


const Institute=()=> {
  return (
    <>
      <Header />
      <div className="institute-layout">
        {/* Sidebar on the left */}
        <SidebarMenu className="sidebar" />

        {/* Content area on the right */}
        <div className="content">
            <DashBoard/>
            <TestStatusBar/>
        </div>
      </div>
    </>
  );
}

export default Institute;
