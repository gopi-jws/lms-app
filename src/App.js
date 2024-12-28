import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Class from './Components/institute-dashboard/class-batch/class';
import Institute from './Components/institute-dashboard/dashboard/institute/institute';
import QuestionBank from './Components/institute-dashboard/QuestionBanks/QuestionBank';
import Trashed from './Components/institute-dashboard/QuestionBanks/Sidebar/Trashed/Trashed';
import Test from './Components/institute-dashboard/Test/Test';
import Teachers from './Components/institute-dashboard/Teachers/Teachers';
import Subscription from './Components/institute-dashboard/Subscription/Subscription';

function App() {
  return (
    <Router>
      <Routes>
        {/* Define routes for the components */}
        <Route path="/" element={<Institute />} />
        <Route path="/institute" element={<Institute />} />
        <Route path="/class/*" element={<Class />} />
        <Route path="/QuestionBank/*" element={<QuestionBank />} />
        <Route path="/Test/*" element={<Test />} />
         <Route path="/teachers/*" element={<Teachers/>} />
          <Route path="/subscription/*" element={ <Subscription />} />
     
      </Routes>
    </Router>
  );
}

export default App;
