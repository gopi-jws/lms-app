import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Class from './Components/institute-dashboard/class-batch/class';
import Institute from './Components/institute-dashboard/dashboard/institute/institute';
import QuestionBank from './Components/institute-dashboard/QuestionBanks/QuestionBank';
import Trashed from './Components/institute-dashboard/QuestionBanks/Sidebar/Trashed/Trashed';
import Test from './Components/institute-dashboard/Test/Test';

function App() {
  return (
    <Router>
      <Routes>
        {/* Define routes for the components */}
        <Route path="/" element={<Institute />} />
        <Route path="/institute" element={<Institute />} />
        <Route path="/class/*" element={<Class />} />
        <Route path="/QuestionBank/*" element={<QuestionBank />} />
        <Route path="/Test" element={<Test />} />
      </Routes>
    </Router>
  );
}

export default App;
