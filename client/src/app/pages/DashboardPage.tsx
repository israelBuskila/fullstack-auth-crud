import React from 'react';
import UserList from '../components/UserList';
import Navbar from '../components/Navbar';

const DashboardPage: React.FC = () => {
    return (
        <>
        <Navbar />
        <UserList />
        </>
    );
};

export default DashboardPage;