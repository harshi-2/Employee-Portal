import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import the CSS file

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    // Define multiple valid users
    const validUsers = [
        { username: '219055', password: '123' },
        { username: '123456789', password: '456' },
        { username: 'example2', password: 'password2' }
    ];

    const handleLogin = (e) => {
        e.preventDefault();

        // Check if the user has not entered username or password
        if (!username || !password) {
            setErrorMessage('Please enter both username and password');
            navigate('/ELF'); // Redirect to ELF.jsx if fields are empty
            return;
        }

        // Check credentials against the array of valid users
        const user = validUsers.find(
            (user) => user.username === username && user.password === password
        );

        if (user) {
            navigate('/Employee', { state: { employeeName: username } }); // Redirect to Employee page
        } else {
            setErrorMessage('Invalid username or password');
            navigate('/ELF'); // Redirect to ELF.jsx if credentials are invalid
        }
    };

    return (
        <div>
            {/* Logo Image */}
            <div className="container">
                <h2 id='loginpage'>Employee Login</h2>
                <form onSubmit={handleLogin}>
                    <div>
                        <label>Emp Id:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder='Enter username'
                        />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='Enter password'
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>
                {/* Display error message if any */}
                {errorMessage && <p>{errorMessage}</p>}
            </div>
        </div>
    );
}

export default Login;
