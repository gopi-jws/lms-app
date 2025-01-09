import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import ClassPage from "./classpage/classpage";
import ArchivePage from "./archive/archivepage";
import TrashPage from "./trashpage/trashpage";
import Layout from "./layout";
import AddClass from "./newclasspage/newclasspage";
import ClassDetailsPage from "./classdetailspage/classdetailspage";

// Initial class data
const initialClasses = [
  { id: "1", name: "class 1", strength: 30, maximumallowed: 50, expiryDate: new Date(2024, 5, 30) },
  { id: "2", name: "Class 2", strength: 25, maximumallowed: 100, expiryDate: new Date(2024, 6, 15) },
  { id: "3", name: "Class 3", strength: 28, maximumallowed: 70, expiryDate: new Date(2024, 7, 1) },
   { id: "4", name: "Class 4", strength: 28, maximumallowed: 70, expiryDate: new Date(2024, 7, 1) },
];

const Class = () => {
  const [classes, setClasses] = useState(initialClasses);
  const [archivedClasses, setArchivedClasses] = useState([]);
  const [trashedClasses, setTrashedClasses] = useState([]);
  // const navigate = useNavigate();

  const handleAddClass = (newClass) => {
    setClasses([...classes, newClass]);
  };

  const handleArchive = (id) => {
    const classToArchive = classes.find((c) => c.id === id);
    if (classToArchive) {
      setClasses(classes.filter((c) => c.id !== id));
      setArchivedClasses([...archivedClasses, classToArchive]);
    }
  };

  const handleTrash = (id) => {
    const classToTrash = classes.find((c) => c.id === id);
    if (classToTrash) {
      setClasses(classes.filter((c) => c.id !== id));
      setTrashedClasses([...trashedClasses, classToTrash]);
    }
  };

  const handleUnarchive = (id) => {
    const classToUnarchive = archivedClasses.find((c) => c.id === id);
    if (classToUnarchive) {
      setArchivedClasses(archivedClasses.filter((c) => c.id !== id));
      setClasses([...classes, classToUnarchive]);
    }
  };

  const handleRename = (id, newClassName) => {
    setClasses((prevClasses) =>
      prevClasses.map((cls) =>
        cls.id === id ? { ...cls, name: newClassName } : cls
      )
    );
  };

  const handleRestore = (id) => {
    const classToRestore = trashedClasses.find((c) => c.id === id);
    if (classToRestore) {
      setTrashedClasses(trashedClasses.filter((c) => c.id !== id));
      setClasses([...classes, classToRestore]);
    }
  };

  const handleTrashDelete = (id) => {
    setTrashedClasses(trashedClasses.filter((c) => c.id !== id));
  };
  const handleArchiveDelete = (id) => {
    setArchivedClasses(archivedClasses.filter((c) => c.id !== id));
  };

  // const handleClassClick = (classId) => {
  //   navigate(`/class/${classId}/classdetailpage`, {
  //     state: { id: classId },  
  //   });
  // };
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <ClassPage
              classes={classes}
              handleRename={handleRename}
              handleArchive={handleArchive}
              handleTrash={handleTrash}
              // handleClassClick={handleClassClick}
            />
          }
        />
        <Route
          path="AddClass"
          element={<AddClass handleAddClass={handleAddClass} />}
        />
        <Route
          path="ArchivePage"
          element={
            <ArchivePage
              archivedClasses={archivedClasses}
              handleUnarchive={handleUnarchive}
              handleArchiveDelete={handleArchiveDelete}
            />
          }
        />
        <Route
          path="TrashPage"
          element={
            <TrashPage
              trashedClasses={trashedClasses}
              handleRestore={handleRestore}
              handleTrashDelete={handleTrashDelete}
            />
          }
        />
      </Route>
       {/* Route for ClassDetailsPage with dynamic :id */}
       <Route path=":id/classdetailpage" element={<ClassDetailsPage />} />
    </Routes>
  );
};

export default Class;
