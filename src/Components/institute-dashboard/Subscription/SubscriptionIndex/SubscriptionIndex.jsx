import React, { useState } from 'react';
import TopBar from '../../class-batch/classtopbar/classtopbar';
import Subscriptionform from '../Subscriptionform/Subscriptionform';
import './SubscriptionIndex.css';

const SubscriptionIndex = () => {
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);
  const [currentPlan, setCurrentPlan] = useState(null);

  const subscriptionDetails = {
    duration: '1 - Month',
    price: 'Rs. 1,850',
    expireDate: '30 days',
    features: [
      'Access to basic courses',
      'Limited support',
      'Basic test reports'
    ],
    packageStats: {
      Classes: 25,
      Teachers: 5,
      Students: 200,
      Tests: 10,
      TotalTestHours: 50,
      QuestionBanks: 5,
      TotalQuestions: 1000
    }
  };

  const handleUpgradeClick = () => {
    setCurrentPlan(subscriptionDetails.packageStats); // Passing the plan details
    setShowEnquiryForm(true); // Show the form on upgrade button click
  };

  return (
    <div className="subscription-page">
      <TopBar />
      <div className="subscription-container">
        <div className="subscription-card">
          <div className="card-header">
            <h2 className="subscription-title">Current Plan</h2>
            <span className="subscription-badge">Active</span>
          </div>
          <div className="subscription-details">
            <div className="detail-item">
              <i className="fas fa-calendar-alt"></i>
              <p><strong>Duration:</strong> {subscriptionDetails.duration}</p>
            </div>
            <div className="detail-item">
              <i className="fas fa-rupee-sign"></i>
              <p><strong>Price:</strong> {subscriptionDetails.price}</p>
            </div>
            <div className="detail-item">
              <i className="fas fa-hourglass-end"></i>
              <p><strong>Expires in:</strong> {subscriptionDetails.expireDate}</p>
            </div>
          </div>
          <div className="package-stats">
            <h3>Package Status:</h3>
            <div className="stats-grid">
              {Object.entries(subscriptionDetails.packageStats).map(([key, value]) => (
                <div key={key} className="stat-item">
                  <span className="stat-value">{value}</span>
                  <span className="stat-label">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                </div>
              ))}
            </div>
          </div>
          <button
            className="upgrade-button"
            onClick={handleUpgradeClick}
          >
            Upgrade Plan
          </button>
        </div>
        {showEnquiryForm && (
          <Subscriptionform 
            onClose={() => setShowEnquiryForm(false)} 
            defaultValues={currentPlan}
          />
        )}
      </div>
    </div>
  );
};

export default SubscriptionIndex;
