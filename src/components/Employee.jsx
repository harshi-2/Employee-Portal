import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Employe.css';

function Employee() {
    const location = useLocation();
    const navigate = useNavigate();
    const employeeName = location.state?.employeeName || 'Unknown Employee';

    const [age, setAge] = useState('');
    const [company, setCompany] = useState('');
    const [address, setAddress] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };

    const handleLogout = () => {
        navigate('/');
    };

    return (
        <div id='employ'>
            <h2>Welcome, {employeeName}</h2>
            {!submitted ? (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Age:</label>
                        <input
                            type="number"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            placeholder='Enter your age'
                        />
                    </div>
                    <div>
                        <label>Company:</label>
                        <input
                            type="text"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            placeholder='Enter Company Name'
                        />
                    </div>
                    <div>
                        <label>Address:</label>
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            ) : (
                <div>
                    <h3>Employee Details:</h3>
                    <table border="1">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Age</th>
                                <th>Company</th>
                                <th>Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{employeeName}</td>
                                <td>{age}</td>
                                <td>{company}</td>
                                <td>{address}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Employee;
