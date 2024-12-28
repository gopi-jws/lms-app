import React from 'react'
import TeachersIndex from './TeachersIndex/TeachersIndex'
import Layout from './TeachersLayout/Layout'
import { Routes, Route } from "react-router-dom";

const Teachers = () => {
  return (
   <Routes>
      {/* Define the parent route with Layout */}
      <Route path="/" element={<Layout />}>
        {/* Child route for TestIndex */}
        <Route index element={ <TeachersIndex />} />
        
      </Route>
 
    </Routes>
  )
}

export default Teachers