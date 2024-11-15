import React, { useState, useEffect } from 'react';
import './Reports.css';
import logo from './Project2.png'; // Make sure the logo path is correct

const Project = () => {
    const [uploadedReports, setUploadedReports] = useState([]);
    const [loginTime, setLoginTime] = useState(null); // To store login time
    const [logoutTime, setLogoutTime] = useState(null); // To store logout time
    const [yesterdayLogoutTime, setYesterdayLogoutTime] = useState(null); // To store yesterday's logout time

    // Function to get current time in a formatted string
    const getCurrentTime = () => {
        const now = new Date();
        return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    // Set the login time when the component mounts
    useEffect(() => {
        const savedReports = JSON.parse(localStorage.getItem('uploadedReports')) || [];
        setUploadedReports(savedReports);

        // Check if login time already exists in localStorage, if not, set it
        const savedLoginTime = localStorage.getItem('loginTime');
        if (!savedLoginTime) {
            const currentLoginTime = getCurrentTime();
            setLoginTime(currentLoginTime); // Store the login time
            localStorage.setItem('loginTime', currentLoginTime); // Save the login time to localStorage
        } else {
            setLoginTime(savedLoginTime); // Retrieve login time from localStorage if already set
        }

        // Retrieve yesterday's logout time from localStorage
        const savedYesterdayLogoutTime = localStorage.getItem('yesterdayLogoutTime');
        if (savedYesterdayLogoutTime) {
            setYesterdayLogoutTime(savedYesterdayLogoutTime);
        }

        // Function to handle logout time when page unloads
        const handleBeforeUnload = () => {
            const currentLogoutTime = getCurrentTime();
            setLogoutTime(currentLogoutTime);
            localStorage.setItem('logoutTime', currentLogoutTime); // Save logout time to localStorage

            // Store yesterday's logout time
            localStorage.setItem('yesterdayLogoutTime', currentLogoutTime);
        };

        // Add event listener for beforeunload (triggered when the user leaves the page)
        window.addEventListener('beforeunload', handleBeforeUnload);

        // Cleanup the event listener when component unmounts
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []); // Empty dependency array ensures this effect runs only on mount and unmount

    // Function to handle report file upload
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const newReport = {
                name: file.name,
                url: URL.createObjectURL(file),
            };
            // Add the new report to the uploadedReports state
            const updatedReports = [...uploadedReports, newReport];
            setUploadedReports(updatedReports);

            // Save the updated reports to localStorage
            localStorage.setItem('uploadedReports', JSON.stringify(updatedReports));
        }
    };

    return (
        <div className="report-page">
            {/* Logo Image */}
            <img src={logo} alt="Project Logo" className="logo" />

            <header className="report-header">
                <h1 className="report-title">Employee Status</h1>
            </header>

            {/* Flex container for side-by-side sections */}
            <div className="report-container">
                {/* Employee Login/Logout Report */}
                <div className="employee-reports">
                    <h3>Employee Login/Logout Reports</h3>
                    <p>Login Time: {loginTime || "Not recorded yet"}</p>
                    <p>Logout Time: {logoutTime || "Not recorded yet"}</p>
                    <p>Yesterday's Logout Time: {yesterdayLogoutTime || "No logout time recorded for yesterday"}</p>
                </div>

                {/* File Upload Section */}
                <div className="upload-section">
                    <h3>Upload Daily Status Report</h3>
                    <input type="file" onChange={handleFileUpload} />
                </div>
            </div>

            {/* Uploaded Reports Section */}
            <div className="uploaded-reports">
                <h3>Uploaded Reports</h3>
                {uploadedReports.length > 0 ? (
                    <ul>
                        {uploadedReports.map((report, index) => (
                            <li key={index}>
                                <a href={report.url} download={report.name}>
                                    {report.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No reports uploaded yet.</p>
                )}
            </div>
        </div>
    );
};

export default Project;
