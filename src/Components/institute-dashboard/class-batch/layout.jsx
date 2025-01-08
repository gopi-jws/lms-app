import React from "react";
import Header from "../../header/header";
import ClassSideMenu from "./classsidemenu/classsidemenu";
import TopBar from "./classtopbar/classtopbar";
import { Outlet } from "react-router-dom";


const Layout = () => {
  return (
    <>
      <Header />
      <div className="class-layout">
        <ClassSideMenu className="class-sidebar"/>

        {/* Main Content Area */}
        <div className="class-content">
        
          <Outlet /> 
        </div>
      </div>
    </>
  );
};

export default Layout;
