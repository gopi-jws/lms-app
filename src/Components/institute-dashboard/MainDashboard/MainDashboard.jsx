import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../Layout/Layout"; // Import Layout component
import DashboardIndex from "../DashboardIndex/DashboardIndex"; // Import the main content for the route
import General from "../General/General";
import Sheduled from "../Sheduled/Sheduled";
import CurrectRunningTestDetails from "../ThreeTests/Current-Running-Test-Details/CurrectRunningTestDetails";
import UpcomingTestDetails from "../ThreeTests/UpcomingTestDetails/UpcomingTestDetails";
import UnScheduled from "../UnScheduled/UnScheduled";

const MainDashboard = () => {
 return (
    <Routes>
      {/* Define the parent route with Layout */}
      <Route path="/" element={<Layout />}>
        {/* Child route forDashboardIndex */}
        <Route index element={  <DashboardIndex />} />
          <Route path="general" element={<General />} />
         <Route path="sheduled" element={<Sheduled />} />
             <Route path="unscheduled" element={<UnScheduled />} />
             
         {/* Define the route for CurrentRunningTestDetails with :id as the dynamic parameter */}
        <Route path="current-running-test-details/:id" element={<CurrectRunningTestDetails />} />
         <Route path="upcoming-test-details/:id" element={<UpcomingTestDetails />} />

        {/* Route for Alltest */}
        {/* <Route path="alltest" element={<Alltest />} /> */}
       
      </Route>
 
    </Routes>
  );
}

export default MainDashboard



