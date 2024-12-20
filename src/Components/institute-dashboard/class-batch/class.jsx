import React from "react";
import Header from "../../header/header";
import ClassSideMenu from "./classsidemenu/classsidemenu";
import TopBar from "./classtopbar/classtopbar";
import { Route, Routes } from 'react-router-dom';
import ClassPage from "./classpage/classpage";
import ArchivePage from "./archive/archivepage";

const Class = () => {
  return (
    <>
      <Header />
      <div className="class-layout">
        <ClassSideMenu className="class-sidebar" archivedCount={10} trashedCount={5} />

        {/* Content area on the right */}
        <div className="class-content">
          <TopBar />
          <Routes>
            
            <Route path="/class/*" element={<ClassSideMenu archivedCount={10} trashedCount={5} />}>
             
              <Route path="new-class" element={<ClassPage />} />
              <Route path="archivepage" element={<ArchivePage />} />
          
            </Route>
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Class;
