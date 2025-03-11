import React from 'react';
import UserApi from '../data/user.api';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
    const navigate = useNavigate()
    const handleLogout = async () => {
        const res = await UserApi.logoutUser()
        console.log(res)
        navigate('/')
    };

    return (
        <nav style={styles.navbar}>
            <h1 style={styles.title}>My App</h1>
            <button onClick={handleLogout} style={styles.button}>Logout</button>
        </nav>
    );
};

const styles = {
    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#333',
        color: '#fff',
    },
    title: {
        margin: 0,
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#f00',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

export default Navbar;