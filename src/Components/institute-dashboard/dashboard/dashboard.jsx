import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faUserGraduate, faFileAlt, faCopy, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import './dashboard.css';

const DashBoard = () => {
    // Array containing the data for each card
    const statsData = [
        {
            title: "Teachers",
            value: "12/20",
            icon: <FontAwesomeIcon icon={faUsers} size="2x" />,
            label: "Teachers"
        },
        {
            title: "Students",
            value: "135/500",
            icon: <FontAwesomeIcon icon={faUserGraduate} size="2x" />,
            label: "Students"
        },
        {
            title: "Question Banks",
            value: "56/100",
            icon: <FontAwesomeIcon icon={faFileAlt} size="2x" />,
            label: "QB"
        },
        {
            title: "Tests Count",
            value: "154/220",
            icon: <FontAwesomeIcon icon={faCopy} size="2x" />,
            label: "Tests"
        },
        {
            title: "Classes",
            value: "12/20",
            icon: <FontAwesomeIcon icon={faFileAlt} size="2x" />,
            label: "Classes"
        },
        {
            title: "Questions",
            value: "1356/3000",
            icon: <FontAwesomeIcon icon={faUserGraduate} size="2x" />,
            label: "Questions"
        }
    ];

    return (
        <>
            <section className="dashboard-content">
                <h3 className="dashboard-content-title">Institute Dashboard</h3>

                {/* Dashboard Stats Section */}
                <div className="row">
                    {statsData.map((stat, index) => (
                        <div className="col-md-4 mb-4" key={index}>
                            <div className="card mini-stats-wid">
                                <div className="card-body">
                                    <div className="d-flex">
                                        <div className="flex-grow-1">
                                            <p className="text-muted fw-medium">{stat.title}</p>
                                            <h4 className="mb-0">
                                                {stat.value} <small>{stat.label}</small>
                                            </h4>
                                        </div>

                                        <div className="flex-shrink-0 align-self-center">
                                            <div className="mini-stat-icon avatar-sm rounded-circle bg-primary">
                                                <span className="avatar-title">
                                                    {stat.icon}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
};

export default DashBoard;
