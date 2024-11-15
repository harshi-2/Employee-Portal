import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Employee from './components/Employee';

import Dashboard from './components/Dashboard';
import Register from './components/Register';
import Employeelogin from './components/Employeelogin';
import ELF from './components/ELF';
import AboutA1 from './components/AboutA1'; // Employee Profile component
import Project from './components/Project';
import PopUp from './components/PopUp';
import Reports from './components/Reports';
import TimeOff from './components/TimeOff';






// Assuming you've used localStorage or React Context to store logged-in user data
const getLoggedInUser = () => {
    
    const userId = localStorage.getItem('loggedInUserId');
    // Mock user data based on stored userId, replace with real logic
    return userId ? { id: userId, name: 'Monisha', position: 'Frontend Developer', department: 'Engineering' } : null;
};

function App() {
    // Retrieve the logged-in user from localStorage (or React Context)
    const loggedInUser = getLoggedInUser();

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/employee" element={<Employee />} />
                
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/Register" element={<Register />} />
                <Route path="/Employeelogin" element={<Employeelogin />} />
                <Route path="/ELF" element={<ELF />} />
                {/* Pass the loggedInUser to the AboutA1 component */}
                <Route
                    path="/AboutA1"
                    element={<AboutA1 profile={loggedInUser} />}
                />
                <Route path="/Project" element={<Project />} />
                <Route path="/PopUp" element={<PopUp />} />
                <Route path="/Reports" element={<Reports />} />
                <Route path="/TimeOff" element={<TimeOff />} />
            </Routes>
        </Router>
    );
}

export default App;
