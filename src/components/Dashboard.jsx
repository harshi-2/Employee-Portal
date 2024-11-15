import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
    const location = useLocation();
    const navigate = useNavigate();

    // Get the email from the login
    const email = location.state?.email || 'N/A';

    // Simulating employee data (password check is done at login stage)
    const employees = {
        'yashithan.flipkart@gmail.com': {
            name: 'Yashitha N',
            email: 'yashithan.flipkart@gmail.com',
            imageUrl: '/Yashitha.png',
            department: 'Frontend Development',
            designation: 'Trainee Engineer',
        },
        'monishad.flipkart@gmail.com': {
            name: 'Monisha',
            email: 'monishad.flipkart@gmail.com',
            imageUrl: '/Monisha.jpg',
            department: 'Frontend Development',
            designation: 'Trainee Engineer',
        },
        'manikreddy.flipkart@gmail.com': {
            name: 'Manik Reddy',
            email: 'manikreddy.flipkart@gmail.com',
            imageUrl: '/Manik.png',
            department: 'Frontend Development',
            designation: 'Trainee Engineer',
        },
        'varungowda.flipkart@gmail.com': {
            name: 'Varun Gowda N',
            email: 'varungowda.flipkart@gmail.com',
            imageUrl: '/Varun.png',
            department: 'Frontend Development',
            designation: 'Trainee Engineer',
        },

        'harshith.gowdap@flipkart.com': {
        name: 'Harshith Gowda P',
        email: 'harshith.gowdap@flipkart.com',
        imageUrl: '/1.jpg', // Make sure to have this image in the public folder or update the path accordingly
        department: 'Frontend Development',
        designation: 'Junior Frontend Developer',
    }

        
    };

    // Retrieve the employee data based on the email
    const employeeData = employees[email] || { 
        name: 'User', 
        email: '',
        imageUrl: 'https://www.w3schools.com/w3images/avatar1.png',
        department: 'N/A',
        designation: 'N/A',
    };

    // State to track login/logout times and greeting
    const [loginTime, setLoginTime] = useState('');
    const [logoutTime, setLogoutTime] = useState('');
    const [greeting, setGreeting] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state

    // Function to determine the greeting based on the current time
    const getGreeting = () => {
        const currentHour = new Date().getHours();
        if (currentHour < 12) {
            return 'Good Morning';
        } else if (currentHour < 18) {
            return 'Good Afternoon';
        } else {
            return 'Good Evening';
        }
    };

    // Capture login state, login time, and previous logout time when the component mounts
    useEffect(() => {
        setGreeting(getGreeting()); // Set greeting based on the current time

        // Check if the user is already logged in by verifying loginTime and logoutTime
        const storedLoginTime = localStorage.getItem('loginTime');
        const storedLogoutTime = localStorage.getItem('logoutTime');

        if (storedLoginTime && (!storedLogoutTime || new Date(storedLoginTime) > new Date(storedLogoutTime))) {
            setIsLoggedIn(true);
            setLoginTime(storedLoginTime);
        } else {
            setIsLoggedIn(false);
        }

        // Retrieve previous logout time from localStorage
        if (storedLogoutTime) {
            setLogoutTime(storedLogoutTime); // Display previous logout time
        }
    }, []);

    // Handle Login Button Click
    const handleLoginClick = () => {
        const currentLoginTime = new Date().toLocaleTimeString();
        setLoginTime(currentLoginTime);
        localStorage.setItem('loginTime', currentLoginTime); // Save login time to localStorage
        setIsLoggedIn(true);
        
        // Optionally, clear previous logout time when logging in
        localStorage.removeItem('logoutTime');
        setLogoutTime(''); // Clear logout time display if desired
    };

    // Handle Logout Button Click
    const handleLogoutClick = () => {
        const currentLogoutTime = new Date().toLocaleTimeString();
        setLogoutTime(currentLogoutTime);
        localStorage.setItem('logoutTime', currentLogoutTime); // Save logout time to localStorage
        setIsLoggedIn(false);
        
        // Optionally, clear login time when logging out
        localStorage.removeItem('loginTime');
        setLoginTime('');

        navigate('/'); // Redirect to the login page
    };

    return (
        <div className="dashboard">
            <div className="header">
                <ul className="nav-menu">
                    <li onClick={() => navigate('/Project')}>Projects</li>
                    <li onClick={() => navigate('/Reports')}>Reports</li>
                    <li>Employee Profile</li>
                    <li  onClick={() => navigate('/TimeOff')}>Time Off</li>
                    <li onClick={handleLogoutClick}>Logout</li>
                </ul>
                <img src="./download.jpg" alt="Logo" className="header-logo" /> {/* Add logo image here */}
            </div>

            <div className="main-content">
                <div className="profile-left">
                    {/* Employee Profile Information */}
                    <div className="employee-profile">
                        <img src={employeeData.imageUrl} alt={employeeData.name} className="profile-photo" />
                        <div className="profile-info">
                            <h2>{employeeData.name}</h2>
                            <p><strong>Designation:</strong> {employeeData.designation}</p>
                            <p><strong>Department:</strong> {employeeData.department}</p>
                            <p><strong>Email:</strong> {employeeData.email}</p>
                        </div>
                    </div>
                </div>

                <div className="profile-right">
                    {/* Greeting and Login/Logout Buttons */}
                    <div className="greeting-section">
                        <div className="greeting">{greeting}, {employeeData.name}</div>
                    </div>

                    <div className="login-logout-section">
                        <h4>Welcome, {email}! Get ready to start the work. Have a nice day!</h4>
                        <div className="buttons">
                        <div className="button-container">
    <button className="btn btn-login" onClick={handleLoginClick}>Login</button>
    <button className="btn btn-logout" onClick={handleLogoutClick}>Logout</button>
</div>

                        </div>
                        {/* Optionally display the previous logout time */}
                        {logoutTime && !isLoggedIn && (
                            <p><strong>Previous Logout Time:</strong> {logoutTime}</p>
                        )}
                        {/* Optionally display the current login time */}
                        {isLoggedIn && (
                            <p><strong>Current Login Time:</strong> {loginTime}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
