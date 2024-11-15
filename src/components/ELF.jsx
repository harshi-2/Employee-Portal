
import { useNavigate } from 'react-router-dom';

function LoginFailed() {
    const navigate = useNavigate();

    const handleRetryLogin = () => {
        navigate('/Employeelogin');
    };
    const handleRegister = () => {
        navigate('/Register');
    };

    return (
       <div>
       
            <p>Incorrect Emp Id/Password !!</p>

            <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={handleRetryLogin}>Retry</button>
            <button onClick={handleRegister}>Register</button>
            </div>
        </div>
    );
}

export default LoginFailed;
