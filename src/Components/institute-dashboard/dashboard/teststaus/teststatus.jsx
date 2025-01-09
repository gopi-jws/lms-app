import React, { useState } from 'react';
import { CheckCircle, Clock, HourglassIcon } from 'lucide-react';
import './teststatus.css';

export default function TestStatusBar() {
  const totalHours = 150;

  const [testHours, setTestHours] = useState({
    completed: 50,
    inProcess: 30,
  });


  const pendingHours = totalHours - (testHours.completed + testHours.inProcess);

  const completedPercentage = (testHours.completed / totalHours) * 100;
  const inProcessPercentage = (testHours.inProcess / totalHours) * 100;
  const pendingPercentage = (pendingHours / totalHours) * 100;

  return (
    <div className="teststatus-card">
     <div className="teststatus-card-header">
  <div className="teststatus-card-header-content">
    <h3 className="teststatus-card-title">Test Hours</h3>
    <h3 className="teststatus-total teststatus-card-title">Total Hours: {totalHours}</h3>
  </div>
</div>

      <div className="teststatus-card-body">
        {/* Progress Bar */}
        <div className="teststatus-bar">
          <div className="teststatus-bar-bg">
            <div
              className="teststatus-bar-completed"
              style={{ width: `${completedPercentage}%` }}
            />
            <div
              className="teststatus-bar-inprocess"
              style={{
                width: `${inProcessPercentage}%`,
                marginLeft: `${completedPercentage}%`,
              }}
            />
            <div
              className="teststatus-bar-pending"
              style={{
                width: `${pendingPercentage}%`,
                marginLeft: `${completedPercentage + inProcessPercentage}%`,
              }}
            />
          </div>
        </div>

        {/* Status Items */}
        <div className="teststatus-items">
          <StatusItem
            icon={<CheckCircle className="teststatus-icon-green" />}
            label="Completed"
            value={testHours.completed}
            color="completed"
          />
          <StatusItem
            icon={<Clock className="teststatus-icon-yellow" />}
            label="During Test"
            value={testHours.inProcess}
            color="inprocess"
          />
          <StatusItem
            icon={<HourglassIcon className="teststatus-icon-gray" />}
            label="Un Used"
            value={pendingHours}
            color="pending"
          />
        </div>
        
      </div>
    </div>
  );
}

function StatusItem({ icon, label, value, color }) {
  return (
    <div className={`teststatus-item teststatus-${color}`}>
      {icon}
      <span className="teststatus-item-label">{label}:</span>
      <span className={`teststatus-badge teststatus-badge-${color}`}>
        {value}
      </span>
    </div>
  );
}
