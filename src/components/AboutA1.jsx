/* eslint-disable react/prop-types */
import React from 'react';
import './AboutA1.css';
import logo from './Project2.png'; // Assuming this is the logo image path

const EmployeeProfile = ({ profile }) => {
    // If no profile is provided, show a default message
    if (!profile) {
        return <h1 className="no-profile-message">Contact Administration for Process to get Access !!!!!!</h1>;
    }

    const {
        photo = 'default-photo.jpg',
        name = 'Harshith Gowda P',
        position = 'Position not available',
        department = 'Department not available',
        company = 'Company not available',
        email = '',
        hrBP = 'HR BP not assigned',
        employmentType = 'Employment Type not available',
    } = profile;

    return (
        <div className="employee-profile">
            {/* Logo Image */}
            <img src={logo} alt="Project Logo" className="logo" />
            <div className="profile-header">
                <img src={photo} alt={name} className="profile-photo" />
                <div className="profile-info">
                    {/* Profile Name and Information Container */}
                    <div className="profile-name-container">
                        <h1>{name}</h1>
                    </div>
                    <p>{position}</p>
                    <p>{department}</p>
                    <p>{company}</p>
                    <a href={`mailto:${email || ''}`}>{email || 'No email available'}</a>
                    <p>HR BP: {hrBP}</p>
                    <p>Employment Type: {employmentType}</p>
                </div>
            </div>
        </div>
    );
};

export default EmployeeProfile;
