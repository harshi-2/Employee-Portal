import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import the CSS file
import logo from './Login1.jpg'; // Import the logo image

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // Define multiple valid users
    const validUsers = [
        { username: 'monishad.flipkart@gmail.com', password: 'xyz456!@#%' },
        { username: 'manikreddy.flipkart@gmail.com', password: 'xuv@789!@#%' },
        { username: 'varungowda.flipkart@gmail.com', password: 'pqr@1000!@#%' }, 
        { username: 'harshith.gowdap@flipkart.com', password: '123' },
        { username: 'yashithan.flipkart@gmail.com', password: 'abc!@#%$' }
        // Add more users as needed
    ];

    const handleLogin = (e) => {
        e.preventDefault();

        

        // Check credentials against the array of valid users
        const user = validUsers.find(
            (user) => user.username === username && user.password === password
        );

        if (user) {
            navigate('/dashboard', { state: { email: username } });
        } else {
            navigate('/'); // Redirect to login failed if credentials are invalid
        }
    };

    const handlePopUp = () => {
        navigate('/PopUp'); // Redirect to EmployeeLogin.jsx
    };

    return (
        <div>
            {/* Logo Image */}
            <a href="https://www.flipkart.in" target="_blank" rel="noopener noreferrer">
                <img src={logo} alt="Company Logo" className="logo" />
            </a>
            <div className="container">
                <h2 id="loginpage">Employee Login</h2>
                <form onSubmit={handleLogin}>
                    <div>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Email Id"
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>

                {/* Employee Login Link */}
                <h6>
                    Forgot Password?{' '}
                    <button className="pop-up-link" onClick={handlePopUp}>
                        Click here
                    </button>
                </h6>
            </div>
        </div>
    );
}

export default Login;
