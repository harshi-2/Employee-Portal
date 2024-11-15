import { useNavigate } from 'react-router-dom';
import './PopUp.css';

function LoginFailed() {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('/');
    };

    return (
        <div className="popup-container">
            <div className="popup">
                <p>You don't have permission to access this. Kindly contact the administration!!</p>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={handleGoBack}>Go Back</button>
                </div>
            </div>
        </div>
    );
}

export default LoginFailed;
