import React from 'react'
import { Database } from 'lucide-react'
import './SubscriptionSidebar.css'

const SubscriptionSidebar = () => {
  return (
    <div className="subscription-sidebar">
      <h2 className="subscription-sidebar-title">Subscription Info</h2>
      <hr className='line' />
      <div className="subscription-sidebar-icon">
        <Database size={48} />
      </div>
      <p className="subscription-sidebar-text">Manage your subscription and access premium features.</p>
      <button className="contact-button">Contact Us</button>
    </div>
  )
}

export default SubscriptionSidebar

