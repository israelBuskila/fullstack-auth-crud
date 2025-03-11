import React from 'react';
import UserApi from '../data/user.api';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        const res = await UserApi.logoutUser();
        console.log(res);
        navigate('/');
    };

    return (
        <nav style={styles.navbar}>
            <h1 style={styles.title}>My App</h1>
            <div style={styles.buttonsContainer}>
                <button onClick={() => navigate('/register')} style={styles.buttonSecondary}>Register</button>
                <button onClick={handleLogout} style={styles.buttonPrimary}>Logout</button>
            </div>
        </nav>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 2rem',
        backgroundColor: '#222',
        color: '#fff',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
    },
    title: {
        margin: 0,
        fontSize: '1.5rem',
    },
    buttonsContainer: {
        display: 'flex',
        gap: '10px',
    },
    buttonPrimary: {
        padding: '10px 20px',
        backgroundColor: '#f00',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background 0.3s',
    },
    buttonSecondary: {
        padding: '10px 20px',
        backgroundColor: '#555',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background 0.3s',
    },
};

export default Navbar;
