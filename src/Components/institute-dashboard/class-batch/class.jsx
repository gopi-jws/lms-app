import React from "react";
import { Routes, Route } from "react-router-dom";
import ClassPage from "./classpage/classpage";
import ArchivePage from "./archive/archivepage";
import Layout from "./layout";

const Class = () => {
  return (
    <Routes>
      {/* Define the parent route with Layout */}
      <Route path="/" element={<Layout />}>
        {/* Child routes */}
        <Route index element={<ClassPage />} />
        <Route path="ArchivePage" element={<ArchivePage />} />
      </Route>
    </Routes>
  );
};

export default Class;
