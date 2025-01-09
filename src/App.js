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
import General from './Components/institute-dashboard/General/General';
import MainDashboard from './Components/institute-dashboard/MainDashboard/MainDashboard';

function App() {
  return (
    <Router basename='/lmsinstitute1'>
      <Routes>
        {/* Define routes for the components */}
        <Route path="/" element={ <MainDashboard />} />
        <Route path="/MainDashboard/*" element={   <MainDashboard />} />
      

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
