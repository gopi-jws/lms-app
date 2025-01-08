import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './CurrectRunningTestDetails.css';
import { Clock, Users, Timer, FileText, User, HelpCircle, Target } from 'lucide-react';
import clock from '../../../../images/clock.png'


const CurrectRunningTestDetails = () => {
  const { id } = useParams();
  const [expandedSection, setExpandedSection] = useState(null);

  // Mock data (replace with actual data fetching logic)
  const testData = {
    hoursConsumed: 24,
    candidatesAttended: 150,
    timerDuration: '02:30:00',
    name: 'Advanced JavaScript Assessment',
    owner: 'John Doe',
    questions: 50,
    marks: 100,
    description: 'This test evaluates advanced JavaScript concepts including closures, prototypes, and async programming.',
    instructions: 'Please read each question carefully. You have 2.5 hours to complete the test. Good luck!',
    candidates: [
      {
        rank: 1,
        name: 'Alice Johnson',
        email: 'alice@example.com',
        class: 'JavaScript 101',
        scores: { a: 48, c: 45, w: 3, gs: 90, ns: 87 },
        status: 'Completed',
        logins: 1,
        logouts: 0,
        terminatedByAdmin: false
      },
      {
        rank: 2,
        name: 'Bob Smith',
        email: 'bob@example.com',
        class: 'Guest',
        scores: { a: 50, c: 42, w: 8, gs: 84, ns: 76 },
        status: 'In Test',
        logins: 2,
        logouts: 1,
        terminatedByAdmin: false
      },
      {
        rank: 3,
        name: 'Charlie Brown',
        email: 'charlie@example.com',
        class: 'Public',
        scores: { a: 25, c: 20, w: 5, gs: 40, ns: 35 },
        status: 'Absent',
        logins: 0,
        logouts: 0,
        terminatedByAdmin: false
      }
    ]
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="test-details-container">
 
   <div className="clock-img">
  <img src={clock} alt="Clock Icon" />
  <h1 className="test-details-title">Current Running Test {id} Details</h1>
</div>

        
      
      <div className="top-cards-container">
        <div className="top-card">
          <div className="card-icon">
            <Clock size={24} />
          </div>
          <div className="card-content">
            <h3>Hours Consumed</h3>
            <p>{testData.hoursConsumed}/100</p>
          </div>
        </div>
        <div className="top-card">
          <div className="card-icon">
            <Users size={24} />
          </div>
          <div className="card-content">
            <h3>Candidates Attended</h3>
            <p>{testData.candidatesAttended}</p>
          </div>
        </div>
        <div className="top-card">
          <div className="card-icon">
            <Timer size={24} />
          </div>
          <div className="card-content">
            <h3>Timer</h3>
            <p>{testData.timerDuration}</p>
          </div>
        </div>
      </div>

      <div className="main-card">
        <h2>Test Details</h2>
        <div className="test2-info">
          <div className="info-item">
            <div className="info-icon">
              <FileText size={20} />
            </div>
            <div className="info-content">
              <strong>Name:</strong>
              <span>{testData.name}</span>
            </div>
          </div>
          <div className="info-item">
            <div className="info-icon">
              <User size={20} />
            </div>
            <div className="info-content">
              <strong>Owner:</strong>
              <span>{testData.owner}</span>
            </div>
          </div>
          <div className="info-item">
            <div className="info-icon">
              <HelpCircle size={20} />
            </div>
            <div className="info-content">
              <strong>Questions:</strong>
              <span>{testData.questions}</span>
            </div>
          </div>
          <div className="info-item">
            <div className="info-icon">
              <Target size={20} />
            </div>
            <div className="info-content">
              <strong>Marks:</strong>
              <span>{testData.marks}</span>
            </div>
          </div>
        </div>
        
        <div className="accordion">
          <div className="accordion-item">
            <button 
              className={`accordion-header ${expandedSection === 'description' ? 'active' : ''}`} 
              onClick={() => toggleSection('description')}
            >
              Description
              <span className="accordion-icon">{expandedSection === 'description' ? '−' : '+'}</span>
            </button>
            {expandedSection === 'description' && (
              <div className="accordion-content">
                <p>{testData.description}</p>
              </div>
            )}
          </div>
          <div className="accordion-item">
            <button 
              className={`accordion-header ${expandedSection === 'instructions' ? 'active' : ''}`} 
              onClick={() => toggleSection('instructions')}
            >
              Instructions
              <span className="accordion-icon">{expandedSection === 'instructions' ? '−' : '+'}</span>
            </button>
            {expandedSection === 'instructions' && (
              <div className="accordion-content">
                <p>{testData.instructions}</p>
              </div>
            )}
          </div>
        </div>

     
      </div>
         <div className="candidate-details-card">
          <h3>Candidate Details</h3>
          <div className="table-container">
            <table className="candidate-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Class</th>
                  <th>A-C-W-GS-NS</th>
                  <th>Status</th>
                  <th>Logins</th>
                  <th>Logouts</th>
                  <th>Terminated</th>
                </tr>
              </thead>
              <tbody>
                {testData.candidates.map((candidate, index) => (
                  <tr key={index}>
                    <td>{candidate.rank}</td>
                    <td>{candidate.name}</td>
                    <td>{candidate.email}</td>
                    <td>{candidate.class}</td>
                    <td>{`${candidate.scores.a}-${candidate.scores.c}-${candidate.scores.w}-${candidate.scores.gs}-${candidate.scores.ns}`}</td>
                    <td>{candidate.status}</td>
                    <td>{candidate.logins}</td>
                    <td>{candidate.logouts}</td>
                    <td>{candidate.terminatedByAdmin ? 'Yes' : 'No'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="score-legend">
            <h4>Score Legend:</h4>
            <ul>
              <li><strong>A:</strong> Attempts</li>
              <li><strong>C:</strong> Correct</li>
              <li><strong>W:</strong> Wrong</li>
              <li><strong>GS:</strong> Gross Score</li>
              <li><strong>NS:</strong> Net Score</li>
            </ul>
          </div>
        </div>
    </div>
  );
};

export default CurrectRunningTestDetails;
